import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestBidderComponent } from './highest-bidder.component';

describe('HighestBidderComponent', () => {
  let component: HighestBidderComponent;
  let fixture: ComponentFixture<HighestBidderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighestBidderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighestBidderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
