import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina ={};
  cargada = false;

  constructor( private http: HttpClient) {

    this.http.get('assets/data/data-pagina.json')
    .subscribe( resp =>{

          this.cargada = true;
          this.info = resp;
          console.log(resp);
        });

   }
}
