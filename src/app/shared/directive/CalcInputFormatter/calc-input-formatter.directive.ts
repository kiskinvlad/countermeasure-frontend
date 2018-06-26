import { Directive, HostListener, ElementRef, OnInit, AfterContentChecked } from "@angular/core";
import { MyCurrencyPipe } from '../../pipe/MyCurrency/my-currency.pipe';

@Directive({
  selector: '[myCalcInputFormatter]'
})
export class CalcInputFormatterDirective {

  private el: HTMLInputElement;
  private flag: number;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: MyCurrencyPipe
  ) {
    this.flag = 1;
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.currencyPipe.transform(this.el.value);
  }

  ngAfterContentChecked() {
    this.el.value = this.currencyPipe.parse(this.el.value);
    this.el.value = this.currencyPipe.transform(this.el.value);
  }
}
