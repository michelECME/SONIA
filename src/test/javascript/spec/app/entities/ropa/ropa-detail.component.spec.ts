import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoniaTestTestModule } from '../../../test.module';
import { RopaDetailComponent } from 'app/entities/ropa/ropa-detail.component';
import { Ropa } from 'app/shared/model/ropa.model';

describe('Component Tests', () => {
  describe('Ropa Management Detail Component', () => {
    let comp: RopaDetailComponent;
    let fixture: ComponentFixture<RopaDetailComponent>;
    const route = ({ data: of({ ropa: new Ropa(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoniaTestTestModule],
        declarations: [RopaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RopaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RopaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ropa on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ropa).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
