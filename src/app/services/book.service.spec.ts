import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';

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

//PARA INSERTAR BOOK
const book: Book = {
    name: '',
    author:'',
    isbn:'',
    price: 15,
    amount: 2
}

fdescribe('Book Service', () => {

    let service:BookService //DECLARA EL SERVICIO
    let httpMock: HttpTestingController; //DECLARA EL TESTING CONTROLLER
    let storage = {};//DECLARAR OBJETO VACIO

    beforeEach( () =>{
        TestBed.configureTestingModule({
            imports:
            [HttpClientTestingModule],
            providers:[BookService],
            schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }); //.compile.components  //NO SE USA COMPILE COMPONENS YA QUE NO HAY COMPONENTES
    });

    //BEFORE EACH PARA INSTANCIAR EL SERVIO Y EL HTTPMOCKS 
    beforeEach( () => {
        service = TestBed.inject(BookService); //Lo que se va a recibir
        //service = TestBed.get(BookService); //SOLO PARA V9
        httpMock = TestBed.inject(HttpTestingController);

        storage = {};//RECETEAR STORAGE PARA QUE EN CADA TEST ESTE VACIO

        //antes de cada prueba , PASAR UNA KEY DE TIPO STRING
        spyOn(localStorage, 'getItem').and.callFake((key:string) => {
            //STORAGE CUANDO SE LLAME GET ITEM  Y PASEMOS UNA KEY
            return storage[key] ? storage[key]:null; //DEVUELVE STORAGE, SI NO EXISTE DEVUELVE NULL
        });

        //SIMULAR METODO SET ITEM
        //SET ITEM DICE LA KEY  Y PASA UN JSON DE LISTBOOK
        spyOn(localStorage, 'setItem').and.callFake((key:string, value:string) => {
            return storage[key] = value; //PASAMOS LA KEY = AL VALOR QUE RECIBIMOS
        });
    });

    afterEach(() => { //SOLO EN SERVICIO PETICIONES API
        httpMock.verify(); //HACE QUE NO HAY PETICIONES PENDIENTES ENTRE CADA TEST (NO SE LANZA OTRO SI HAY UNO PENDIENTE)
    });

    it('Should be created', () => {//SERVICIO CREADO CORRECTAMENTE
        expect(service).toBeTruthy();
    });


    //DEVUELVA LISTA DE LIBROS
    //IMPORTA O CREA LISTA DE LIBROS PARA PASARLOS
    it('Get Books a list of book and does a get method', () => { //COMPROBAR METODO CON CONEXIÓN A UNA API
        //SIMULAR LA PETICION
        service.getBooks().subscribe((resp:Book[]) =>{//LA RESPUESTA ES DE TIPO ARRAYBOOY
        expect(resp).toEqual(listBook);//array recibido sea igual al que esta en respuesta
        });//sucribirse al metodo del servicio (El subscribe ejecuta el comportamiento definido una vez, y se puede volver a llamar)

    //HASTA AHORA NO FUNCIONARIA POR QUE NUNCA SALTARIA EL SUBSCRIBE
    const req = httpMock.expectOne(environment.API_REST_URL + '/book');//AGREGAR URL A LA QUE HACE PETICION
    expect(req.request.method).toBe('GET');//VERIFICAR EL REQUEST QUE SE TIENE SEA DE TIPO GET
    req.flush(listBook);//SIMULAR LA PETICIOH Y DEVUELVE OBSERBABLE DE LISTBOOK
});


  //SIMULAR LOCALSTORAGE
  //test: LISTA DE CARRITO VACIO DEVUELVE UN ARRAY VACIO
    it('getBooksFromCart return empty array when localStorage is empty', () => {
        const listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);//VALIDA LOCALSTORAGE
    });



    //TEST ADD BOOK TO CAR
    it('addBookToCar add a book when the list does not exixt in the localStorage', () =>{
        //PARA METODO QUE DEVUELVE METODO FIRE
        const toast ={
            fire:() => null
        } as any; //POR ERROR DEL TIPO SOLO POR USAR FIRE
        
        //METODO A ESPIAR
        const spy_toast = spyOn(swal,'mixin').and.callFake( ()=> {
            return toast;//devolver toast
        });
    
    //SIMULAR METODO SET ITEM - AGREGAR SPY
    //RESETEAR STORAGE
    
    //ENVIAR UN LIBRO //agregar const de un libro *en el 1er test es 0*
    let listBook = service.getBooksFromCart();    
    expect(listBook.length).toBe(0);
    service.addBookToCart(book);
    listBook = service.getBooksFromCart();    
    service.addBookToCart(book);
    expect(listBook.length).toBe(1);

    //simular con un espia el toast usa swal.mixing 
    expect(spy_toast).toHaveBeenCalled();
    });


        //  public removeBooksFromCart(): void {
       // localStorage.setItem('listCartBook', null);
        //}
    it('RemoveBooksFromCart removes the list from the localstorage', () =>
    {
        //COMPROBAR QUE SE HA REMOVIDO COMPLETAMENTE
        service.addBookToCart(book); //agregamos libro
        let listBook = service.getBooksFromCart(); //TRAER LISTA DE LIBROS
        expect(listBook.length).toBe(1);//VALIDAR QUE LA LISTA TENGA 1
        service.removeBooksFromCart();//elimiar lista del localstorage
        listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);
    });


}); 