import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Person } from '../model/person';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { OthersComponent } from '../others/others.component';
import { CardModule } from 'primeng/card';
import { ProfileService } from '../profile.service';

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
  imageUrl: string;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.personFoto.subscribe(imageUrl => {
      this.imageUrl = imageUrl;
    })
  }

}
