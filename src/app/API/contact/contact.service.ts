import { Injectable, signal } from '@angular/core';
import { Contact } from '@core/models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {

  private readonly _contacts = signal<Contact[]>([
    {
      id: crypto.randomUUID(),
      nama: 'Gigih Satriono',
      email: 'gsatriono@gmail.com',
      phone: 81234567890,
      isFavorite: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      nama: 'Budi Santoso',
      email: 'budi@mail.com',
      phone: 85712345678,
      isFavorite: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      nama: 'Siti Aminah',
      email: 'siti@mail.com',
      phone: 89876543210,
      isFavorite: false,
      createdAt: new Date().toISOString(),
    },
  ]);

  readonly contacts = this._contacts.asReadonly();

  add(data: { nama: string; email: string; phone: number }) {
    const contact: Contact = {
      id: crypto.randomUUID(),
      ...data,
      isFavorite: false,
      createdAt: new Date().toISOString(),
    };
    this._contacts.update(list => [contact, ...list]);
  }

  toggleFavorite(id: string) {
    this._contacts.update(list =>
      list.map(c => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  }

  remove(id: string) {
    this._contacts.update(list => list.filter(c => c.id !== id));
  }

}
