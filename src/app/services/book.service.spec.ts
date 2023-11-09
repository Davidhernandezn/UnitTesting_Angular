import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';

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

        //antes de cada prueba , PASAR UNA KEY DE TIPO STRING
        spyOn(localStorage, 'getItem').and.callFake((key:string) => {
            //STORAGE CUANDO SE LLAME GET ITEM  Y PASEMOS UNA KEY
            return storage[key] ? storage[key]:null; //DEVUELVE STORAGE, SI NO EXISTE DEVUELVE NULL
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

    
//TEST SERVICIO LOCALSTORAGE
//usamos un get y set item
    /**  public getBooksFromCart(): Book[] {
    let listBook: Book[] = JSON.parse(localStorage.getItem('listCartBook'));
    if (listBook === null) {
      listBook = [];
    }
    return listBook;
  }
   */

  //SIMULAR LOCALSTORAGE
  //test: LISTA DE CARRITO VACIO DEVUELVE UN ARRAY VACIO
    it('getBooksFromCart return empty array when localStorage is empty', () => {
        const listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);//VALIDA LOCALSTORAGE
    })
});