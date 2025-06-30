import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthValueDialogComponent } from './health-value-dialog.component';

describe('HealthValueDialogComponent', () => {
  let component: HealthValueDialogComponent;
  let fixture: ComponentFixture<HealthValueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthValueDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthValueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
