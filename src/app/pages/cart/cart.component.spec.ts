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
xdescribe('Cart compoment', () =>{
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
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();//entra por ngoninit on init 
    service= fixture.debugElement.injector.get(BookService); //SERVICIO GLOBAL
    
    spyOn(service, 'getBooksFromCart').and.callFake(() => listBook);//EVITANDO SERVICIO EN ONINIT
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

       //ESPIAS
       /**spyOn SOLICITA UN COMPONENTE O SERVIVIO Y UN METODO */
        const spy1 = spyOn (service, 'updateAmountBook').and.callFake( ()=> null); //DEBE ESTAR ANTES DE QUE SE LLANME EL METODO (NO LLAMAR SERVICIO REAL)
        const spy2 = spyOn (component, 'getTotalPrice').and.callFake(() => null);
        
        //VALIDAR SI HA CAMBIADO DE VALOR
        expect(book.amount).toBe(2); //que valga 2


        //action y book que acabamos de agregar
        //CON ESTO LLAMAMOS AL METODO JUNTO CON LOS QUE TIENE DENTRO
        component.onInputNumberChange(action, book);
        expect(book.amount === 3).toBeTrue; //que sea 3

        expect(spy1).toHaveBeenCalled(); //EL METODO SE LLAMÓ CORRECTAMENTE
        




        //F2 NO CORRECTA - SACAR SERVICIO APARTIR DEL COMPONENTE (SOLO SI ES PUBLICO)
        //component.NOMBRE_SERVICIO.METODO

        //F3 NO CORRECTO
        //const service = (component as any)._bookService; //AL USAR CASTING CON ANY PIERDE LO QUE SE DECLARO EN EL SERVICIO
        /**RESPETA LOS TIPOS */
        //const service2 = component["_bookService"];// OTRA VARIABLE CON LO MISMO
       //service2.  //accede a los metodos
    });


    /**TEST MINUS *///TEST PARA METODO SIN RETURN
       it('onInputNumberChange DECREMENTO correcly', () =>{
        const action = 'minus';
        const book = listBook[0];
        //PARA EL TEST PODEMOS VERIFICAR SI SE HA LLAMADO ALGUN METODO
        //AGREGAR ESPIA DE CADA METODO A LLAMAR
        /*UN TEST UNITARIO NO DEBE LLAMAR NINGUN METODO*/
       
        //ACCEDER AL SERVICIO DESDE UN COMPONENTE
        //F1 CORRECTA (SE PUEDE AGREGAR AQUI O DE MANERA GLOBAL)
        //const service= fixture.debugElement.injector.get(BookService);
        //debido a que esta en el TEXT BED PODEMOS ACCEDER
       // service.

        //VALIDAR CAMBIOS DE VALOR
        expect(book.amount).toBe(3);


       //ESPIAS (SOLO VE QUE LAS LLAMADAS SE HAGAN MAS NO VALIDA SI ESTAN CAMBIANDO DE VALOR)
       /**spyOn SOLICITA UN COMPONENTE O SERVIVIO Y UN METODO */
        const spy1 = spyOn (service, 'updateAmountBook').and.callFake( ()=> null); //DEBE ESTAR ANTES DE QUE SE LLANME EL METODO (NO LLAMAR SERVICIO REAL)
        const spy2 = spyOn (component, 'getTotalPrice').and.callFake(() => null);
        //action y book que acabamos de agregar
        //CON ESTO LLAMAMOS AL METODO JUNTO CON LOS QUE TIENE DENTRO
        component.onInputNumberChange(action, book);
        expect(book.amount).toBe(2);

        expect(spy1).toHaveBeenCalled(); //EL METODO SE LLAMÓ CORRECTAMENTE
    });

    //NO TODOS LOS TEST VAN EN SECUENCIA, SE RECOMIEDA USAR ASYC O CREAR MODELOS O INTERFACES DIFERENTES PARA USAR



    /**TEST METODO PRIVADO */
    it('onClearBooks - works correctly',() =>{
        //ESPIA 
        const spyBooks = spyOn((component as any), '_clearListCartBook').and.callThrough(); //PODEMOS HACER CAST PARA METODOS PRIVADOS EN FORMA DE ESPIA (.and.callThrough; PARA LLAMAR Y ACTIVAR COMO SI FUERA SIMULACION DE PETICION)
        const spyBooks2 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);//SIMULA LLAMADO DEL SERVICIO

        component.listCartBook = listBook; //COMPROBAR SI ESTA VACIA
        //console.log('listCartBook before',component.listCartBook.length);//imprimimos valor de la lista
        component.onClearBooks(); //EN SU METODO LLAMA A UN  SERVICIO (EVITARLO)
       // console.log('listCartBook after',component.listCartBook.length);//imprimimos valor de la lista
        expect(component.listCartBook.length).toBe(0);//La lista debe estar vacia
        //expect(component.listCartBook.length === 0).toBeTrue();//FORMA 2
        expect(spyBooks).toHaveBeenCalled();//LLAMADO CORRECTAMENTE
        expect(spyBooks2).toHaveBeenCalled();//LLAMADO CORRECTAMENTE //LAMADO DEL SERVICIO

    });


    /**llamada directa - NO RECOMENDABLE*/
  fit('onClearBooks - works correctly',() =>{

    const spyBooks3 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);//SIMULA LLAMADO DEL SERVICIO
    //COMPROBAR QUE LA LISTA VA LLLENA 
    component.listCartBook = listBook;
    component["_clearListCartBook"](); //LLAMAR AL METODO

    //COMPROBAR QUE LA LISTA VA VACIA
    expect(component.listCartBook.length).toBe(0);
    expect(spyBooks3).toHaveBeenCalled();//LLAMADO CORRECTAMENTE //LAMADO DEL SERVICIO
    });
});