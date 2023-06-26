import { Component } from '@angular/core';
import { SignalRService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-app';

  constructor(private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.registerUser("Gary");
    this.signalRService.createConnection();
    // this.signalRService.receiveMessage((user, message) => {
    //   console.log(`${user}: ${message}`);
    // });
  }

  // sendMessage(user: string, message: string): void {
  //   this.signalRService.sendMessage(user, message);
  // }

}
