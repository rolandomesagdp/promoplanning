import { HttpParams } from "@angular/common/http";
import { Params } from "@angular/router";
import { IDateRangeFilter } from "@app/pp-filters/date-rage-filter";
import { IFilterSelectItem } from "@app/pp-filters/multi-select-filter-list";
import { INumberRangeFilter } from "@app/pp-filters/number-range-filter";
import { ToHttpParam, ToParams } from "@shared/pp-http";
import { IPpFilters } from "./pp-filter.model";
import { ParamsToFiltersStrategy } from "./filter-mappings/params-to-filter.strategy";
import { FiltersToHttpParams } from "./filter-mappings/filters-to-http-params.strategy";
import { FiltersToParams } from "./filter-mappings/filters-to-params.strategy";
import { IFilter } from "./filter.model";

export class PpFilters implements IPpFilters, ToHttpParam, ToParams {
	private toHttpParamStrategy: ToHttpParam;
	private toParamsStrategy: ToParams;
	datesRange: IDateRangeFilter;
	campaigns: IFilterSelectItem[];
	promoStatus: IFilterSelectItem[];
	promoTypes: IFilterSelectItem[];
	productAttribute: IFilter;
	productCategories: IFilterSelectItem[];
	marketAttribute: IFilter;
	marketCategories: IFilterSelectItem[];
	promoTypesSO99: IFilterSelectItem[];
	promoDuration: INumberRangeFilter;
	promoAttribute: IFilter;

	private constructor(reportFilters: IPpFilters, toHttpParamStrategy: ToHttpParam, toParamsStrategy: ToParams) {
		this.datesRange = reportFilters.datesRange;
		this.campaigns = reportFilters.campaigns;
		this.promoStatus = reportFilters.promoStatus;
		this.promoTypes = reportFilters.promoTypes;
		this.productCategories = reportFilters.productCategories;
		this.marketCategories = reportFilters.marketCategories;
		this.promoTypesSO99 = reportFilters.promoTypesSO99;
		this.promoDuration = reportFilters.promoDuration;
		this.promoAttribute = reportFilters.promoAttribute;
		this.productAttribute = reportFilters.productAttribute;
		this.marketAttribute = reportFilters.marketAttribute;
		this.toHttpParamStrategy = toHttpParamStrategy;
		this.toParamsStrategy = toParamsStrategy;
	}

	toParams(): Params {
		return this.toParamsStrategy.toParams();
	}

	toHttpParams(): HttpParams {
		return this.toHttpParamStrategy.toHttpParams();
	}

	static createEmptyModel(): IPpFilters {
		return { datesRange: { start: null, end: null }, campaigns: null, productCategories: null, promoTypes: null,
			marketCategories: null, promoTypesSO99: null, promoStatus: null, productAttribute: null,
			marketAttribute: null, promoDuration: { start: null, end: null }, promoAttribute: null };
	}

	static createFromParams(params: Params): IPpFilters {
		return new ParamsToFiltersStrategy(params).setReportFilters().filters;
	}

	static create(reportFilterModel: IPpFilters): PpFilters {
		let filters: IPpFilters = {
			campaigns: this.getFilterSelectItemList(reportFilterModel.campaigns),
			promoTypes: this.getFilterSelectItemList(reportFilterModel.promoTypes),
			promoTypesSO99: this.getFilterSelectItemList(reportFilterModel.promoTypesSO99),
			promoStatus: this.getFilterSelectItemList(reportFilterModel.promoStatus),
			datesRange: this.getDatesRangeFilter(reportFilterModel.datesRange),
			promoDuration: this.getPromoDurationFilter(reportFilterModel.promoDuration),
			promoAttribute: this.getPromoAttributeFilter(reportFilterModel.promoAttribute),
			
			// These two are the tree ones left
			productCategories: this.getFilterSelectItemList([]),
			marketCategories: this.getFilterSelectItemList([]),

			// These two might be obsolete
			productAttribute: this.getProductAttributeFilter(),
			marketAttribute: this.getMarketAttributeFilter(),
		};

		return new PpFilters(
			filters, 
			new FiltersToHttpParams(filters),
			new FiltersToParams(filters)
		);
	}

	private static getPromoAttributeFilter(promoAttributeFilter: IFilter): IFilter {
		return promoAttributeFilter ? { ...promoAttributeFilter } : null;

	}

	private static getProductAttributeFilter(): IFilter {
		// let productAttributeFilter = this.filterManager.getProductAttributeFilter();
		// return productAttributeFilter ? { ...productAttributeFilter } : null;
		return null;
	}

	private static getMarketAttributeFilter(): IFilter {
		// let marketAttributeFilter = this.filterManager.getMarketAttributeFilter();
		// return marketAttributeFilter ? { ...marketAttributeFilter } : null;
		return null;
	}

	private static getFilterSelectItemList(itemsList: IFilterSelectItem[]): IFilterSelectItem[] | null {
		if (itemsList && itemsList.length > 0) {
			return [...itemsList];
		}
		else {
			return null;
		}
	}

	private static getDatesRangeFilter(datesRange: IDateRangeFilter): IDateRangeFilter | null {
		if (datesRange) {
			return { ...datesRange };
		}
		else {
			return null;
		}
	}

	private static getPromoDurationFilter(promoDurationRange: INumberRangeFilter): INumberRangeFilter | null {
		if (promoDurationRange) {
			return { ...promoDurationRange };
		}
		else {
			return null;
		}
	}
}