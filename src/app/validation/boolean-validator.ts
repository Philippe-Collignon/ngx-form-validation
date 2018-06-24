import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[booleanValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: BooleanValidatorDirective, multi: true }],
  
})
export class BooleanValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() booleanValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isBoolean(value);
    
    const message = {
      'booleanValidator': {
        'param': this.booleanValidator
      }
    };
    return this.isValid ? null : message;
  }

}
