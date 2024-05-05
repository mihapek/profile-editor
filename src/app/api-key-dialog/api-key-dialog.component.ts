import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-api-key-dialog',
  standalone: true,
  templateUrl: './api-key-dialog.component.html',
  imports: [
    DialogModule,
    FormsModule,
    InputTextModule,
    ButtonModule
  ],

})
export class ApiKeyDialogComponent {
  @Output() apiKeySubmit = new EventEmitter<string>();
  display: boolean;
  apiKey = '';

  submit(): void {
    this.apiKeySubmit.emit(this.apiKey);
    this.display = false;
  }
}