import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { SearchService } from './search-service.service';
import { Endpoint } from './search/endpoint';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  visibleSidebar1;
  items: MenuItem[];
  loaderSubscribe: any;
  loaderBar:boolean;

  constructor(private primengConfig: PrimeNGConfig, private searchEvent: SearchService, private changeDetectorRef: ChangeDetectorRef) {
  }

  title = 'Reddit Data Analyzer';

  subscribeSearch() {
    this.loaderSubscribe = this.searchEvent.loading.subscribe(
      (loader) => {
        console.log("Loader");
        console.log(loader);
        this.loaderBar = loader;
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  ngOnInit() {
    this.subscribeSearch();
    this.visibleSidebar1 = false;
    this.primengConfig.ripple = true;
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Search',
            icon: 'pi pi-search',
            routerLink: '/',
            // command: () => {
            //   this.visibleSidebar1 = false;
            // },
          },
          {
            label: 'About',
            icon: 'pi pi-info-circle',
          },
        ],
      },
    ];
  }
}
