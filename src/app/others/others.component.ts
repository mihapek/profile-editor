import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { HasOthers } from '../model/has-others';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem, MessageService } from 'primeng/api';
import { ChatService } from '../chat.service';
import { ProfileItem } from '../model/profile-item';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    EditorModule,
    SplitButtonModule,
    FormsModule
  ],
  templateUrl: './others.component.html',
  styleUrl: './others.component.css'
})
export class OthersComponent implements OnInit {
  @Input() object: HasOthers;
  @Input() editor: boolean;
  addOtherItems: MenuItem[];

  constructor(private chatService: ChatService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.addOtherItems = [
      {
        label: 'Generate', command: () => {
          this.generateOther();
        }
      }
    ]
  }

  generateOther() {
    if (this.object.others.length != 0) {
      this.chatService.getOther(this.object.others).subscribe(data => {
        console.log(data);
        const other = plainToClass(ProfileItem, JSON.parse(data));
        this.object.addOther(other);
      });
    }
    else {
      this.messageService.add({ detail: 'You should have at least one item' });
    }
  }
}
