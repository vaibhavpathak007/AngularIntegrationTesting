
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { HttpModule } from '@angular/http';
import { of, Observable, observable } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],            // to give instance of http to service.
      declarations: [TodosComponent],
      providers: [TodoService]          // to give instance of service to component.
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTodos from service', () => {
    let todoService = TestBed.get(TodoService);
    spyOn(todoService,'getTodos').and.callFake(()=>{
      return of(['play', 'sing', 'dance']);
    });
    fixture.detectChanges(); // It will perform onInit() loading again after service redefinition.
    expect(component.todos.length).toBe(3);
  });
});
