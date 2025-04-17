import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'header-layout',
  standalone: true,
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss'],
  imports: [MatIconModule],
})
export class HeaderLayoutComponent {
  menuOpen = false;

  constructor(private eRef: ElementRef, private renderer: Renderer2) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.menuOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = this.eRef.nativeElement.querySelector('.wrapper-header');
    if (window.scrollY > 10) {
      this.renderer.addClass(header, 'scrolled');
    } else {
      this.renderer.removeClass(header, 'scrolled');
    }
  }
}
