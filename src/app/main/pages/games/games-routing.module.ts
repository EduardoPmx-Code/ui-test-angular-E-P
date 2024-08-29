import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games.component';
import { ListComponent } from './components/list/list.component';
import { SingleComponent } from './components/single/single.component';

const routes: Routes = [
  {
    path:'',
    component:GamesComponent,
    children:[
      {
        path:'',
        redirectTo:'list'
      },
      {
        path:'list',
        component:ListComponent
      },
      {
        path:'single/:id',
        component:SingleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
