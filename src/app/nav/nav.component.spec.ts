import { NavComponent } from './nav.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Component } from '@angular/core';
//import { RouterTestingModule } from '@angular/router/testing';
//import { HomeComponent } from '../pages/home/home.component';
//import { CartComponent } from '../pages/cart/cart.component';
import { routes } from '../pages/pages-routing.module';
import { Router } from '@angular/router';

//CREA CLASE FALSA
//class ComponentTestRoute {}

//SEGUNDA FORMA PASAR EL ROUTER POR SERVICIO solo para testear navigate
const routerMock = {
    navigate(){}
}

describe('Nav Component', () => {
    
    let component: NavComponent; //TU COMPONENTE INSTANCIADO
    let fixture: ComponentFixture<NavComponent>

    beforeEach (() => {
                TestBed.configureTestingModule({
                    imports:[
                      //  RouterTestingModule.withRoutes([
                        //    {path: 'home', component: ComponentTestRoute},
                          //  {path: 'cart', component: ComponentTestRoute}
                    //EL PROBLEMAS ES QUE DEBEMOS IMPORTAR Y PROVEER LOS COMPONENTES
                   // ]),//PROVEE PARA TESTING
                    ],
                    declarations:[
                        //LO QUE ESTAMOS TESTEANDO
                        NavComponent,
                    ],
                    providers:[//no necesario
                        //ESTAMOS INYECTANDO EL ROUTER EN EL TS POR LO QUE NECESITAMOS ROUTER 
                        //IMPORTANDO RouterTestingModule EN IMPORTS

                        /****/{
                        provide: Router, useValue: routerMock //PARA EL SERVICIO MOCK
                    }
                    ],
                    schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
                }).compileComponents();
    });

    beforeEach(() =>{
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /**
    // TEST  NAV
    it('should navigate', () => {
        //obtener router (ESTA EN MODULO Y NO EN PROVIDERS)
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigate'); //espiar metodo de router que se obtiene
        //necesitamos el path 

        component.navTo('home');
        expect(spy).toHaveBeenCalledWith(['/home']); //PASAR COMO ESTA SI ES ARRAY LA RUTA

        component.navTo('cart');
        expect(spy).toHaveBeenCalledWith(['/cart']);
    });
**/

    // TEST  NAV con servicio segunda forma, para salir rapido de fallas como por redux o no provider o por un service, ngcookie puede fallar
    it('should navigate', () => {
        const router = TestBed.inject(Router);

        const spy = spyOn(router, 'navigate'); //espiar metodo de router que se obtiene
        
        //llama a navigate
        component.navTo(''); //no llamanos a nada solo pasar string puede ser vacio

        expect(spy).toHaveBeenCalled();//pasa el espia

    });

});