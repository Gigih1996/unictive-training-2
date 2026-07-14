import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InputTextComponent } from '@shared/ui/input-text/input-text.component';
import { AuthService } from '@api/auth/auth.service';
import { HelperService } from '@core/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextComponent
  ],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private helper: HelperService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    this.form = this.fb.group({
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    try {
      await this.auth.post_login(this.form.value);
      await this.auth.getUserdata();
      this.router.navigateByUrl('/dashboard');
    } catch (err: any) {
      this.helper.showPopup('error', 'Login gagal', typeof err === 'string' ? err : 'Phone atau password salah');
    } finally {
      this.loading = false;
    }
  }


}
