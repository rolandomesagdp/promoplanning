import { Params } from "@angular/router";
import { IFilterSelectItem } from "@app/pp-filters/multi-select-filter-list";
import { IPpFilters, PpFilters, PpFilterTypes } from "..";

export class ParamsToFiltersStrategy {
    filters: IPpFilters = PpFilters.createEmptyModel();

    constructor(public params: Params) { }

    setReportFilters(): ParamsToFiltersStrategy {
        this.setPromoDuration();
        this.setDatesRange();
        this.setSelectItemArrayFilter(PpFilterTypes.campaigns);
        this.setSelectItemArrayFilter(PpFilterTypes.promoStatus);
        this.setSelectItemArrayFilter(PpFilterTypes.promoType);
        this.setSelectItemArrayFilter(PpFilterTypes.promoTypeSO99);
        this.setFilters(PpFilterTypes.promoAttribute);
        return this;
    }

    private setFilters(filterName: PpFilterTypes): void {
        if(this.params[filterName]) {
            this.filters[filterName] = { id: this.params[filterName], name: ""};
        }
    }

    private setSelectItemArrayFilter(reportFilterType: PpFilterTypes): void {
        if(this.params[reportFilterType]) {
            const commaSeparatedIds: string = this.params[reportFilterType];
            const idsArray: string[] = commaSeparatedIds.split(",");
            this.filters[reportFilterType] = this.getFilterSelectItemArray(idsArray, reportFilterType);
        }
    }

    private getFilterSelectItemArray(ids: string[], reportFilterType: PpFilterTypes): IFilterSelectItem[] {
        let filterSelectItems: IFilterSelectItem[] = [];
        ids.forEach(id => {
            filterSelectItems = [...filterSelectItems, {
                filterItemId: id,
                filterItemType: reportFilterType,
                filterItemName: "",
                isSelected: true
            }]
        });
        return filterSelectItems.length > 0 ? filterSelectItems : null;
    }

    private setDatesRange(): void {
        if(this.params[PpFilterTypes.startDate] || this.params[PpFilterTypes.endDate]) {
            this.filters.datesRange = {
                start: this.params[PpFilterTypes.startDate] ? new Date(this.params[PpFilterTypes.startDate]) : null,
                end: this.params[PpFilterTypes.endDate] ? new Date(this.params[PpFilterTypes.endDate]) : null
            }
        }
    }

    private setPromoDuration(): void {
        if(this.params[PpFilterTypes.promoDurationStart] && this.params[PpFilterTypes.promoDurationEnd]) {
            this.filters.promoDuration = {
                start: +this.params[PpFilterTypes.promoDurationStart],
                end: +this.params[PpFilterTypes.promoDurationEnd]
            };
        }
    }
}