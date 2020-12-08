import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [TranslateModule, CommonModule, MatDialogModule],
  exports: [TranslateModule, MatDialogModule],
})
export class SharedModule {}
