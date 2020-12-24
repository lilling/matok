import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IngredientAmount, Recipe, SupplyAmount } from '@prisma/client';

@Component({
  selector: 'matok-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.scss'],
})
export class AddRecipeDialogComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<
      any,
      { item: Recipe; ingredientsAmount: IngredientAmount[]; supplyAmounts: SupplyAmount[] }
    >,
    @Inject(MAT_DIALOG_DATA) public data?: Recipe
  ) {}

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      name: [this.data ? this.data.name : '', Validators.required],
    });
  }

  onSubmit() {
    this.dialogRef.close(this.checkoutForm.value);
  }

  isDisabled() {
    return !!Object.values(this.checkoutForm.controls).some(c => c.errors);
  }
}
