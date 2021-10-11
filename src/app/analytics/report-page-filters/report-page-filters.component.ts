import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ToggleDrawerService } from '@shared/components/drawer-card/toggle-drawer-service';
import { FiltersService } from '@app/pp-filters/services';
import { ReportPageFiltersViewModel } from './report-page-filters.view-model';
import { LogService } from '@pp-core/logging/log-service';
import { Params, Router } from '@angular/router';
import { FiltersManager, PpFilters } from '@app/pp-filters/filters';

@Component({
  selector: 'pp-report-page-filters',
  templateUrl: './report-page-filters.component.html',
  styleUrls: ['./report-page-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportPageFiltersComponent implements OnDestroy {
  viewModel: ReportPageFiltersViewModel = new ReportPageFiltersViewModel(this.filtersService, this.logger);

  constructor(public filtersManager: FiltersManager,
    private toggleDrawerService: ToggleDrawerService,
    private router: Router,
    private filtersService: FiltersService,
    private logger: LogService) { }

  onApply(): void {
    this.toggleDrawerService.toggleDrawer();
    const queryParams: Params = PpFilters.create(this.filtersManager.filters).toParams();
    this.router.navigate([`analytics/report-page/${1}`],
      { queryParams: queryParams });
  }

  ngOnDestroy(): void {
    this.filtersManager.clearAllFilters();
  }
}
