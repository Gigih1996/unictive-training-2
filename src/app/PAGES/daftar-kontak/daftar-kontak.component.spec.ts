import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { DaftarKontakComponent } from './daftar-kontak.component';

describe('DaftarKontakComponent', () => {
  let component: DaftarKontakComponent;
  let fixture: ComponentFixture<DaftarKontakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DaftarKontakComponent ],
      providers: [ provideRouter([]), provideHttpClient() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarKontakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render contact list from service', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('contact-card').length).toBe(component.contacts().length);
  });

  it('should validate phone length min 10 max 13', () => {
    const phone = component.form.controls.phone;

    phone.setValue('081234567');
    expect(phone.hasError('minlength')).toBe(true);

    phone.setValue('08123456789012');
    expect(phone.hasError('maxlength')).toBe(true);

    phone.setValue('081234567890');
    expect(phone.valid).toBe(true);
  });

  it('should format phone input display while keeping raw digits in control', () => {
    component.showForm.set(true);
    fixture.detectChanges();

    const input = (fixture.nativeElement as HTMLElement).querySelector('#phone') as HTMLInputElement;
    input.value = '081234567890';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.value).toBe('0812-3456-7890');
    expect(component.form.controls.phone.value).toBe('081234567890');
    expect(component.form.controls.phone.valid).toBe(true);
  });

  it('should show wording when typed phone is too short or too long', async () => {
    component.showForm.set(true);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector('#phone') as HTMLInputElement;

    input.value = '081234567';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(el.textContent).toContain('No HP Minimal 10');

    input.value = '08738129384913124123';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(el.textContent).toContain('No HP Maksimal 13');
  });

  it('should render error message when form opens with an invalid dirty control', () => {
    const phone = component.form.controls.phone;
    phone.setValue('081');
    phone.markAsDirty();
    phone.markAsTouched();
    component.showForm.set(true);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('small').length).toBeGreaterThan(0);
  });

  it('should not submit when form invalid', () => {
    const before = component.contacts().length;
    component.submit();
    expect(component.contacts().length).toBe(before);
  });
});
