import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

/**
 * A service that allows the sidenav to be manipulated from
 * any component
 * This allows us to toggle the sidenav from the navbar for switching Authors
 */
@Injectable({
providedIn: 'root'
})
export class SidenavService {
  private sidenav: MatSidenav;

  constructor() { }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}
