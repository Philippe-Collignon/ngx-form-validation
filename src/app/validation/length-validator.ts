import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvLengthValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: LengthValidatorDirective, multi: true }],

})
export class LengthValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() nfvLengthValidator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.nfvLengthValidator)  {

            const param: ValidatorJS.IsLengthOptions = JSON.parse(this.nfvLengthValidator);
            this.isValid = validator.isLength(value, param);

          }


    const message = {
      'lengthValidator': {
        'param': this.nfvLengthValidator
      }
    };
    return this.isValid ? null : message;
  }

}
