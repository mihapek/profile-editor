import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import * as profileSample from "../assets/profile.json";
import { Profile } from './model/profile';
import { Project } from './model/project';
import { ProfileItem } from './model/profile-item';
import { LanguageService } from './language.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient, private languageService: LanguageService) { }

  getProfile(type: string): Observable<string> {
    const prompt = "here is json file with a profile of one person. " +
      "please generate similar one for the person who wants to work as " + type +
      this.getPromptEnding() + JSON.stringify(profileSample).replace('{"default":', '');
    return this.getChatResponse(prompt);
  }
  getPersonContent(type: string, profile: Profile): Observable<string> {
    let prompt = "here is json file with a profile of one person. ";
    switch (type) {
      case "poem": {
        prompt += "write a short poem about this person ";
        break
      }
      case "description": {
        prompt += "describe the person in few sentences using paragraphs ";
        break
      }
    }
    prompt += "in language " + this.languageService.language + ".\n" + JSON.stringify(profile);
    return this.getChatResponse(prompt);
  }

  getProject(projects: Project[]): Observable<string> {
    const prompt = "here is json file with projects of one person. " +
      "please generate a new similar project " +
      " as single object without array" +
      this.getPromptEnding() + JSON.stringify(projects);
    return this.getChatResponse(prompt);
  }

  getOther(others: ProfileItem[]): Observable<string> {
    const prompt = "here is json file with information about one person. " +
      "please generate another information " +
      " as single object without array" +
      this.getPromptEnding() + JSON.stringify(others);
    return this.getChatResponse(prompt);
  }

  getPromptEnding(): string {
    return " in the same json format but in language " + this.languageService.language + ".\n"
  }

  private getChatResponse(prompt: string): Observable<string> {
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.apiKey
    };

    return this.http.post<Response>(this.apiUrl, requestBody, { headers: headers })
      .pipe(map((resp: any) => {
        return resp.choices[0].message.content;
      }));
  }
}

