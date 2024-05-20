import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Person } from '../model/person';
import { InputTextModule } from 'primeng/inputtext';
import { FileSelectEvent, FileUploadEvent, FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { OthersComponent } from '../others/others.component';
import { CardModule } from 'primeng/card';
import { ProfileService } from '../profile.service';
import { UploadService } from '../upload.service';
import { NgStyle } from '@angular/common';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    CardModule,
    FormsModule,
    OthersComponent,
    NgStyle
  ],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
})
export class PersonComponent implements OnInit {

  @Input() person: Person;
  constructor(private profileService: ProfileService, private uploadService: UploadService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.profileService.personFoto.subscribe(imageUrl => {
      this.person.foto = imageUrl;
    })
  }

  uploadFoto(event: any) {
    this.uploadService.uploadFoto(event.target.files[0]);
  }

  makeAnimation() {
    this.chatService.getAnimationStyle()?.subscribe(style => {
      style = style.replaceAll("```css", "").replaceAll("```", "");
      console.log(style);
      let styleElement = document.createElement('style');
      styleElement.id = 'genAnimation';
      styleElement.innerHTML = style;
      document.getElementsByTagName('head')[0].appendChild(styleElement);
    });
  }

  stopAnimation() {
    let styleElement = document.getElementById('genAnimation');
    if (styleElement) {
      styleElement.remove();
    }
  }

}
