import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoniaTestSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [SoniaTestSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class SoniaTestHomeModule {}
