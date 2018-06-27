import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material';

import { EventService } from 'src/app/services/event.service';

@Component({
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgListComponent implements OnInit {
  @ViewChild('drawer') drawer: MatSidenav;

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  organizations$: Observable<MyEv.Organization[]>;

  constructor(private eventService: EventService,
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.organizations$ = this.eventService.getOrganizations$();
  }

  navSwipeRight() {
    this.drawer.toggle(true);
  }

  navSwipeLeft() {
    this.drawer.toggle(false);
  }

}
