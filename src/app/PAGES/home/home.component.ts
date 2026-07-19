import { Component, OnInit } from '@angular/core';
import { Entity_User } from '@core/models/entities/user.entity';
import { AppHeaderComponent } from '@shared/widgets/header/header.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [AppHeaderComponent],
})
export class HomeComponent implements OnInit {

  user = Entity_User.state;

  constructor() { }

  ngOnInit() {
  }

}
