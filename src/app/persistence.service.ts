import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ProfileService } from './profile.service';
import { environment } from '../environments/environment';
import { Profile } from './model/profile';
import { plainToClass } from 'class-transformer';
import { ProfileNotFoundError } from './errors/profile-not-found-error';


@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  dbApiUrl = environment.dbApiUrl;
  dbApiKey = environment.dbApiKey;
  dbAppId = environment.dbAppId;

  constructor(private http: HttpClient, private profileService: ProfileService) { }

  saveProfile(profile: Profile): Observable<string> {
    const requestBody = {
      json: profile
    };
    console.log(requestBody);
    return this.http.post<Response>(this.dbApiUrl, requestBody, { headers: this.getHeaders() })
      .pipe(
        map((resp: any) => {
          return resp.objectId;
        }),
        catchError(error => {
          throw new Error('An error occurred while fetching profile');
        }));
  }

  getProfile(profileId: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.dbApiUrl}/${profileId}`, { headers: this.getHeaders() })
      .pipe(
        map((resp: any) => {
          return plainToClass(Profile, resp.json);
        }),
        catchError((error: any) => {
          if (error.status === 404) {
            throw new ProfileNotFoundError();
          }
          else {
            throw new Error('An error occurred while fetching profile');
          }
        })
      );
  }

  private getHeaders(): any {
    return {
      'Content-Type': 'application/json',
      'X-Parse-REST-API-Key': this.dbApiKey,
      'X-Parse-Application-Id': this.dbAppId
    };
  }
}
