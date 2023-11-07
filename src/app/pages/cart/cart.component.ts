import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public listCartBook: Book[] = [];
  public totalPrice = 0;
  public Math = Math;

  constructor(
    private readonly _bookService: BookService //SERVICIO PRIVADO
  ) { }

  ngOnInit(): void {
    this.listCartBook = this._bookService.getBooksFromCart();//EVITAR PARA EL UNITEST
    this.totalPrice = this.getTotalPrice(this.listCartBook);
  }

  //METODO CON RETURN
  public getTotalPrice(listCartBook: Book[]): number { //COMO PARAMETRO SE TIENE ARRAY DE LIBROS
    let totalPrice = 0;
    listCartBook.forEach((book: Book) => {//RECORRE ARRAY LIBROS
      totalPrice += book.amount * book.price; //SUMA CANTIDAD POR EL PRECIO
    });
    return totalPrice; //DEVUELVE EL VALOR TOTAL
  }


  //METODO SIN RETURN
  //BOTON CON INCREMENTO Y DECREMENTO
  public onInputNumberChange(action: string, book: Book): void {
    //SI ACTION ES IGUAL A PLUS SUMA 1 SI RECIBE MINUS TOMA EL -1
    const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
    book.amount = Number(amount);
    this.listCartBook = this._bookService.updateAmountBook(book);//LLAMA SERVICIO CANTIDAD DE LIBROS
    //this.totalPrice = this.getTotalPrice(this.listCartBook); //ACTUALIZA PRECIO TOTAL
  }


  public onClearBooks(): void {
    if (this.listCartBook && this.listCartBook.length > 0) { //SI EXISTE UN CARRITO CON MAS DE 0 PRODUCTOS
      this._clearListCartBook();//BORRA LA LISTA //METODO PRIVADO
    } else {
       console.log("No books available");//SI NO NO HAY LIBROS DISPONIBLES
    }
  }

  //TEST PARA METODO PRIVADO
  /**UN USUARIO NO LLAMA AL METODO PRIVADO ESTE ES LLAMADO DESDE UN PUBLICO
   * 
   * PARA HACERLE TEST HAY QUE LLAMAR AL METODO PUBLICO QUE LLAMA AL PRIVADO
  */
  private _clearListCartBook() {
    this.listCartBook = [];
    this._bookService.removeBooksFromCart();
  }

}
