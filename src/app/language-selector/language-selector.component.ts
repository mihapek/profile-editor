import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { LanguageService } from '../language.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'language-selector',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent implements OnInit {
  languages: string[];
  selectedLanguage = "English";

  constructor(private languageService: LanguageService) { }
  ngOnInit(): void {
    this.languages = ["English", "Deutsch", "Русский"];
  }

  setLanguage() {
    this.languageService.setLanguage(this.selectedLanguage);
  }

}
