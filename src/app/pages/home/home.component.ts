import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

import { take } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public listBook: Book[] = [];

  constructor(
    public readonly bookService: BookService //TOMAR EN CUENTA PARA EL TEST, YA QUE USA UN SERVICE
  ) { }

  ngOnInit(): void {

    this.getBooks();

  }

  //TEST A METODO CON SUBSCRIBE
  public getBooks(): void {
    //LLAMA AL SERVICIO
    //PIPE SOLO SE SUSCRIBE UNA VEZ
    this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => {
      this.listBook = resp; //AL SER SUSCRIBE ESTE NO ENTRA
    });
  }

}
