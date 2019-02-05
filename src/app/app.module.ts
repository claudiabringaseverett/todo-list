import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { TodosComponent } from './modules/todos/todos.component';

import { AppRoutingModule } from './/app-routing.module';

import { MessagesComponent } from './modules/messages/messages.component';
import { TodoDetailComponent } from './modules/todo-detail/todo-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TodosComponent,
    MessagesComponent,
    TodoDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
