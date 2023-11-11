import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../pages/pages-routing.module';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(  
    private router: Router)//INYECTAR EL ROUTER  
    {}

  ngOnInit(): void {
  }

  //USAR ESTE METODO EN EL HTML
  //PARA TEST EN RUTAS HAY QUE AGREGAR UN METODO PARA NAVEGAR
  navTo(path: string):void{ //recibimos path del parametro y navegamos a el
    this.router.navigate([`/${path}`]);
  }

}
