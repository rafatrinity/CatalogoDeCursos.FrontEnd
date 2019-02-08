import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  HEADER_FIXED_OFFSET_POSITION: number = 114;
  headerFixed: boolean;

  ngAfterViewInit() {
    this.tratarHeaderFixo();
  }

  private tratarHeaderFixo(): void {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      map(() => window.pageYOffset),
      distinctUntilChanged()
    );

    scroll$.subscribe(pageYOffset => {
      if (pageYOffset > this.HEADER_FIXED_OFFSET_POSITION) {
        this.headerFixed = true;
      } else if (this.headerFixed && pageYOffset < this.HEADER_FIXED_OFFSET_POSITION) {
        this.headerFixed = false;
      }
    });
  }
}
