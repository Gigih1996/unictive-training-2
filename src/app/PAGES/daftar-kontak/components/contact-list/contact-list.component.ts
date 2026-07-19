import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '@core/models/contact.model';
import { ContactCardComponent } from '../contact-card/contact-card.component';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  imports: [ContactCardComponent],
})
export class ContactListComponent {

  @Input({ required: true }) contacts: Contact[] = [];

  @Output() onToggleFavorite = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();

}
