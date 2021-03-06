import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { SliderModule } from 'primeng/slider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { FieldsetModule } from 'primeng/fieldset';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToolbarModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    ChipsModule,
    SliderModule,
    ScrollPanelModule,
    MultiSelectModule,
    SelectButtonModule,
    CalendarModule,
    CardModule,
    TooltipModule,
    TabViewModule,
    SidebarModule,
    MenuModule,
    ToastModule,
    FieldsetModule,
    ProgressBarModule,
  ],
  exports: [
    ToolbarModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    ChipsModule,
    SliderModule,
    ScrollPanelModule,
    MultiSelectModule,
    SelectButtonModule,
    CalendarModule,
    CardModule,
    TooltipModule,
    TabViewModule,
    SidebarModule,
    MenuModule,
    ToastModule,
    FieldsetModule,
    ProgressBarModule,
  ],
})
export class PrimeNGModule {}
