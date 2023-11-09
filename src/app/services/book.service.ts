import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';

import swal from 'sweetalert2';


@Injectable()
export class BookService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  //TEST CON CONSULTA AUN API
  public getBooks(): Observable<Book[]> {
    const url: string = environment.API_REST_URL + `/book`;
    return this._httpClient.get<Book[]>(url);//DONDE OCURRE LA PETICION (POST, PUT, DELETE,)
  }

  public getBooksFromCart(): Book[] { //DEVUELVE ARRAY DE LIBROS A PARTIR DEL LOCALSTORAGE
    let listBook: Book[] = JSON.parse(localStorage.getItem('listCartBook'));
    if (listBook === null) {//SI ESTA NULO
      listBook = []; //DEVUELVE ARRAY VACIO
    }
    return listBook;//SI NO ES NULO DEVUELVE LA LISTA QUE HAYA OBTENIDO
  }

  public removeBooksFromCart(): void {
    localStorage.setItem('listCartBook', null);
  }

  public addBookToCart(book: Book) {
    //ANTES DE AÑADIR UN LIBRO MIRA SI EXIXTE EN EL LOCAL STORAGE
    let listBook: Book[] = JSON.parse(localStorage.getItem('listCartBook'));
    if (listBook === null) { // Create a list with the book
      book.amount = 1;//SI NO EXISTE PONE CANTIDAD DE 1
      listBook = [ book ];//HACE INSTANCIA A LA LISTA POR PRIMERA VEZ
    } else { 
      const index = listBook.findIndex((item: Book) => {
        return book.id === item.id;
      });
      if (index !== -1) { // Update the quantity in the existing book
        listBook[index].amount++;//SI NO EXISTE LE SUMA 1 A LO QUE HAY
      } else { 
        book.amount = 1;//LO AÑADE A LA LISTA QUE YA EXISTE
        listBook.push(book);
      }
    }
    localStorage.setItem('listCartBook', JSON.stringify(listBook));//necesario agregar spy
    this._toastSuccess(book);
  }

  public updateAmountBook(book: Book): Book[] {
    const listBookCart = this.getBooksFromCart();
    const index = listBookCart.findIndex((item: Book) => {
      return book.id === item.id;
    });
    if (index !== -1) {
      listBookCart[index].amount = book.amount;
      if (book.amount === 0) {
        listBookCart.splice(index, 1);
      }
    }
    localStorage.setItem('listCartBook', JSON.stringify(listBookCart));
    return listBookCart;
  }

  private _toastSuccess(book: Book) {
    const Toast = swal.mixin({ //DEVOLVERA OBJETO TOAST
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 2000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer);
        toast.addEventListener('mouseleave', swal.resumeTimer);
      }//NO DEBEMOS DEJAR NULO YA QUE FALALRIA PARA EL SIGUIENTE METODO
    });
//DEVOLVER METODO QUE TIENE METODO FIRE
    Toast.fire({//DESPUES LE HACEMOS METODO FIRE //no exixtiria metoco fire en un nulo
      icon: 'success',
      title: book.name + ' added to cart'
    });
  }
}
