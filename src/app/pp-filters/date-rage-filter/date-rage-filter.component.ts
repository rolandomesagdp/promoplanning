import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IDateRangeFilter } from '.';

@Component({
  selector: 'pp-date-rage-filter',
  templateUrl: './date-rage-filter.component.html',
  styleUrls: ['./date-rage-filter.component.scss']
})
export class DateRageFilterComponent implements OnInit {
  @Output() dateRangeSelected: EventEmitter<IDateRangeFilter> = new EventEmitter<IDateRangeFilter>();
  @Input() defaultStart: Date;
  @Input() defaultEnd: Date;
  start: FormControl = new FormControl();
  end: FormControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
    if(this.defaultStart) this.start.setValue(this.defaultStart);
    if(this.defaultEnd) this.end.setValue(this.defaultEnd);
  }

  onSelectionChanged(): void {
    let dateRange: IDateRangeFilter = {
        start: this.start.value,
        end: this.end.value
      };
      this.dateRangeSelected.emit(dateRange);
  }
}