import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DapDetailComponent } from './dap-detail.component';

describe('DapDetailComponent', () => {
  let component: DapDetailComponent;
  let fixture: ComponentFixture<DapDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DapDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DapDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
