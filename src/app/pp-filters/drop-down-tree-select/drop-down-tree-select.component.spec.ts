import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IFilter } from '../filters';

import { DropDownTreeSelectComponent } from './drop-down-tree-select.component';
import { DropDownTreeSelectModel, SelectItemType, TreeNodesService } from './tree-filters';

describe('DropDownTreeSelectComponent', () => {
  let component: DropDownTreeSelectComponent;
  let fixture: ComponentFixture<DropDownTreeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownTreeSelectComponent ],
      providers: [ TreeNodesService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownTreeSelectComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("Parent node levels", () => {
    it("should have at least one hidden child after passed as input parameter", () => {
      // arrange
      const filtersList: Array<DropDownTreeSelectModel> = [{
        id: "1",
        name: "Attribute 1",
        itemId: "1",
        parentId: null,
        itemType: SelectItemType.PromoAttr,
        hasItems: true
      },{
        id: "2",
        name: "Attribute 2",
        itemId: "2",
        parentId: null,
        itemType: SelectItemType.PromoAttr,
        hasItems: true
      },{
        id: "3",
        name: "Attribute 3",
        itemId: "3",
        parentId: null,
        itemType: SelectItemType.PromoAttr,
        hasItems: true
      }];

      // act
      component.filtersList = filtersList;
      component.ngOnChanges({
        filtersList: new SimpleChange(null, filtersList, false)
      });

      // assert
      const firstNodeChild = component.filtersListData.find(x => x.parentId === filtersList[0].id);
      const secondNodeChild = component.filtersListData.find(x => x.parentId === filtersList[1].id);
      const thirdNodeChild = component.filtersListData.find(x => x.parentId === filtersList[2].id);

      expect(firstNodeChild).toBeTruthy();
      expect(secondNodeChild).toBeTruthy();
      expect(thirdNodeChild).toBeTruthy();
    });

    it("should notify parent component when parent node is expanded", () => {
      // arrange
      const filterListNodeExpandedSpy = spyOn(component.filterListNodeExpanded, "emit");
      const parentNode: DropDownTreeSelectModel = {
        id: "1",
        name: "Attribute 1",
        itemId: "1",
        parentId: null,
        itemType: SelectItemType.PromoAttr,
        hasItems: true
      }
      // act
      component.itemExpanded({ node: { itemData: parentNode } });

      // assert
      expect(filterListNodeExpandedSpy).toHaveBeenCalledWith(parentNode);
    });
  });

  describe("Child node level", () => {
    it("should notify the parent component when a child node is selected", () => {
      // arrange
      const itemSelectedSpy = spyOn(component.itemSelected, "emit");
      const childNode: DropDownTreeSelectModel = {
        id: "1",
        name: "Attribute 1",
        itemId: "1",
        parentId: null,
        itemType: SelectItemType.PromoAttr,
        hasItems: false
      };

      // act
      component.onItemClick(childNode);

      // assert
      const filterToEmit: IFilter = { id: childNode.id, name: childNode.name }
      expect(itemSelectedSpy).toHaveBeenCalledWith(filterToEmit);
    });

    it("should notify the parent component when the child node selection is cleared", () => {
      // arrange
      const itemSelectedSpy = spyOn(component.itemSelected, "emit");

      // act
      component.emitSelection({ value: null});

      // assert
      expect(itemSelectedSpy).toHaveBeenCalledWith(null);
    });
  });
});
