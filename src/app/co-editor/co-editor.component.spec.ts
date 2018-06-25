import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoEditorComponent } from './co-editor.component';

describe('CoEditorComponent', () => {
  let component: CoEditorComponent;
  let fixture: ComponentFixture<CoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
