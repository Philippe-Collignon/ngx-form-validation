import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvIPValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IPValidatorDirective, multi: true }],

})
export class IPValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvIPValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

          if (this.nfvIPValidator)  {

            const param: string = this.nfvIPValidator;
            const paramnumber: number = +param;
            this.isValid = validator.isIP(value, paramnumber);

          } else {
              this.isValid = validator.isIP(value);
         }
    const message = {
      'IPValidator': {
        'param': this.nfvIPValidator
      }
    };
    return this.isValid ? null : message;
  }

}
