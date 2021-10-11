import { PpFilterTypes } from "./pp-filter-type.enum";
import { FiltersManager } from "./filters-manager.service";
import { PpFilters } from "./pp-filter.class";
import { IPpFilters } from "./pp-filter.model";

describe("FiltersManager", () => {
    let loggerMock = jasmine.createSpyObj(["debug"]);
    let filtersManager: FiltersManager;
    let filters: IPpFilters;

    beforeEach(() => {
        filtersManager = new FiltersManager(loggerMock);
        filters = {
            datesRange: {
                start: new Date(2021, 5, 11),
                end: new Date(2021, 5, 12)
            },
            promoDuration: {
                start: 1,
                end: 90
            },
            campaigns: [{
                filterItemId: "1",
                filterItemName: "Campaign 1",
                filterItemType: PpFilterTypes.campaigns,
                isSelected: true
            }],
            promoStatus: [{
                filterItemId: "1",
                filterItemName: "Status 1",
                filterItemType: PpFilterTypes.promoStatus,
                isSelected: true
            }],
            promoTypes: [{
                filterItemId: "1",
                filterItemName: "PromoType 1",
                filterItemType: PpFilterTypes.promoType,
                isSelected: true
            }],
            promoTypesSO99: [{
                filterItemId: "1",
                filterItemName: "PromoType SO99 1",
                filterItemType: PpFilterTypes.promoTypeSO99,
                isSelected: true
            }],
            productCategories: [{
                filterItemId: "1",
                filterItemName: "Product Category 1",
                filterItemType: PpFilterTypes.productCategories,
                isSelected: true
            }],
            marketCategories: [{
                filterItemId: "1",
                filterItemName: "Market Category 1",
                filterItemType: PpFilterTypes.marketCategories,
                isSelected: true
            }],
            productAttribute: {
                id: "1",
                name: "Product Attribure 1"
            },
            marketAttribute: {
                id: "1",
                name: "Market Attribute 1"
            },
            promoAttribute: {
                id: "1",
                name: "Promo Attribute 1"
            }
        }
    });

    describe("applyFilters()", () => {
        it("should make applyFiltersEvent$ to emit the filters value", done => {
            // arrange
            filtersManager.filters = filters;
    
            // act
            filtersManager.applyFilters();
            filtersManager.applyFiltersEvent$.subscribe((emitedFilters: IPpFilters) => {
                // assert
                expect(emitedFilters).toEqual(filters);
                done();
            });
        });
    });

    describe("clearAllFilters()", () => {
        it("should make applyFiltersEvent$ to emit a cleared filters object", done => {
            // arrange
            filtersManager.filters = filters;

            // act
            filtersManager.clearAllFilters();
            filtersManager.applyFiltersEvent$.subscribe((clearedFilters: IPpFilters) => {
                // assert
                expect(filtersManager.filters).toEqual(PpFilters.createEmptyModel());
                expect(clearedFilters).toEqual(PpFilters.createEmptyModel());
                done();
            })
        });
    });
});