import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatPhone', standalone: true })
export class FormatPhonePipe implements PipeTransform {

  // 081234567890 -> 0812-3456-7890
  transform(value: string | number | null | undefined): string {
    let digits = String(value ?? '').replace(/\D/g, '');
    if (!digits) return '';

    // phone disimpan sebagai Number sehingga "0" di depan hilang
    if (digits.startsWith('8')) digits = '0' + digits;

    return digits.replace(/(\d{4})(?=\d)/g, '$1-');
  }

}
