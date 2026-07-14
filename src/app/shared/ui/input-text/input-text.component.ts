import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AlertErrorInputComponent } from '@shared/widgets/alert-error-input/alert-error-input.component';
import { FloatLabelModule } from "primeng/floatlabel";

@Component({
  selector: 'input-text',
  styleUrls: ['./input-text.component.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AlertErrorInputComponent,
    FloatLabelModule,
    CommonModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
  template: `
  <div class="rounded-lg bg-white px-4 py-2">
    <label class="block text-[#657687] mb-0 text-sm" [for]="label()"
    >{{label()}}</label>
      @if(this.type == 'password'){
      <div class="relative">
        <input [autocomplete]="false" (ngModelChange)="onValueChange($event)" [(ngModel)]="value" [type]="showPassword ? 'text' : type"
        class="w-full p-0! border-none! rounded-lg focus:outline-none! focus:ring-0"
        [placeholder]="placeholder()" />        
        <i
          class="pi absolute right-0 top-0 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
          [ngClass]="showPassword ? 'pi-eye' : 'pi-eye-slash'"
          (click)="showPassword = !showPassword"
        ></i>             
      </div>
      }  
      @else {
            <input (ngModelChange)="onValueChange($event)" [(ngModel)]="value" [type]="type"
      class="w-full p-0! border-none! rounded-lg focus:outline-none! focus:ring-0"
      [placeholder]="placeholder()" />
      }
  </div>
          <alert-error [control]="control" [label]="label()"></alert-error>
          `
})
export class InputTextComponent implements ControlValueAccessor, OnInit {

  showPassword = false;
  @Input() control!: FormControl | any;
  @Input() idLabel = "";
  @Input() variant: "floating" | "normal" = "normal";
  @Input() name = "";
  @Input() typeLabel: "over" | "on" | "in" = "in";
  @Input() type: "password" | "email" | "text" | "number" = "text";

  placeholder = input("Enter your email"); //default
  label = input("label"); //default
  form: any = input();

  value: any;

  constructor() { }

  ngOnInit() {
  }

  writeValue(value: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  hasError(error: string): boolean | null {
    // console.log(this.control.errors);
    return (
      this.control?.hasError(error) &&
      (this.control?.touched || this.control?.dirty)
    );
  }

  onValueChange(value: any) {
    this.onChange(value);
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Fungsi yang akan dipanggil ketika nilai diubah
  onChange: (date: any) => void = () => { };
  onTouched: () => void = () => { };

}
