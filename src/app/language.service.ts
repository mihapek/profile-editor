import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: string;
  constructor() { }

  setLanguage(selectedLanguage: string) {
    this.language = selectedLanguage;
  }
}
