import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appHighlightFavorite]',
  standalone: true,
  host: {
    '[style.background-color]': "appHighlightFavorite() ? '#FEF3C7' : null",
  },
})
export class HighlightFavoriteDirective {
  appHighlightFavorite = input<boolean>(false);
}
