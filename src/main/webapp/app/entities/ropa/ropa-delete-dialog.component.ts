import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRopa } from 'app/shared/model/ropa.model';
import { RopaService } from './ropa.service';

@Component({
  templateUrl: './ropa-delete-dialog.component.html',
})
export class RopaDeleteDialogComponent {
  ropa?: IRopa;

  constructor(protected ropaService: RopaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ropaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ropaListModification');
      this.activeModal.close();
    });
  }
}
