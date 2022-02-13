import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Logger } from '@nestjs/common'
import { Socket, Server } from 'socket.io';

export class SocketUser {
  id: string;
  username: string;
  email: string;
  socket: Socket;
  watcher: boolean;

  constructor(id: string, username: string, email: string, socket: Socket, watcher) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.socket = socket;
    this.watcher = watcher;
  }

  toJson(): any {
    return ({
      id: this.id,
      username: this.username,
      email: this.email,
      watcher: this.watcher

    });
  }
}

@WebSocketGateway(3080, { cors: { origin: '*' } })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;
  Player: SocketUser[] = [];
  Cls: string[] = [];



  private logger: Logger = new Logger('AppGateWay');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connected: ${client.id}`);
    if(this.Cls.length < 2)
    {
      this.Cls.push(client.id);
    }
  }

  //each socket with unuque id so unique client id 

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`);
    if(this.Cls.length > 0)
    {
      // remove this client from the list of connected clients
      this.Cls.splice(this.Cls.indexOf(client.id), 1);
    }
  }

  // this will return to client who sent the msg 
  // not working fot a chat' room 
  // @SubscribeMessage('msgToServer')
  // handleMessage(client: Socket,  text:string): WsResponse<string> {

  //   // or client.emit('msgToClient', text)
  //   return {event:'msgToClient', data: text};
  // }

  // we ginna calll another decorator  : @WebSocketServer()
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, data : { sessionId:string,data:any}): void {
    // this.logger.log(`client sent a message: ${data}`);
    data.sessionId = this.Cls[5];
    // console.log(this.Cls.length);
    this.wss.emit('msgToClient', data);
  }
}