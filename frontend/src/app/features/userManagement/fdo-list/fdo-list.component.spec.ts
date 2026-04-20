import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdoListComponent } from './fdo-list.component';

describe('FdoListComponent', () => {
  let component: FdoListComponent;
  let fixture: ComponentFixture<FdoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FdoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FdoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
