import { NgClass, UpperCasePipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '@core/models/contact.model';
import { HighlightFavoriteDirective } from '@shared/directives/highlight-favorite.directive';
import { FormatPhonePipe } from '@shared/pipes/format-phone.pipe';
import { ButtonComponent } from '@shared/ui/button/button.component';

@Component({
  selector: 'contact-card',
  templateUrl: './contact-card.component.html',
  imports: [NgClass, UpperCasePipe, DatePipe, FormatPhonePipe, HighlightFavoriteDirective, ButtonComponent],
})
export class ContactCardComponent {

  @Input({ required: true }) contact!: Contact;

  @Output() onToggleFavorite = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();

}
