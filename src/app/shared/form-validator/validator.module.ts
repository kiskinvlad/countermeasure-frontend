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
}
