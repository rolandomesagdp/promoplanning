import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionImportEditComponent } from './promotion-import-edit.component';

describe('PromotionImportEditComponent', () => {
  let component: PromotionImportEditComponent;
  let fixture: ComponentFixture<PromotionImportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionImportEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionImportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
