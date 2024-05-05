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
import { FocusOnShowDirective } from '../focusOnShowDerictive';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    EditorModule,
    SplitButtonModule,
    FormsModule,
    FocusOnShowDirective,
  ],
  templateUrl: './others.component.html',
  styleUrl: './others.component.css'
})
export class OthersComponent implements OnInit {
  @Input() object: HasOthers;
  @Input() editor: boolean;
  addOtherItems: MenuItem[];
  showEditor: boolean;
  setFocus: boolean;

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

  addOther(): void {
    this.setFocus = true;
    this.object.addOther();
  }

  generateOther() {
    this.setFocus = true;
    if (this.object.others.length != 0) {
      this.chatService.getOther(this.object.others)?.subscribe(data => {
        console.log(data);
        let json = JSON.parse(data);
        const other = new ProfileItem(json.key, json.value);
        this.object.addOther(other);
      });
    }
    else {
      this.messageService.add({ detail: 'You should have at least one item' });
    }
  }

  switchEditor(): void {
    this.showEditor = !this.showEditor;
  }

}
