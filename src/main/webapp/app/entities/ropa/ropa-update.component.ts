import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRopa, Ropa } from 'app/shared/model/ropa.model';
import { RopaService } from './ropa.service';

@Component({
  selector: 'jhi-ropa-update',
  templateUrl: './ropa-update.component.html',
})
export class RopaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    marca: [],
    talla: [],
    tela: [],
    color: [],
  });

  constructor(protected ropaService: RopaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ropa }) => {
      this.updateForm(ropa);
    });
  }

  updateForm(ropa: IRopa): void {
    this.editForm.patchValue({
      id: ropa.id,
      marca: ropa.marca,
      talla: ropa.talla,
      tela: ropa.tela,
      color: ropa.color,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ropa = this.createFromForm();
    if (ropa.id !== undefined) {
      this.subscribeToSaveResponse(this.ropaService.update(ropa));
    } else {
      this.subscribeToSaveResponse(this.ropaService.create(ropa));
    }
  }

  private createFromForm(): IRopa {
    return {
      ...new Ropa(),
      id: this.editForm.get(['id'])!.value,
      marca: this.editForm.get(['marca'])!.value,
      talla: this.editForm.get(['talla'])!.value,
      tela: this.editForm.get(['tela'])!.value,
      color: this.editForm.get(['color'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRopa>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
