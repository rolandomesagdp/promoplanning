import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INumberRangeFilter } from '.';

@Component({
  selector: 'pp-number-range-filter',
  templateUrl: './number-range-filter.component.html',
  styleUrls: ['./number-range-filter.component.scss']
})
export class NumberRangeFilterComponent implements OnInit {
  @Input() rangeStart: number;
  @Input() rangeEnd: number;
  @Input() tooltipSufix: string = "";
  @Input() lableSufix: string = "";
  @Output() numberRangeChanged: EventEmitter<INumberRangeFilter> = new EventEmitter<INumberRangeFilter>();

  constructor() { 
    this.lableFormat = this.lableFormat.bind(this);
    this.tooltipFormat = this.tooltipFormat.bind(this);
  }

  ngOnInit(): void {
    if(!this.rangeStart) this.rangeStart = 20;
    if(!this.rangeEnd) this.rangeEnd = 60;
  }

  onRangeChanged(valueChangeEvent: any): void {
    this.numberRangeChanged.emit({
      start: valueChangeEvent.start,
      end: valueChangeEvent.end
    });
  }

  lableFormat(value: any): string {
    return `${value} ${this.lableSufix}`;
  };

  tooltipFormat(value: any): string {
    return `${value} ${this.tooltipSufix}`;
  }
}
