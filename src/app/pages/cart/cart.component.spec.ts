import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';//importar testing
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { async } from 'rxjs/internal/scheduler/async';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Book } from 'src/app/models/book.model';

//array global, Tener a la mano el modelo (agrega datos que se necesitan)
const listBook: Book[] = [{
    name: '',
    author:'',
    isbn:'',
    price: 15,
    amount: 2
},
{
    name: '',
    author:'',
    isbn:'',
    price: 20,
    amount: 1
},
{
    name: '',
    author:'',
    isbn:'',
    price: 8,
    amount: 7
}
];



//nombre del fichero del test unitario y funcion
describe('Cart compoment', () =>{
    let component: CartComponent;
    //component tipo fixtu
    let fixture: ComponentFixture<CartComponent>; //para extraer el servicio (fuxture)
    //LLAMAR SERVICIO GLOBAL
    let service : BookService; //AHORA HAY QUE INSTANCIARLO EN BEFORE EACH

    //fichero de testbet
    //configuracion del test
    beforeEach(async() => {
       await TestBed.configureTestingModule({
                imports: [
                   HttpClientTestingModule //simular la acciomb  (MODULO PARA IMPORTAR HACER PETICIONES FALSAS )
                ],
                declarations:[
                    CartComponent
                ],
                providers:[
                //LOS SERVICIOS QUE SE OCUPA EN CART O NUESTRO MODULO
                BookService,
                
                //NO ES LO CORRECTO 
            //    HttpClient, //para testear y se hará petición real
              //  HttpHandler//para testear y se hará petición real
                ],
                //Agregar las 2 constantes, evita errores que no tienen logiva
                schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();//para evitar errores de componente
    });

    //funcion INSTANCIAR component (test)
    beforeEach(async ()=>{
    service= fixture.debugElement.injector.get(BookService); //SERVICIO GLOBAL
       fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();//entra por ngoninit on init 
    });

    //comprobar si el componente se cre+o correctamente (NOMBRE Y FUNCION) - Validación de Test
    it('should create',() => {
        //esperar que ocurra algo
        expect(component).toBeTruthy();
        console.log('TEST 1 COMPONENTES');
    });

    //TEST PARA METODO CON RETURN
    //it(' NOMBRE IDENTICADOR')
    it('getTotalPrice returns an amount', ()=>{
        //TENER A LA MANO EL METODO
        //NECECITAMOS ARRAY DE LIBROS (PUEDE SER GLOBAL PARA REUTILIZARLO)
        const totalPrice = component.getTotalPrice(listBook); //GUARDAMOS VALOR
       //**NO REPLICAR METODO*/
        expect(totalPrice).toBeGreaterThan(0);    //VALOR SUPERIOR A 0
        expect(totalPrice).not.toBe(0); //QUE EL VALOR NO SEA 0 NEGACION
        expect(totalPrice).not.toBeNull(); //QUE NO SEA NULO
        })


    //TEST PARA METODO SIN RETURN
    it('onInputNumberChange incremento correcly', () =>{
        const action = 'plus';

        //necesitamos un libro
        const book = listBook[0];
        //PARA EL TEST PODEMOS VERIFICAR SI SE HA LLAMADO ALGUN METODO
        //AGREGAR ESPIA DE CADA METODO A LLAMAR
        /*UN TEST UNITARIO NO DEBE LLAMAR NINGUN METODO*/
       
        //ACCEDER AL SERVICIO DESDE UN COMPONENTE
        //F1 CORRECTA (SE PUEDE AGREGAR AQUI O DE MANERA GLOBAL)
        //const service= fixture.debugElement.injector.get(BookService);
        //debido a que esta en el TEXT BED PODEMOS ACCEDER
       // service.

        //F2 NO CORRECTA - SACAR SERVICIO APARTIR DEL COMPONENTE (SOLO SI ES PUBLICO)
        //component.NOMBRE_SERVICIO.METODO

        //F3 NO CORRECTO
        //const service = (component as any)._bookService; //AL USAR CASTING CON ANY PIERDE LO QUE SE DECLARO EN EL SERVICIO
        /**RESPETA LOS TIPOS */
        //const service2 = component["_bookService"];// OTRA VARIABLE CON LO MISMO
       //service2.  //accede a los metodos
    });

});;