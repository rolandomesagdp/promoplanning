import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';

import { NumberRangeFilterComponent } from './number-range-filter.component';

describe('NumberRangeFilterComponent', () => {
  let component: NumberRangeFilterComponent;
  let fixture: ComponentFixture<NumberRangeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberRangeFilterComponent ],
      imports: [ PpAngularMaterialModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberRangeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have 20 and 60 as default values", () => {
      expect(component.rangeStart).toEqual(20);
      expect(component.rangeEnd).toEqual(60);
  });

  it("should emit selected values onRangeChanged()", () => {
      // arrange
      const numberRangeChangedSpy = spyOn(component.numberRangeChanged, "emit");
      const rangeSelection = { start: 50, end: 60 };

      // act
      component.onRangeChanged(rangeSelection);

      // assert
      expect(numberRangeChangedSpy).toHaveBeenCalledWith(rangeSelection);
  })
});
