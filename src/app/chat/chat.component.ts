import { Component, EventEmitter, Output } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @Output() closeChatEmiter = new EventEmitter();

  message: string = "";

  constructor(public chatService: ChatService) {

  }

  ngOnInit(): void {
    this.chatService.createConnection();
  }

  ngOnDestroy(): void {
    this.chatService.stopConnection();
  }

  backToHome() {
    this.closeChatEmiter.emit();
  }

  sendMessage(message: string) {
    this.chatService.sendMessage(message);
  }

}
