import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { MultiSelectFilterComponent } from '.';
import { PpFilterTypes } from '../filters/pp-filter-type.enum';
import { IFilterSelectItem } from './filter-select-item.model';

describe('CheckBoxFilterListComponent', () => {
    let component: MultiSelectFilterComponent;
    let fixture: ComponentFixture<MultiSelectFilterComponent>;
    const placeHolder: string = "Select campaigns...";
    const defaultTooltip: string = "Select campaigns...";
    let filterItemsList: IFilterSelectItem[] = [{
        filterItemId: "1",
        filterItemName: "Campaign 1",
        filterItemType: PpFilterTypes.campaigns,
        isSelected: true
    }, {
        filterItemId: "2",
        filterItemName: "Campaign 2",
        filterItemType: PpFilterTypes.campaigns,
        isSelected: true
    }, {
        filterItemId: "3",
        filterItemName: "Campaign 3",
        filterItemType: PpFilterTypes.campaigns,
        isSelected: true
    }, {
        filterItemId: "4",
        filterItemName: "Campaign 4",
        filterItemType: PpFilterTypes.campaigns,
        isSelected: true
    }];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MultiSelectFilterComponent],
            imports: [PpAngularMaterialModule, BrowserAnimationsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiSelectFilterComponent);
        component = fixture.componentInstance;
        component.filtersList = [...filterItemsList];
        component.placeHolders = placeHolder;
        component.defaultTooltip = defaultTooltip;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe("ngOnInit()", () => {
        it("should set up default selection if provided", () => {
            // arrange
            const selection: IFilterSelectItem[] = [{ ...filterItemsList[0] }, { ...filterItemsList[1] }];
            fixture = TestBed.createComponent(MultiSelectFilterComponent);
            component = fixture.componentInstance;
            component.filtersList = [...filterItemsList];
            component.defaultSelection = selection;

            // act
            fixture.detectChanges();

            // assert
            const formValue = component.filtersSelectionControl.value;
            expect(formValue).toEqual(selection);
        });
    });

    describe("selectionChanged()", () => {
        it("should emit selected value", () => {
            // arrange
            const listSelectionChangeSpy = spyOn(component.listSelectionChange, "emit");
            component.filtersSelectionControl
            .setValue([{ ...filterItemsList[0] }, { ...filterItemsList[1] }]);
            
            // act
            component.selectionChanged();

            // assert
            const formValue = component.filtersSelectionControl.value;
            expect(listSelectionChangeSpy).toHaveBeenCalledWith(formValue);
        });
    });

    describe("Select and Clear all", () => {
        it("should emit all provided values on selectAll()", () => {
            // arrange
            const listSelectionChangeSpy = spyOn(component.listSelectionChange, "emit"); 
            
            // act
            component.selectAll();

            // assert
            expect(listSelectionChangeSpy).toHaveBeenCalledWith([...filterItemsList]);
        });

        it("should emit empty list on clearAll()", () => {
            // arrange
            const listSelectionChangeSpy = spyOn(component.listSelectionChange, "emit"); 
            component.filtersSelectionControl.setValue([...filterItemsList]);
            
            // act
            component.clearAll();

            // assert
            expect(listSelectionChangeSpy).toHaveBeenCalledWith([]);
        });
    });
});
