import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'ropa',
        loadChildren: () => import('./ropa/ropa.module').then(m => m.SoniaTestRopaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SoniaTestEntityModule {}
