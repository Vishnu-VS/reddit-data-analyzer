import { Component, OnInit, Inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig, @Inject(DOCUMENT) private document){}

  title = 'Reddit Data Analyzer';
  stateOptions: any[];
  value1: string = "dark";

  ngOnInit() {
    this.stateOptions = [{label: 'Dark', value: 'dark'}, {label: 'Light', value: 'light'}];
    this.primengConfig.ripple = true;
  }

  switchTheme(e){
    console.log(e);
    if(e.value == "light"){
      this.document.getElementById('theme').setAttribute('href', 'assets/themes/saga-blue/theme.css');
    }
    else{
      this.document.getElementById('theme').setAttribute('href', 'assets/themes/vela-blue/theme.css');
    }
  }

}
