import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[hexadecimalValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: HexadecimalValidatorDirective, multi: true }],
  
})
export class HexadecimalValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() hexadecimalValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isHexadecimal(value);
    
    const message = {
      'hexadecimalValidator': {
        'param': this.hexadecimalValidator
      }
    };
    return this.isValid ? null : message;
  }

}