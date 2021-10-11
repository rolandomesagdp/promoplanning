import { HttpParams } from "@angular/common/http";
import { IFilterSelectItem } from "@app/pp-filters/multi-select-filter-list";
import { ToHttpParam } from "@shared/pp-http";
import { IPpFilters, PpFilterTypes } from "..";

export class FiltersToHttpParams implements ToHttpParam {
    private filtersAsHttpParams: HttpParams;

    constructor(private filters: IPpFilters) { }
    
    toHttpParams(): HttpParams {
        this.filtersAsHttpParams = new HttpParams();
        this.setAllParams();
        return this.filtersAsHttpParams
    }

    private setAllParams(): void {
		this.setDatesParam();
		this.setFilterSelectItemParams(this.filters.campaigns, PpFilterTypes.campaigns);
		this.setFilterSelectItemParams(this.filters.promoStatus, PpFilterTypes.promoStatus);
		this.setFilterSelectItemParams(this.filters.promoTypes, PpFilterTypes.promoType);
		this.setFilterSelectItemParams(this.filters.productCategories, PpFilterTypes.productCategories);
		this.setFilterSelectItemParams(this.filters.marketCategories, PpFilterTypes.marketCategories);
		this.setFilterSelectItemParams(this.filters.promoTypesSO99, PpFilterTypes.promoTypeSO99);
		this.setPromoDurationParams();
		this.setPromoAttributeParam();
		this.setProductAttributeParam();
		this.setMarketAttributeParam();
	}

	private setPromoAttributeParam(): void {
		if (this.filters.promoAttribute) {
			this.filtersAsHttpParams = this.filtersAsHttpParams
				.set(PpFilterTypes.promoAttribute, this.filters.promoAttribute.id.toString());
		}
	}

	private setProductAttributeParam(): void {
		if (this.filters.productAttribute) {
			this.filtersAsHttpParams = this.filtersAsHttpParams
				.set(PpFilterTypes.productAttribute, this.filters.productAttribute.id.toString());
		}
	}

	private setMarketAttributeParam(): void {
		if (this.filters.marketAttribute) {
			this.filtersAsHttpParams = this.filtersAsHttpParams
				.set(PpFilterTypes.marketAttribute, this.filters.marketAttribute.id.toString());
		}
	}

	private setDatesParam(): void {
		if (this.filters.datesRange && this.filters.datesRange.start && this.filters.datesRange.end) {
			this.filtersAsHttpParams = this.filtersAsHttpParams
				.set(PpFilterTypes.startDate, new Date(this.filters.datesRange.start).toUTCString())
				.set(PpFilterTypes.endDate, new Date(this.filters.datesRange.end).toUTCString());
		}
	}

	private setFilterSelectItemParams(filtersList: IFilterSelectItem[], filterType: PpFilterTypes): void {
		if (filtersList && filtersList.length > 0) {
			let filtersCommaSeparated = "";
			filtersList.forEach(filterItem => {
				if (filtersCommaSeparated === "") {
					filtersCommaSeparated = filterItem.filterItemId.toString();
				}
				else {
					filtersCommaSeparated += `,${filterItem.filterItemId.toString()}`
				}
			});
			this.filtersAsHttpParams = this.filtersAsHttpParams.set(filterType, filtersCommaSeparated);
		}
	}

	private setPromoDurationParams(): void {
		if (this.filters.promoDuration && this.filters.promoDuration.start && this.filters.promoDuration.end) {
			this.filtersAsHttpParams = this.filtersAsHttpParams
				.set(PpFilterTypes.promoDurationStart, this.filters.promoDuration.start.toString());

			this.filtersAsHttpParams = this.filtersAsHttpParams
				.set(PpFilterTypes.promoDurationEnd, this.filters.promoDuration.end.toString());
		}
	}
}