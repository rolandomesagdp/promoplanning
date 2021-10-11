import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@shared/pp-angular-material';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { ToggleDrawerService } from './toggle-drawer-service';

@Component({
  selector: 'pp-drawer-card',
  templateUrl: './drawer-card.component.html',
  styleUrls: ['./drawer-card.component.scss']
})
export class DrawerCardComponent implements OnInit, OnDestroy {
  @ViewChild(MatDrawer) filterPane;
  private subsctiptionManager: SubscriptionsManager = new SubscriptionsManager();

  constructor(public toggleDrawerService: ToggleDrawerService) { }
  
  ngOnInit(): void {
    this.subsctiptionManager.add(this.toggleDrawerService.toggleDrawerEvent$.subscribe(
      () => this.toggleFilterPane()
    ));
  }

  toggleFilterPane(): void {
    this.filterPane.toggle();
  }

  ngOnDestroy(): void {
    this.subsctiptionManager.unsubscribe();
  }
}
