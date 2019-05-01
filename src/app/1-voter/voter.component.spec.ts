import { VoterComponent } from './voter.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('VoterComponent', () => {

  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({ 
      declarations: [ VoterComponent ]
    }) // this is to initialize other dependencies for testing

    fixture = TestBed.createComponent(VoterComponent); // it create component with integrated html and dependencies.
    component = fixture.componentInstance; // assigning instance of component component
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display total votes', () => {
    component.othersVote=20;
    component.myVote=1;
    fixture.detectChanges(); // on view side angular runs change detection but on testing env. 
    // we have to specify it detectChanges().
    let element : HTMLElement= fixture.debugElement.query(By.css('.vote-count')).nativeElement;
    // here we will get element by class name and casting it from debug element to HTMLElement
    expect(element.innerText).toContain('21'); // always check string by toContain as it may have blank spaces.
  });

  it('should apply class highlighted', ()=>{
    component.myVote=1;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.glyphicon-menu-up')); // here we dont need native element
    // as we dont have to access inner html value.
    expect(element.classes['highlighted']).toBeTruthy();
  });
  
});
