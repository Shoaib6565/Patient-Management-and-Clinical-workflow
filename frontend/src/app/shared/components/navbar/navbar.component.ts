import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() toggleSidebar = new EventEmitter<void>();

  user = {
    name: 'Shoaib',
    avatar: 'https://i.pravatar.cc/40'
  };

  onToggle() {
    this.toggleSidebar.emit();
  }

  logout() {
    console.log('Logout clicked');
  }
}
