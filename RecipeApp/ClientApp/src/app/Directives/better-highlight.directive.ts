import { Directive, OnInit, ElementRef, Renderer2, HostListener, HostBinding } from "@angular/core";

@Directive({
  selector:'[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  constructor(private el: ElementRef, private render: Renderer2) {

  }
  ngOnInit() {

  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = 'lightgrey';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = 'transparent';
  }

}
