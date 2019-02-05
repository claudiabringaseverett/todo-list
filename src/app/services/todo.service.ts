import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Todo } from '../models/todo';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private todosUrl = 'api/todos';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    getTodos (): Observable<Todo[]> {
      return this.http.get<Todo[]>(this.todosUrl)
        .pipe(
          tap(todos => this.log('fetched todos')),
          catchError(this.handleError('getHeroes', []))
        );
    }
  
    getTodoNO404<Data>(id: number): Observable<Todo> {
      const url = `${this.todosUrl}/?id=${id}`;
      return this.http.get<Todo[]>(url)
        .pipe(
          map(todos => todos[0]),
          tap(h => {
            const outcome = h ? `fetched` : `did not find`;
            this.log(`${outcome} todo id=${id}`); 
          }),
          catchError(this.handleError<Todo>(`getTodo id=${id}`))
        );
    }
  
    getTodo(id: number): Observable<Todo> {
      const url = `${this.todosUrl}/${id}`;
      return this.http.get<Todo>(url).pipe(
        tap(_ => this.log(`fetched todo id=${id}`)),
        catchError(this.handleError<Todo>(`getTodo id=${id}`))
      );
    }
  
    addTodo (todo: Todo): Observable<Todo> {
      return this.http.post<Todo>(this.todosUrl, todo, httpOptions)
        .pipe(
          tap((todo: Todo) => this.log(`added todo w/ id=${todo.id}`)),
          catchError(this.handleError<Todo>('addTodo'))
      );
    }
  
    deleteTodo (todo: Todo | number): Observable<Todo> {
      const id = typeof todo === 'number' ? todo : todo.id;
      const url = `${this.todosUrl}/${id}`;
  
      return this.http.delete<Todo>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted todo id=${id}`)),
        catchError(this.handleError<Todo>('deleteTodo'))
      );
    }
  
    updateTodo (todo: Todo): Observable<any> {
      return this.http.put(this.todosUrl, todo, httpOptions)
      .pipe(
        tap(_ => this.log(`updated todo id=${todo.id}`)),
        catchError(this.handleError<any>('updateTodo'))
      );
    }
  
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
  
    private log(message: string) {
      this.messageService.add(`TodoService: ${message}`);
    }
  }
  