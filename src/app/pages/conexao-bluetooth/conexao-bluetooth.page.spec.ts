import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConexaoBluetoothPage } from './conexao-bluetooth.page';

describe('ConexaoBluetoothPage', () => {
  let component: ConexaoBluetoothPage;
  let fixture: ComponentFixture<ConexaoBluetoothPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConexaoBluetoothPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConexaoBluetoothPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
