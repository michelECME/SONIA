import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoniaTestSharedModule } from 'app/shared/shared.module';
import { RopaComponent } from './ropa.component';
import { RopaDetailComponent } from './ropa-detail.component';
import { RopaUpdateComponent } from './ropa-update.component';
import { RopaDeleteDialogComponent } from './ropa-delete-dialog.component';
import { ropaRoute } from './ropa.route';

@NgModule({
  imports: [SoniaTestSharedModule, RouterModule.forChild(ropaRoute)],
  declarations: [RopaComponent, RopaDetailComponent, RopaUpdateComponent, RopaDeleteDialogComponent],
  entryComponents: [RopaDeleteDialogComponent],
})
export class SoniaTestRopaModule {}
