import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvWhitelistedValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: WhitelistedValidatorDirective, multi: true }],

})
export class WhitelistedValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvWhitelistedValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

          if (this.nfvWhitelistedValidator)  {

            const param: string = this.nfvWhitelistedValidator;
            this.isValid = validator.isWhitelisted(value, param);

          }


    const message = {
      'whitelistedValidator': {
        'param': this.nfvWhitelistedValidator
      }
    };
    return this.isValid ? null : message;
  }

}
