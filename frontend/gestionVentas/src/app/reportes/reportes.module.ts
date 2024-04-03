import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from './reportes.component';
import { MaterialModule } from '../shared/material/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [ReportesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgxChartsModule
  ],
  exports: [
    ReportesComponent
  ]
})
export class ReportesModule { }
