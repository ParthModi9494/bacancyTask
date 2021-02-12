import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStockType]'
})
export class StockTypeDirective {
  @Input("stockValue") stockValue: string = "";
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2) { }

  // change text and color of the second label based on predefined condition
  ngOnChanges() {
    if (!this.stockValue) {
      this.setLabelData("", "");
      return;
    }
    const stock = Number(this.stockValue);
    if (stock <= 10) {
      this.setLabelData("C", "bg-danger");
    } else if (stock > 10 && stock <= 20) {
      this.setLabelData("B", "bg-warning");
    } else if (stock > 20) {
      this.setLabelData("A", "bg-success");
    } else {
      this.setLabelData("", "");
    }
  }

  // to set the element properties using renderer
  setLabelData(label: string, className: string) {
    this.renderer.setProperty(this.elementRef.nativeElement, "classList", ["label"]);
    this.renderer.setProperty(this.elementRef.nativeElement, "innerText", label);
    this.renderer.addClass(this.elementRef.nativeElement, className);
  }
}
