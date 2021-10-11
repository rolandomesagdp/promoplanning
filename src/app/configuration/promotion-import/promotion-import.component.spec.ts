import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionImportComponent } from './promotion-import.component';

describe('PromotionImportComponent', () => {
  let component: PromotionImportComponent;
  let fixture: ComponentFixture<PromotionImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
