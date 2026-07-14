import { Component, OnInit } from '@angular/core';
import { Widget_gameModule } from '@shared/widgets/widget_game/widget_game.module';
import { AuthService } from '@api/auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [Widget_gameModule],
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

}
``
