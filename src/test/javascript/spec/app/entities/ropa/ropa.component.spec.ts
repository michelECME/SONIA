import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoniaTestTestModule } from '../../../test.module';
import { RopaComponent } from 'app/entities/ropa/ropa.component';
import { RopaService } from 'app/entities/ropa/ropa.service';
import { Ropa } from 'app/shared/model/ropa.model';

describe('Component Tests', () => {
  describe('Ropa Management Component', () => {
    let comp: RopaComponent;
    let fixture: ComponentFixture<RopaComponent>;
    let service: RopaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoniaTestTestModule],
        declarations: [RopaComponent],
      })
        .overrideTemplate(RopaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RopaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RopaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Ropa(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ropas && comp.ropas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
