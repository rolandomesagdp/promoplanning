import { Injectable } from '@angular/core';
import { LogService } from '@pp-core/logging/log-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPpFilters, PpFilters } from '.';
import { INumberRangeFilter } from '../number-range-filter';

@Injectable({
  providedIn: "root"
})
export class FiltersManager {
  private className: string = "FiltersManager";
  
  filters: IPpFilters = PpFilters.createEmptyModel();

  private applyFiltersSubject$: BehaviorSubject<IPpFilters> = new BehaviorSubject<IPpFilters>(null);
  applyFiltersEvent$: Observable<IPpFilters> = this.applyFiltersSubject$.asObservable();

  constructor(private logger: LogService) { }

  applyFilters(): void {
    this.logger.debug(this.className, "applyFilters()", "Following filters will be applied", this.filters);
    this.applyFiltersSubject$.next(this.filters);
  }

  clearAllFilters(): void {
    this.filters = PpFilters.createEmptyModel();
    this.applyFilters();
  }

  getDefaultPromoDurationFilter(): INumberRangeFilter {
    return this.filters.promoDuration ? this.filters.promoDuration : { start: 20, end: 60 };
  }
}
