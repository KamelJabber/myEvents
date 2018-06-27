import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { OrgListComponent } from './components/org-list/org-list.component';
import { OrgViewComponent } from './components/org-view/org-view.component';

const components = [MainComponent, OrgListComponent, OrgViewComponent];

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', component: OrgListComponent },
            { path: 'organization/:id', component: OrgViewComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class MainRoutingModule {
    static components = components;

    constructor() { }
}
