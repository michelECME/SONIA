import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoniaTestTestModule } from '../../../test.module';
import { RopaUpdateComponent } from 'app/entities/ropa/ropa-update.component';
import { RopaService } from 'app/entities/ropa/ropa.service';
import { Ropa } from 'app/shared/model/ropa.model';

describe('Component Tests', () => {
  describe('Ropa Management Update Component', () => {
    let comp: RopaUpdateComponent;
    let fixture: ComponentFixture<RopaUpdateComponent>;
    let service: RopaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoniaTestTestModule],
        declarations: [RopaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RopaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RopaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RopaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ropa(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ropa();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
