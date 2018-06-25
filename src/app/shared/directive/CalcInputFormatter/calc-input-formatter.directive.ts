import { Directive, HostListener, ElementRef, OnInit, AfterContentChecked } from "@angular/core";
import { MyCurrencyPipe } from '../../pipe/MyCurrency/my-currency.pipe';

@Directive({
  selector: '[myCalcInputFormatter]'
})
export class CalcInputFormatterDirective {

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: MyCurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.currencyPipe.transform(this.el.value);
  }

  ngAfterContentChecked() {
    this.el.value = this.currencyPipe.transform(this.el.value);
  }

}
