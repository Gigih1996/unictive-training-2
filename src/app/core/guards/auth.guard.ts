import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@api/auth/auth.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const storage = inject(StorageMap);
    const auth = inject(AuthService);

    return storage.get(environment.tokenName).pipe(
        map((token: any) => {
            if (token) {
                auth.setLogin(true);
                return true;
            } else {
                auth.setLogin(false);
                lastValueFrom(storage.clear());
                router.navigateByUrl('/login');
                return false;
            }
        })
    );
};
