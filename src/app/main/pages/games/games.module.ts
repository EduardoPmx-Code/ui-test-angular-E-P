import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { ListComponent } from './components/list/list.component';
import { SingleComponent } from './components/single/single.component';
import { SharedModule } from "../../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GamesComponent, ListComponent, SingleComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
]
})
export class GamesModule { }
