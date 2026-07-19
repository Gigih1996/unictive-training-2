import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '@api/contact/contact.service';
import { HelperService } from '@core/services/helper.service';
import { PhoneInputFormatDirective } from '@shared/directives/phone-input-format.directive';
import { emailPatternValidator, numberPatternValidator } from '@shared/utils/validator_pattern';
import { AlertErrorInputComponent } from '@shared/widgets/alert-error-input/alert-error-input.component';
import { AppHeaderComponent } from '@shared/widgets/header/header.component';
import { ButtonComponent } from '@shared/ui/button/button.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

@Component({
  selector: 'app-daftar-kontak',
  templateUrl: './daftar-kontak.component.html',
  imports: [
    ReactiveFormsModule,
    AlertErrorInputComponent,
    AppHeaderComponent,
    PhoneInputFormatDirective,
    ButtonComponent,
    ContactListComponent,
  ],
})
export class DaftarKontakComponent {

  private contactService = inject(ContactService);
  private helper = inject(HelperService);

  contacts = this.contactService.contacts;
  showForm = signal(false);

  form = new FormGroup({
    nama: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, emailPatternValidator()] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, numberPatternValidator(), Validators.minLength(10), Validators.maxLength(13)] }),
  });

  toggleForm() {
    this.showForm.update(v => !v);
    if (!this.showForm()) this.form.reset();
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nama, email, phone } = this.form.getRawValue();
    this.contactService.add({ nama, email, phone: Number(phone) });

    this.form.reset();
    this.showForm.set(false);
  }

  toggleFavorite(id: string) {
    this.contactService.toggleFavorite(id);
  }

  async confirmDelete(id: string) {
    const confirmed = await this.helper.confirmationAlert({
      type: 'delete',
      title: 'Hapus Kontak',
      message: 'Apakah Anda yakin ingin menghapus kontak ini?',
      button: 'Ya, Hapus',
      button_cancel: 'Batal',
      showCancel: true,
    });

    if (confirmed) {
      this.contactService.remove(id);
    }
  }

}
