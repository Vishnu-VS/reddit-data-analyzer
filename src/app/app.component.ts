import { Component, OnInit, Inject } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Endpoint } from './search/endpoint';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  visibleSidebar1;
  items: MenuItem[];


  constructor(private primengConfig: PrimeNGConfig) {
  }

  title = 'Reddit Data Analyzer';

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Search',
            icon: 'pi pi-search',
            routerLink: '/',
            command: () => {
              this.visibleSidebar1 = false;
            },
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
