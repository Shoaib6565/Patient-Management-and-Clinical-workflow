import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationsDialogComponent } from './confirmations-dialog.component';

describe('ConfirmationsDialogComponent', () => {
  let component: ConfirmationsDialogComponent;
  let fixture: ComponentFixture<ConfirmationsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
