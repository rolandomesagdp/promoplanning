import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFilterSelectItem } from './filter-select-item.model';
import { MultiSelectFilterUIService } from './multi-select-filter-ui.service';

@Component({
  selector: 'pp-multi-select-filter',
  templateUrl: './multi-select-filter.component.html',
  styleUrls: ['./multi-select-filter.component.scss']
})
export class MultiSelectFilterComponent implements OnInit {
  @Input() defaultTooltip: string;
  @Input() placeHolders: string;
  @Input() filtersList: IFilterSelectItem[];
  @Input() defaultSelection: IFilterSelectItem[];
  @Output() listSelectionChange: EventEmitter<IFilterSelectItem[]> = new EventEmitter<IFilterSelectItem[]>();
  filtersSelectionControl: FormControl = new FormControl();
  uiService: MultiSelectFilterUIService = new MultiSelectFilterUIService();
  selectAllOption: IFilterSelectItem = {...this.uiService.selectAllOption };
  clearAllOption: IFilterSelectItem = {...this.uiService.clearAllOption };
  selectedFilters: IFilterSelectItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setDefaultSelectedValues();
  }

  selectionChanged(): void {
    this.selectedFilters = [...this.filtersSelectionControl.value];
    this.listSelectionChange.emit(this.selectedFilters);
  }

  selectAll(): void {
    this.filtersSelectionControl.setValue([...this.filtersList]);
    this.selectionChanged();
  }

  clearAll(): void {
    this.filtersSelectionControl.setValue([]);
    this.selectionChanged();
  }

  private setDefaultSelectedValues(): void {
    if(this.defaultSelection && this.defaultSelection.length > 0) {
      this.defaultSelection.forEach(defaultSelection => {
        const selectionFromList = this.filtersList.find(x => x.filterItemId === defaultSelection.filterItemId);
        this.selectedFilters = [...this.selectedFilters, selectionFromList];
      });
      this.filtersSelectionControl.setValue(this.selectedFilters);
    }
  }
}
