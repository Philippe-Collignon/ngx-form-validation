import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvAlphanumericValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AlphanumericValidatorDirective, multi: true }],

})
export class AlphanumericValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvAlphanumericValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

          if (this.nfvAlphanumericValidator)  {

            const param: string = this.nfvAlphanumericValidator;
            this.isValid = validator.isAlphanumeric(value, param as ValidatorJS.AlphanumericLocale);

          } else {
              this.isValid = validator.isAlphanumeric(value);
         }
    const message = {
      'alphanumericValidator': {
        'param': this.nfvAlphanumericValidator
      }
    };
    return this.isValid ? null : message;
  }

}
