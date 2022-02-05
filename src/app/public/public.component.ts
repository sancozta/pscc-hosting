import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor(
    public renderer: Renderer2,
    public element: ElementRef,
    public location: Location,
  ) { }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
    this.renderer.listen('window', 'scroll', () => {
      if (window.scrollY > window.screen.height) {
        navbar.classList.remove('navbar-transparent');
      } else {
        navbar.classList.add('navbar-transparent');
      }
      if (this.detectarMobile()){
        navbar.classList.add('navbar-transparent');
      }
    });
  }

  detectarMobile() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    }
    else {
      return false;
    }
  }
}
