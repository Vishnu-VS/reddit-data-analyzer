import { Component, OnInit, Inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig){}

  title = 'Reddit Data Analyzer';

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

}
