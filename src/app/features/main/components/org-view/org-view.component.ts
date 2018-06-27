import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { EventService } from 'src/app/services/event.service';

@Component({
  templateUrl: './org-view.component.html',
  styleUrls: ['./org-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgViewComponent implements OnInit {
  organization: MyEv.Organization;

  constructor(private eventService: EventService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventService.getOrganization$(id)
      .subscribe(o => {
        this.organization = o;
        this.cdr.detectChanges();
      });
  }
}
