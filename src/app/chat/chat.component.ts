import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';


type Message = {
  message: string,
  userName: string,
  dateSent: Date,
  avatar?: string
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @Output() closeChatEmiter = new EventEmitter();
  @ViewChild('messagesCont', { static: true }) messagesContainer!: ElementRef;

  message: string = "";
  chatMessages: Message[] = [
    {
      message: "Hello",
      userName: "User 1",
      dateSent: new Date(),
    },
    {
      message: "Hi",
      userName: "User 2",
      dateSent: new Date(),
    },
    {
      message:
        "This is a longer message that will cause the container to scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis augue auctor, sagittis mi a, tincidunt orci. Etiam nec lobortis eros. Sed dignissim velit vitae ex venenatis fringilla. Integer vel congue risus. Duis dictum scelerisque gravida. Etiam vitae posuere tellus, sed vulputate ipsum.",
      userName: "User 1",
      dateSent: new Date(),
    },
    {
      message: "Another message from User 2.",
      userName: "User 2",
      dateSent: new Date(),
    },
  ];

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

  sendMessage() {

    this.chatMessages.push({
      message: this.message,
      userName: this.chatService.userName,
      dateSent: new Date(),
      avatar: "user2-avatar.png",
    })

    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }, 0);
  }

}
