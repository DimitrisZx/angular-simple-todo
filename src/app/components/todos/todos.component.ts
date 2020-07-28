import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  title: string;
  [key: string]: string;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})

export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  constructor(private http: HttpClient) { }
  todoInput: string = null;
  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(todo => this.addTodo(todo));
  }

  addTodo = todo => this.todos.push(todo);

  addTodoBtn() {
    if (this.todoInput) {
      this.todos.push({ title: this.todoInput, id: this.giveId() });
      this.todoInput = '';
    }
  }

  giveId(): string {
    return this.todos.length.toString();
  }

  saveTodos() {
    console.log('Todos saved:', this.todos);
  }

  deleteTodo(todoTitle) {
    this.todos = this.todos.filter(item => item.id !== todoTitle);
  }
}
