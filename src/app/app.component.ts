import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'myev-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(swUpdate: SwUpdate) {
    swUpdate.available.subscribe(() => {
      // auto refresh
      // TODO: make as an option for RELEASE

      swUpdate.activateUpdate().then(() => document.location.reload());
    });
  }
}
