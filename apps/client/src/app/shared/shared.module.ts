import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [TranslateModule, CommonModule, MatDialogModule, HttpClientModule],
  exports: [TranslateModule, MatDialogModule, HttpClientModule],
})
export class SharedModule {}
