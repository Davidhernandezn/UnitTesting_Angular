import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';//importar testing
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { async } from 'rxjs/internal/scheduler/async';

//nombre del fichero del test unitario y funcion
describe('Cart compoment', () =>{
    let component: CartComponent;
    //component tipo fixtu
    let fixture: ComponentFixture<CartComponent>; //para extraer el servicio (fuxture)

    //fichero de testbet
    //configuracion del test
    beforeEach(async() => {
       await TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule //simular la acciomb 
                ],
                declarations:[
                    CartComponent
                ],
                providers:[
                //LOS SERVICIOS QUE SE OCUPA EN CART
                BookService
                ],
                //Agregar las 2 constantes, evita errores que no tienen logiva
                schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    //funcion INSTANCIAR component
    beforeEach(async ()=>{
       fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();//entra por ngoninit on init 
    });

    //comprobar si el componente se cre+o correctamente (NOMBRE Y FUNCION)
    it('should create',() => {
        //esperar que ocurra algo
        expect(component).toBeTruthy();
        console.log('TEST 1 COMPONENTES');
    });
});