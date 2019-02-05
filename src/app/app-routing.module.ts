import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { TodosComponent } from './modules/todos/todos.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { TodoDetailComponent } from './modules/todo-detail/todo-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: TodoDetailComponent
  },
  {
    path: 'todos',
    component: TodosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
