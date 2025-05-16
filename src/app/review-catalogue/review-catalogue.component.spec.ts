import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCatalogueComponent } from './review-catalogue.component';

describe('ReviewCatalogueComponent', () => {
  let component: ReviewCatalogueComponent;
  let fixture: ComponentFixture<ReviewCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCatalogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
