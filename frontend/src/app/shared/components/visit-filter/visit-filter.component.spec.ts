import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitFilterComponent } from './visit-filter.component';

describe('VisitFilterComponent', () => {
  let component: VisitFilterComponent;
  let fixture: ComponentFixture<VisitFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
