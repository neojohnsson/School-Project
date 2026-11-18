import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPacks } from './open-packs';

describe('OpenPacks', () => {
  let component: OpenPacks;
  let fixture: ComponentFixture<OpenPacks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenPacks],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenPacks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
