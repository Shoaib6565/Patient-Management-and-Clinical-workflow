import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() isOpen = true;

  // Dummy role (later API se aayega)
  role = 'admin';

  isSettingsOpen = false;

  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
  }
}
