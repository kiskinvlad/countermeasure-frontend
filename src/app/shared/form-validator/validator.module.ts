import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ValidatorModule {
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

   public isFieldValid(formGroup: FormGroup, field: string) {
     return !formGroup.get(field).valid && formGroup.get(field).touched;
   }

   // Return bootstrap class for invalid form field
   public displayFieldCss(formGroup: FormGroup, field: string) {
     return {
       'is-invalid': this.isFieldValid(formGroup, field)
     };
   }
}
