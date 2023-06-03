import { Component } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  hide_menu = true;

  toggleMenu() {
    this.hide_menu = !this.hide_menu;
  }
}
