import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
/**
 * Form validation module. Module validate form before sumbit
 */
export class ValidatorModule {
/**
 * Form validate method
 * @param {FormGroup} formGroup Form group for validation
 */
  public validateFormFields(formGroup: FormGroup): void {
      Object.keys(formGroup.controls).forEach(field => {
          const control = formGroup.get(field);
          if (control instanceof FormControl) {
              return control.markAsTouched({ onlySelf: true });
          } else if (control instanceof FormGroup) {
              return this.validateFormFields(control);
          }
      });
   }
/**
 * Check if form field is valid method
 * @param {FormGroup} formGroup Form group for validation
 * @param {string} field Form field for validation
 * @returns {boolean}
 */
  public isFieldValid(formGroup: FormGroup, field: string): boolean {
    return !formGroup.get(field).valid && formGroup.get(field).touched;
  }

/**
 * Return validation style class for form field method
 * @param {FormGroup} formGroup Form group for validation
 * @param {string} field Form field for validation
 * @returns {object}
 */
  public displayFieldCss(formGroup: FormGroup, field: string): object {
    return {
      'is-invalid': this.isFieldValid(formGroup, field)
    };
  }
}
