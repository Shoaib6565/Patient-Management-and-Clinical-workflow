import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmFormComponent } from './firm-form.component';

describe('FirmFormComponent', () => {
  let component: FirmFormComponent;
  let fixture: ComponentFixture<FirmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirmFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
