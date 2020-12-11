import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRopa } from 'app/shared/model/ropa.model';

@Component({
  selector: 'jhi-ropa-detail',
  templateUrl: './ropa-detail.component.html',
})
export class RopaDetailComponent implements OnInit {
  ropa: IRopa | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ropa }) => (this.ropa = ropa));
  }

  previousState(): void {
    window.history.back();
  }
}
