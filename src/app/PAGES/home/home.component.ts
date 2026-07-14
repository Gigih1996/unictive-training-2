import { Component, OnInit } from '@angular/core';
import { Entity_User } from '@core/models/entities/user.entity';
import { AuthService } from '@api/auth/auth.service';
import { HelperService } from '@core/services/helper.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [],
})
export class HomeComponent implements OnInit {

  user = Entity_User.state;

  constructor(
    private auth: AuthService,
    private helper: HelperService,
  ) { }

  ngOnInit() {
  }

  async logout() {
    const confirmed = await this.helper.confirmationAlert({
      type: 'confirm',
      title: 'Logout',
      message: 'Apakah Anda yakin ingin logout?',
      button: 'Ya, Logout',
      button_cancel: 'Batal',
      showCancel: true,
    });

    if (confirmed) {
      this.auth.logout();
    }
  }

}
