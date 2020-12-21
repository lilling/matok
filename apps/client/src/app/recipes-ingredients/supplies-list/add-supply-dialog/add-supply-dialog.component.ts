import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ingredient, Supply } from '@prisma/client';

@Component({
  selector: 'matok-add-supply-dialog',
  templateUrl: './add-supply-dialog.component.html',
  styleUrls: ['./add-supply-dialog.component.scss'],
})
export class AddSupplyDialogComponent implements OnInit {
  checkoutForm: FormGroup;
  addOther: boolean;

  constructor(
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<any, { value: Supply; addOther: boolean }>,
    @Inject(MAT_DIALOG_DATA) public data?: Supply
  ) {}

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      name: [this.data ? this.data.name : '', Validators.required],
      price: [this.data ? this.data.price : '', Validators.required],
    });
  }

  onSubmit() {
    this.dialogRef.close({ value: this.checkoutForm.value, addOther: this.addOther });
  }

  isDisabled() {
    return !!Object.values(this.checkoutForm.controls).some(c => c.errors);
  }
}
