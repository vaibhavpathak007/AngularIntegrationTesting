/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserDetailsComponent } from './user-details.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';

class RouterStub{
  navigate(params){ // implemented only one method which is used in component.

  }
}

class ActivatedRouteStub{

  parameter = new Subject();

  push(param){
    this.parameter.next(param); // added to trick the addition of parameter in observable.
  }

  get params(){
    return this.parameter.asObservable();  // same as params property
  }
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers: [
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
    // for component creation we need to have all fake dependency injected.
    // use of original router dependency will decrease performance. so we use sub (fake service)
  });

  it('should redirect to /user when click on save',()=>{
    const router = TestBed.get(Router);
    const spy = spyOn(router,'navigate'); // creating fake implementation of navigation method.
    // this spyOn will use router instance declared in provide from provider array.
    component.save();
    expect(spy).toHaveBeenCalledWith(['users']);
  });

  it('should redirect to /not-found on id is zero',()=>{
    const router = TestBed.get(Router);
    const spy = spyOn(router,'navigate');           // we need it as on init has navigate inside if statement.
    const activatedRoute: ActivatedRouteStub = TestBed.get(ActivatedRoute); // we have defined type here as we have to call push method.
    activatedRoute.push({"id": 0});
    expect(spy).toHaveBeenCalledWith(['not-found']);
  });

});
