import { Component, ElementRef, HostListener } from '@angular/core';
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

  constructor(private eRef: ElementRef) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.menuOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }
}
