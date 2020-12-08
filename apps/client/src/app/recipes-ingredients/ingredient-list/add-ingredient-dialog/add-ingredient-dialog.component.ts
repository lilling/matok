import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Ingredient } from '@matok/data';

@Component({
  selector: 'matok-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrls: ['./add-ingredient-dialog.component.scss'],
})
export class AddIngredientDialogComponent implements OnInit {
  checkoutForm: FormGroup;
  constructor(
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<any, Ingredient>
  ) {}
  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      weight: ['', Validators.required],
    });
  }

  onSubmit() {
    this.dialogRef.close(this.checkoutForm.value);
  }

  isDisabled() {
    return !!Object.values(this.checkoutForm.controls).some((c) => c.errors);
  }
}
