import { Injectable } from '@angular/core';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  socket: any;

  connect(userId: number) {
    this.socket = io("http://localhost:3001");

    this.socket.emit("register", userId);

    this.socket.on("new_notification", (data: any) => {
      console.log("Notification:", data);
      // show in UI
    });
  }
}




// // use in component
//ngOnInit() {
// this.notificationService.connect(this.userId);
//}
