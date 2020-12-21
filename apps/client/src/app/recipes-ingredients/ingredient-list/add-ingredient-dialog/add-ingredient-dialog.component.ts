import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Ingredient } from '@prisma/client';

@Component({
  selector: 'matok-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrls: ['./add-ingredient-dialog.component.scss'],
})
export class AddIngredientDialogComponent implements OnInit {
  checkoutForm: FormGroup;
  addOther: boolean;

  constructor(
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<any, { value: Ingredient; addOther: boolean }>,
    @Inject(MAT_DIALOG_DATA) public data?: Ingredient
  ) {}

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      name: [this.data ? this.data.name : '', Validators.required],
      price: [this.data ? this.data.price : '', Validators.required],
      weight: [this.data ? this.data.weight : '', Validators.required],
    });
  }

  onSubmit() {
    this.dialogRef.close({ value: this.checkoutForm.value, addOther: this.addOther });
  }

  isDisabled() {
    return !!Object.values(this.checkoutForm.controls).some(c => c.errors);
  }
}
