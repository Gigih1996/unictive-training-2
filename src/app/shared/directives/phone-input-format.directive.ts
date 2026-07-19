import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

// Tampilan input diformat 0812-3456-7890, tapi nilai FormControl tetap digit murni
// agar validator (angka, minLength, maxLength) bekerja pada jumlah digit asli.
@Directive({ selector: 'input[appPhoneInputFormat]', standalone: true })
export class PhoneInputFormatDirective {

  private el = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private ngControl = inject(NgControl, { optional: true });

  @HostListener('input')
  onInput() {
    const input = this.el.nativeElement;
    const digits = input.value.replace(/\D/g, '');

    const control = this.ngControl?.control;
    control?.markAsDirty();
    control?.markAsTouched();
    control?.setValue(digits, { emitModelToViewChange: false });
    input.value = digits.replace(/(\d{4})(?=\d)/g, '$1-');
  }

}
