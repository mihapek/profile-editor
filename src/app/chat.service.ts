import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, switchMap } from 'rxjs';
import * as profileSample from "../assets/profile.json";
import { Profile } from './model/profile';
import { Project } from './model/project';
import { ProfileItem } from './model/profile-item';
import { LanguageService } from './language.service';
import { environment } from '../environments/environment';
import { ApiKeyDialogComponent } from './api-key-dialog/api-key-dialog.component';
import { LoadingService } from './loading.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiChatUrl = environment.chatApiUrl;
  private apiImageUrl = environment.imageApiUrl;
  private apiKey = environment.apiKey;
  private apiKeyRequest = new Subject<void>();
  apiKeyRequest$ = this.apiKeyRequest.asObservable();

  constructor(private http: HttpClient, private languageService: LanguageService, private cookieService: CookieService) { }

  getProfile(type: string): Observable<string> | undefined {
    const jsonProfile = JSON.stringify(profileSample).replace('{"default":', '');
    const prompt = `here is json file with a profile of one person. generate similar one for the person who wants to work as 
                  ${type} ${this.getPromptEnding()} ${jsonProfile}`;
    return this.getChatResponse(prompt);
  }

  getPersonContent(type: string, short: boolean, profile: Profile): Observable<string> | undefined {
    const contentTypes: any = {
      "poem": "write a short poem about this person ",
      "description": `describe this person in ${(short) ? "one sentence" : "few paragraphs"}`
    };
    let prompt = `here is json file with a profile of one person. ${contentTypes[type]} 
                 in language ${this.languageService.language}.\n${JSON.stringify(profile)}`;
    return this.getChatResponse(prompt);
  }

  getProject(projects: Project[]): Observable<string> | undefined {
    const prompt = `here is json file with projects of one person. generate a new similar project as single object without array
                  ${this.getPromptEnding()} ${JSON.stringify(projects)}`;
    return this.getChatResponse(prompt);
  }

  getOther(others: ProfileItem[]): Observable<string> | undefined {
    const prompt = `here is json file with information about one person. generate another information as single object without array
                  ${this.getPromptEnding()}${JSON.stringify(others)}`;
    return this.getChatResponse(prompt);
  }

  getPromptEnding(): string {
    return ` in the same json format and in ${this.languageService.language} language.\n`;
  }

  getPersonFoto(profile: Profile): Observable<string> | undefined {
    if (!this.getApiKey()) {
      this.apiKeyRequest.next();
      return;
    }
    const personDescription$ = this.getPersonContent("description", true, profile);
    if (!personDescription$) {
      return;
    }
    return personDescription$.pipe(
      switchMap(data => {
        const prompt = `generate a foto of the following person: ${data}`;
        const requestBody = {
          model: 'dall-e-2',
          size: "256x256",
          prompt: prompt
        };
        return this.http.post<Response>(this.apiImageUrl, requestBody, { headers: this.getHeaders() });
      }),
      map((resp: any) => resp.data[0].url)
    );
  }

  getAnimationStyle() {
    const prompt = "have html image element with .personFoto class. give me please css for cool animation of this image." +
      " just pure css as answer without any text more. try to be each time creative "
    return this.getChatResponse(prompt);
  }

  private getChatResponse(prompt: string): Observable<string> | undefined {
    if (!this.getApiKey()) {
      this.apiKeyRequest.next();
      return;
    }
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    };

    return this.http.post<Response>(this.apiChatUrl, requestBody, { headers: this.getHeaders() })
      .pipe(map((resp: any) => {
        return resp.choices[0].message.content;
      }));
  }

  private getApiKey(): string {
    if (!this.apiKey) {
      this.apiKey = this.cookieService.get("openAiKey");
    }
    return this.apiKey;
  }

  private getHeaders(): any {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.apiKey
    };
  }

  setApiKey(key: string): void {
    this.apiKey = key;
  }


}

