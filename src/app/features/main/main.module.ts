import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, MatCardModule } from '@angular/material';

import { MainRoutingModule } from './main.routing';

const components = [MainRoutingModule.components];

const mat_modules = [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, MatCardModule];


@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        mat_modules
    ],
    declarations: [components],
    providers: []
})
export class MainModule {
    constructor() {

    }
}
