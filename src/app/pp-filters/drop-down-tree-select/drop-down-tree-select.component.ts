import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IFilter } from '../filters';
import { TreeNodesService } from './tree-filters';
import { DropDownTreeSelectModel } from './tree-filters/drop-down-tree-select.model';

@Component({
  selector: 'pp-drop-down-tree-select',
  templateUrl: './drop-down-tree-select.component.html',
  styleUrls: ['./drop-down-tree-select.component.scss']
})
export class DropDownTreeSelectComponent implements OnChanges {
  @Input() filtersList: DropDownTreeSelectModel[];
  @Output() filterListNodeExpanded: EventEmitter<DropDownTreeSelectModel> = new EventEmitter<DropDownTreeSelectModel>();
  @Output() itemSelected: EventEmitter<IFilter> = new EventEmitter<IFilter>();
  currentSelectedNode: string;
  filtersListData: DropDownTreeSelectModel[] = [];

  constructor(private treeNodesService: TreeNodesService) { }

  ngOnChanges(changes: SimpleChanges): void {
		if (changes['filtersList'] && changes['filtersList'].currentValue.length > 0) {
      this.treeNodesService.buildTreeNodes([...changes['filtersList'].currentValue]);
      this.filtersListData = this.treeNodesService.nodesToDisplay;
    }
  }

  emitSelection(e: any): void {
    if (e.value === null) {
      this.itemSelected.emit(null);
    }
  }

  itemExpanded(item: any): void {
    const itemData: DropDownTreeSelectModel = item.node.itemData;
    if (itemData.hasItems) {
      this.filterListNodeExpanded.emit(itemData);
    }
  }

  onItemClick(itemData: DropDownTreeSelectModel): void {
    if(!itemData.hasItems) {
      this.currentSelectedNode = itemData.name;
      this.itemSelected.emit({ id: itemData.itemId, name: itemData.name });
    }
  }
}
