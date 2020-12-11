import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRopa, Ropa } from 'app/shared/model/ropa.model';
import { RopaService } from './ropa.service';
import { RopaComponent } from './ropa.component';
import { RopaDetailComponent } from './ropa-detail.component';
import { RopaUpdateComponent } from './ropa-update.component';

@Injectable({ providedIn: 'root' })
export class RopaResolve implements Resolve<IRopa> {
  constructor(private service: RopaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRopa> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ropa: HttpResponse<Ropa>) => {
          if (ropa.body) {
            return of(ropa.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ropa());
  }
}

export const ropaRoute: Routes = [
  {
    path: '',
    component: RopaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'soniaTestApp.ropa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RopaDetailComponent,
    resolve: {
      ropa: RopaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'soniaTestApp.ropa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RopaUpdateComponent,
    resolve: {
      ropa: RopaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'soniaTestApp.ropa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RopaUpdateComponent,
    resolve: {
      ropa: RopaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'soniaTestApp.ropa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
