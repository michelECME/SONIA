import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRopa } from 'app/shared/model/ropa.model';
import { RopaService } from './ropa.service';
import { RopaDeleteDialogComponent } from './ropa-delete-dialog.component';

@Component({
  selector: 'jhi-ropa',
  templateUrl: './ropa.component.html',
})
export class RopaComponent implements OnInit, OnDestroy {
  ropas?: IRopa[];
  eventSubscriber?: Subscription;

  constructor(protected ropaService: RopaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.ropaService.query().subscribe((res: HttpResponse<IRopa[]>) => (this.ropas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRopas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRopa): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRopas(): void {
    this.eventSubscriber = this.eventManager.subscribe('ropaListModification', () => this.loadAll());
  }

  delete(ropa: IRopa): void {
    const modalRef = this.modalService.open(RopaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ropa = ropa;
  }
}
