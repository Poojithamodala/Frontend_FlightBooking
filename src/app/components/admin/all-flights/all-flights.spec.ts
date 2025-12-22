import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFlights } from './all-flights';

describe('AllFlights', () => {
  let component: AllFlights;
  let fixture: ComponentFixture<AllFlights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllFlights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFlights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
