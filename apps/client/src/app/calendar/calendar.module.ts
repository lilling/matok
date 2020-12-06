import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, SharedModule, CalendarRoutingModule],
})
export class CalendarModule {}
