import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WonitemsComponent } from './wonitems.component';

describe('WonitemsComponent', () => {
  let component: WonitemsComponent;
  let fixture: ComponentFixture<WonitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WonitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WonitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
