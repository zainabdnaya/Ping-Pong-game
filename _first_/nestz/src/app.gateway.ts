import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Logger } from '@nestjs/common'
import { Socket , Server } from 'socket.io';

@WebSocketGateway(3080,{cors : {origin : '*'}})
export class AppGateway implements OnGatewayInit, OnGatewayConnection , OnGatewayDisconnect{

  @WebSocketServer()  wss: Server;

  private logger: Logger = new Logger('AppGateWay');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleConnection(clinet : Socket , ...args:any[])
  {
    this.logger.log('client connected: ${client.id}');
  }

  //each socket with unuque id so unique client id 

  handleDisconnect(client: Socket)
  {
    this.logger.log('client disconnected: ${client.id}');

  }

  // this will return to client who sent the msg 
  // not working fot a chat' room 
  // @SubscribeMessage('msgToServer')
  // handleMessage(client: Socket,  text:string): WsResponse<string> {

  //   // or client.emit('msgToClient', text)
  //   return {event:'msgToClient', data: text};
  // }


  //for chat room  sent msg to everyone 
  // we ginna calll another decorator  : @WebSocketServer()
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void 
  {
    this.wss.emit('msgToClient',text);
  }
}