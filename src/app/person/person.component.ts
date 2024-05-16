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

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    CardModule,
    FormsModule,
    OthersComponent
  ],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent implements OnInit {

  @Input() person: Person;
  constructor(private profileService: ProfileService, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.profileService.personFoto.subscribe(imageUrl => {
      this.person.foto = imageUrl;
    })
  }

  uploadFoto() {
    this.uploadService.uploadFoto();
  }

}
