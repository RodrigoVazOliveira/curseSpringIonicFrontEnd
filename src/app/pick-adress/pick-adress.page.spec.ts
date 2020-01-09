import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PickAdressPage } from './pick-adress.page';

describe('PickAdressPage', () => {
  let component: PickAdressPage;
  let fixture: ComponentFixture<PickAdressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickAdressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PickAdressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
