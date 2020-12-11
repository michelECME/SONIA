import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RopaService } from 'app/entities/ropa/ropa.service';
import { IRopa, Ropa } from 'app/shared/model/ropa.model';
import { Color } from 'app/shared/model/enumerations/color.model';

describe('Service Tests', () => {
  describe('Ropa Service', () => {
    let injector: TestBed;
    let service: RopaService;
    let httpMock: HttpTestingController;
    let elemDefault: IRopa;
    let expectedResult: IRopa | IRopa[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RopaService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Ropa(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', Color.ROJO);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Ropa', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Ropa()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Ropa', () => {
        const returnedFromService = Object.assign(
          {
            marca: 'BBBBBB',
            talla: 'BBBBBB',
            tela: 'BBBBBB',
            color: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Ropa', () => {
        const returnedFromService = Object.assign(
          {
            marca: 'BBBBBB',
            talla: 'BBBBBB',
            tela: 'BBBBBB',
            color: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Ropa', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
