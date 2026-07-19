import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@api/auth/auth.service';
import { HelperService } from '@core/services/helper.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-gray-200">
      <div class="flex items-center justify-between px-6 py-3">

        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-linear-to-br from-[#206EE1] to-[#3b8ef5] flex items-center justify-center shadow-sm">
            <i class="pi pi-address-book text-white text-base"></i>
          </div>
          <div class="leading-tight">
            <h1 class="text-base font-bold text-gray-900">{{ title }}</h1>
            <p class="text-[11px] text-gray-400 hidden sm:block">tugas-login</p>
          </div>
        </div>

        <nav class="flex items-center gap-1.5">
          <a routerLink="/dashboard" routerLinkActive="!bg-[#206EE1]/10 !text-[#206EE1] font-semibold" title="Dashboard"
            class="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors">
            <i class="pi pi-home"></i>
            <span class="hidden sm:inline">Dashboard</span>
          </a>

          <a routerLink="/daftar-kontak" routerLinkActive="!bg-[#206EE1]/10 !text-[#206EE1] font-semibold" title="Daftar Kontak"
            class="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors">
            <i class="pi pi-users"></i>
            <span class="hidden sm:inline">Daftar Kontak</span>
          </a>

          <span class="w-px h-6 bg-gray-200 mx-1.5" aria-hidden="true"></span>

          <button (click)="logout()" title="Logout"
            class="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm text-red-600 hover:bg-red-50 transition-colors">
            <i class="pi pi-sign-out"></i>
            <span class="hidden sm:inline">Logout</span>
          </button>
        </nav>

      </div>
    </header>
  `,
})
export class AppHeaderComponent {

  @Input({ required: true }) title = '';

  constructor(
    private auth: AuthService,
    private helper: HelperService,
  ) { }

  async logout() {
    const confirmed = await this.helper.confirmationAlert({
      type: 'confirm',
      title: 'Logout',
      message: 'Apakah Anda yakin ingin logout?',
      button: 'Ya, Logout',
      button_cancel: 'Batal',
      showCancel: true,
    });

    if (confirmed) {
      this.auth.logout();
    }
  }

}
