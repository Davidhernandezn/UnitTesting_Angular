import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { of } from 'rxjs';
/**
 * 1-Agregar describe
 * 2-  //DECLARAR COMPONENT
 * 3- //DECLARAMOS EL FIXTURE
 * 4-//CONFIGURAR EL TEXBEAD
 * 5-// VER SI EXISTE USO DE UB SERVICIO
 * 6-//AGREGAR BEFOREEACH PARA INSTANCAR EL COMPONENTE
 *  **/

//ARRAY DE LIBROS - PREPARAR CONSTANTES
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

//VALOR A USAR EN EL SERVICIO
const bookServiceMock = {
    getBooks: () => of(listBook),
};

//PARA SIMULAR EL PIPE
@Pipe({name: 'reduceText'})
class ReduceTextPipeMock implements PipeTransform{
    transform():string {
        return '';
    }
}

describe('HOME component', () => {
    let component: HomeComponent; //DECLARAR COMPONENT
    let fixture: ComponentFixture<HomeComponent>; //DECLARAMOS EL FIXTURE

    //ANTES DE CADA TEST
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports:[
            HttpClientTestingModule
        ],
        declarations:[
            HomeComponent,
            ReduceTextPipeMock//LLAMAR SIMULACION DE PIPE Y NO EL ORINAL
        ],
        providers:[//AGREGA LOS SERVICIOS
            //BookService
            {//CUANDO EL COMPONENT NECESITE EL SERVICIO BOOKSERVICE
                provide: BookService,
                useValue: bookServiceMock//LLAME ESTE VALOR 
            }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
    });

    beforeEach(() => {
       fixture = TestBed.createComponent(HomeComponent);
       component = fixture.componentInstance;
       fixture.detectChanges();
    });

//TEST
    xit('should create', () =>{
        expect(component).toBeTruthy();
    });
    


    
  //PRACTICA PARA DEPURAR METODO
    fit('get books from the subscribe',() =>{
        //TRAER SERVICIO
        const bookService = fixture.debugElement.injector.get(BookService);
        //--para length -- const listBook: Book[] = [];
        //SPIA PARA ESPERAR Y SIMULAR EL METODO
        //PASAR SERVICIO Y METODO A SIMULAR
        //PASAR OBSERVABLE OF DE RXJS (espiamis el metodo y devuelve un obserbasble de tipo listbook)
        //const spy1 = spyOn(bookService, 'getBooks').and.returnValue(of(listBook)); //USANDO MOCK PODEMOS EVITAR ESTA LINEA
        debugger; //PARA HACER DEBUG 
        component.getBooks();
        //expect(spy1).toHaveBeenCalled();//USANDO MOCK PODEMOS EVITAR ESTA LINEA
        //VER QUE VALGA 0
        //expect(component.listBook.length).toBe(0); LENGTH CON LISTA VACIA
        //PASAR LA LISTA QUE TIENE DATOS
        expect(component.listBook.length).toBe(3); 
    });

});