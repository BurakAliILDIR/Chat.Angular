import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';
import { environment } from '../environment';
import { JwtService } from './jwt.service';
import { HttpTransportType } from '@microsoft/signalr';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: any;

  constructor(private jwtService: JwtService) { }

  public startConnection() {
    return new Promise((resolve, reject) => {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(environment.messageHubUrl, {
          accessTokenFactory: () => this.jwtService.accessToken,
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets
        }).withHubProtocol(new MessagePackHubProtocol())
        .build();

      this.hubConnection.start()
        .then(() => {
          console.log("connection established");
          return resolve(true);
        })
        .catch((err: any) => {
          console.log("error occured" + err);
          reject(err);
        });
    });
  }

  invoke(procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this.hubConnection.invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  on(procedureName: string, callBack: (...message: any) => void) {
    this.hubConnection.on(procedureName, callBack);
  }
}
