import { ChangeDetectorRef, Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';

@Component({
  selector: 'alert-error',
  templateUrl: './alert-error-input.component.html',
  standalone: true,
})
export class AlertErrorInputComponent implements OnInit {
  @Input() control!: FormControl | any;
  @Input() label!: string;
  @Input() secondLabel!: string;

  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  constructor() { }

  // zoneless: tanpa ini komponen tidak pernah dicek ulang saat status control berubah
  ngOnInit() {
    if (this.control?.valueChanges && this.control?.statusChanges) {
      merge(this.control.valueChanges, this.control.statusChanges)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.cdr.markForCheck());
    }
  }

  hasError(error: string): boolean {
    //console.log(error, this.control.errors);
    return (
      this.control?.hasError(error) &&
      (this.control?.touched || this.control?.dirty)
    );
  }
}
