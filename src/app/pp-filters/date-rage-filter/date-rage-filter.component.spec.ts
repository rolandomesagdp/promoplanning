import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PpDatePickerModule } from '@shared/components/date-picker';

import { DateRageFilterComponent } from './date-rage-filter.component';

describe('DateRageFilterComponent', () => {
  let component: DateRageFilterComponent;
  let fixture: ComponentFixture<DateRageFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateRageFilterComponent ],
      imports: [ PpDatePickerModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRageFilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should emit selected dates range", () => {
      // arrange
      const startDate = new Date(2011, 5, 10);
      const endDate = new Date(2011, 5, 12);
      const dateRangeSelectedSpy = spyOn(component.dateRangeSelected, "emit");
      component.start.setValue(startDate);
      component.end.setValue(endDate);

      // act 
      component.onSelectionChanged();

      // assert
      expect(dateRangeSelectedSpy).toHaveBeenCalledWith({
          start: startDate,
          end: endDate
      });
  })
});
