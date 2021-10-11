import { DropDownTreeSelectModel } from "@app/pp-filters/drop-down-tree-select/tree-filters/drop-down-tree-select.model";
import { IFilterSelectItem } from "@app/pp-filters/multi-select-filter-list/filter-select-item.model";
import { FiltersService } from "@app/pp-filters/services";
import { LogService } from "@pp-core/logging/log-service";
import { combineLatest, Observable } from "rxjs";
import { concatMap, map, scan, tap } from "rxjs/operators";
import { ReportPageFiltersEvents } from "./report-page-filters.events";

export class ReportPageFiltersViewModel {
    private className: string = "ReportPageFiltersViewModel";

    events: ReportPageFiltersEvents = new ReportPageFiltersEvents();

    constructor(private filtersService: FiltersService, private logger: LogService) { }

    private campaignFilters$: Observable<IFilterSelectItem[]> = this.filtersService.getCampaingSelectItems().pipe(
        tap(campaigns => this.logger.debug(this.className, "campaignFilters$ stream", "Retreived campaigns:", campaigns)));

    private promoTypeFilters$: Observable<IFilterSelectItem[]> = this.filtersService.getPromoTypeSelectItems().pipe(
        tap(promoTypes => this.logger.debug(this.className, "promoTypeFilters$ stream", "Retreived promo types:", promoTypes)));

    private promoTypeSO99Filters$: Observable<IFilterSelectItem[]> = this.filtersService.getPromoTypeSO99SelectItems().pipe(
        tap(promoTypesSO99 => this.logger.debug(this.className, "promoTypeFilters$ stream", "Retreived SO99 promo types:", promoTypesSO99)));

    private promoStatusFilters$: Observable<IFilterSelectItem[]> = this.filtersService.getPromoStatusSelectItems().pipe(
        tap(promoStatus => this.logger.debug(this.className, "promoStatusFilters$ stream", "Retreived promo status:", promoStatus)));

    private promoAttributes$: Observable<DropDownTreeSelectModel[]> = this.events.promoAttributeChangeEvent$.pipe(
        concatMap((selectedTreeNode: DropDownTreeSelectModel) => {
            return this.filtersService.getPromoAttributeFilterSelectItems(selectedTreeNode);
        }),
        scan((fullList: DropDownTreeSelectModel[], newValues: DropDownTreeSelectModel[]) => {
            return this.mergeAttributeLists(fullList, newValues);
        })
    )

    vm$ = combineLatest([
        this.campaignFilters$, this.promoTypeFilters$,
        this.promoTypeSO99Filters$, this.promoStatusFilters$,
        this.promoAttributes$]).pipe(
            map(([campaignFilters, promoTypeFilters, promoTypeSO99Filters, promoStatusFilters, promoAttributes]) => {
                return { campaignFilters, promoTypeFilters, promoTypeSO99Filters, promoStatusFilters, promoAttributes }
            }));

    private mergeAttributeLists(currentList: DropDownTreeSelectModel[], newValues: DropDownTreeSelectModel[]): DropDownTreeSelectModel[] {
        let mergedList = [...currentList ];
        newValues.forEach(newValue => {
            if(!currentList.find(x => x.id === newValue.id)) {
                mergedList = [...mergedList, newValue];
            }
        });
        return mergedList;
    }

    // private getDefaultMarketAttr(): DropDownTreeSelectModel {
    //     return {
    //         id: null,
    //         name: null,
    //         itemId: null,
    //         parentId: null,
    //         hasItems: null,
    //         itemType: SelectItemType.MarketFreeAttrName,
    //         isExpanded: null
    //     }
    // }

    // private getDropDownFilterTreeData(): Observable<DropDownTreeSelectModel[]> {
    //     return of([{
    //         id: "1",
    //         name: "Attribute 1",
    //         itemId: "1",
    //         parentId: null,
    //         hasItems: true,
    //         itemType: SelectItemType.MarketFreeAttrName,
    //         isExpanded: false
    //     }, {
    //         id: "2",
    //         name: "Attribute 2",
    //         itemId: "2",
    //         parentId: null,
    //         hasItems: true,
    //         itemType: SelectItemType.MarketFreeAttrName,
    //         isExpanded: false
    //     }, {
    //         id: "3",
    //         name: "Attribute 3",
    //         itemId: "3",
    //         parentId: null,
    //         hasItems: true,
    //         itemType: SelectItemType.MarketFreeAttrName,
    //         isExpanded: false
    //     }]);
    // }

    // private getChildOne(): Observable<DropDownTreeSelectModel[]> {
    //     return of([{
    //         id: "4",
    //         name: "Value 1",
    //         itemId: "4",
    //         parentId: "1",
    //         hasItems: false,
    //         itemType: SelectItemType.MarketFreeAttrValue,
    //         isExpanded: false
    //     },{
    //         id: "5",
    //         name: "Value 2",
    //         itemId: "5",
    //         parentId: "1",
    //         hasItems: false,
    //         itemType: SelectItemType.MarketFreeAttrValue,
    //         isExpanded: false
    //     }]);
    // }

    // private  getChildTwo(): Observable<DropDownTreeSelectModel[]> {
    //     return of([{
    //         id: "6",
    //         name: "Value 3",
    //         itemId: "6",
    //         parentId: "2",
    //         hasItems: false,
    //         itemType: SelectItemType.MarketFreeAttrValue,
    //         isExpanded: false
    //     },{
    //         id: "7",
    //         name: "Value 4",
    //         itemId: "7",
    //         parentId: "2",
    //         hasItems: false,
    //         itemType: SelectItemType.MarketFreeAttrValue,
    //         isExpanded: false
    //     }])
    // }

    // private  getChildThree(): Observable<DropDownTreeSelectModel[]> {
    //     return of([{
    //         id: "8",
    //         name: "Value 5",
    //         itemId: "8",
    //         parentId: "3",
    //         hasItems: false,
    //         itemType: SelectItemType.MarketFreeAttrValue,
    //         isExpanded: false
    //     },{
    //         id: "9",
    //         name: "Value 6",
    //         itemId: "9",
    //         parentId: "3",
    //         hasItems: false,
    //         itemType: SelectItemType.MarketFreeAttrValue,
    //         isExpanded: false
    //     }])
    // }
}