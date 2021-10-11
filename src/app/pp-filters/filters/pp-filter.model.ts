import { IDateRangeFilter } from "@app/pp-filters/date-rage-filter";
import { IFilterSelectItem } from "@app/pp-filters/multi-select-filter-list";
import { INumberRangeFilter } from "@app/pp-filters/number-range-filter";
import { IFilter } from "./filter.model";

export interface IPpFilters {
	datesRange: IDateRangeFilter;
	promoDuration: INumberRangeFilter;
	campaigns: IFilterSelectItem[];
	promoStatus: IFilterSelectItem[];
	promoTypes: IFilterSelectItem[];
	promoTypesSO99: IFilterSelectItem[];
	productCategories: IFilterSelectItem[];
	marketCategories: IFilterSelectItem[];
	productAttribute: IFilter;
	marketAttribute: IFilter;
	promoAttribute: IFilter
}