import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    //service.generateText("hello").subscribe(resp => console.log(resp));
  });
});
