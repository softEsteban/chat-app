import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environments } from '../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection?: HubConnection;
  private host: string = "";

  constructor(private httpClient: HttpClient) {
    this.host = environments.host;
  }

  registerUser(user: any) {
    return this.httpClient.post(`${this.host}api/chat/register-user`, user);
  }

  createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.host}hubs/chat`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => {
      console.log(error);
    })

    this.hubConnection.on("UserConnected", () => {
      this.addUserConnectionId()
      // console.log("The server has called here! ")
    });
  }

  stopConnection() {
    this.hubConnection?.stop().catch(error => {
      console.log(error);
    })
  }

  async addUserConnectionId() {
    return this.hubConnection?.invoke("UserConnectionId").catch(error => {
      console.log("error");
    })
  }

}
