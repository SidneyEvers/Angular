import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeEditarComponent } from './filme-editar.component';

describe('FilmeEditarComponent', () => {
  let component: FilmeEditarComponent;
  let fixture: ComponentFixture<FilmeEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmeEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmeEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
