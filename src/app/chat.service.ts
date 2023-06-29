import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environments } from '../environments/environments';

type User = {
  Username: string,
  Password: string
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  userName: string = "";
  onlineUsers: string[] = [];

  private hubConnection?: HubConnection;
  private host: string = "";

  constructor(private httpClient: HttpClient) {
    this.host = environments.host;
  }

  /**
   * Registers 
   * @param user 
   * @returns 
   */
  registerUser(user: User) {
    user["Password"] = "";
    return this.httpClient.post(`${this.host}api/chat/register-user`, user);
  }



  /**
   * Calls Angular app from serverside
   */
  createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.host}hubs/chat`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => {
      console.log(error);
    })

    this.hubConnection.on("UserConnected", () => {
      this.addUserConnectionId();
    });

    this.hubConnection.on("OnlineUsers", (onlineUsers) => {
      this.onlineUsers = [...onlineUsers];
    });
  }

  stopConnection() {
    this.hubConnection?.stop().catch(error => {
      console.log(error);
    })
  }

  /**
  * Calls serverside from Angular
  */
  async addUserConnectionId() {
    return this.hubConnection?.invoke("AddUserConnectionId", this.userName).catch(error => {
      console.log("error");
    })
  }


}
