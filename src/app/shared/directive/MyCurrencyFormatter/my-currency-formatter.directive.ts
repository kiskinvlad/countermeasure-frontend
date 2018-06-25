import { Directive, HostListener, ElementRef, OnInit, AfterContentChecked } from "@angular/core";
import { MyCurrencyPipe } from '../../pipe/MyCurrency/my-currency.pipe';

@Directive({
  selector: '[myCurrencyFormatter]'
})
export class MyCurrencyFormatterDirective {

  private el: HTMLInputElement;
  private flag: number;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: MyCurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
    this.flag = 0;
  }

  ngOnInit() {
    this.el.value = this.currencyPipe.transform(this.el.value);
  }

  ngAfterContentChecked() {
    if(Number(this.el.value) && !this.flag) {
      this.el.value = this.currencyPipe.transform(this.el.value);
    }
  }

  @HostListener('keydown', ['$event.target.value'])
  onKeydown(value) {
    this.flag = 1;
  }

  @HostListener('keyup', ['$event.target.value'])
  onKeyUp(value) {
    this.flag = 1;
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value) {
    this.flag = 1;
    this.el.value = this.currencyPipe.parse(value); // opposite of transform
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    this.flag = 0;
    this.el.value = this.currencyPipe.transform(value);
  }
}