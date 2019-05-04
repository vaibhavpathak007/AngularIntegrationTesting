/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core'; 

@Component({
  template: `
    <p highlight="cyan">First</p>
    <p highlight>Second</p>
  `,
  providers: [ HighlightDirective ]     // to use directive in template
})
class DirectiveHostComponent { 
}
// we have to add fake component to test detective


describe('HighlightDirective', () => {
  let fixture: ComponentFixture<DirectiveHostComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectiveHostComponent, HighlightDirective ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectiveHostComponent);
    fixture.detectChanges(); 
  });

  it('should highlight paragraph with cyan ',()=>{
    const element: HTMLElement = fixture.debugElement.queryAll(By.css('p'))[0].nativeElement;
    expect(element.style.backgroundColor).toBe('cyan');
  });

  it('should highlight paragraph with default ',()=>{
    const element: HTMLElement = fixture.debugElement.queryAll(By.css('p'))[1].nativeElement;
    let directive = fixture.debugElement.injector.get(HighlightDirective);
    expect(element.style.backgroundColor).toBe(directive.defaultColor);
  });


});
