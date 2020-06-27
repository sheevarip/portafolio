import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve } from '../../../node_modules/@types/q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();
   }


  private cargarProductos(){

    return new Promise( (resolve, reject) =>{
      this.http.get('https://angular-html-d58bf.firebaseio.com/productos_idx.json')
    .subscribe((resp: Producto[]) => {
      this.productos = resp;
      this.cargando = false;
      resolve();
    });

    });

  }
  getProducto(id: string){
    return this.http.get(`https://angular-html-d58bf.firebaseio.com/productos/${ id }.json`);
  }


  buscarProducto(termino: string){

    if (this.productos.length === 0){
      this.cargarProductos().then( () => {
        this.filtrarProducto(termino);
      });
    }else{
      this.filtrarProducto(termino);
    }
    }


  private filtrarProducto( termino: string){
    /* console.log(this.productos); */
    this.productosFiltrado = [];
    termino = termino.toLowerCase();

    this.productos.forEach(prod=>{
      const tituloLower = prod.titulo.toLowerCase();
      if (prod.categoria.indexOf(termino) >=0 || tituloLower.indexOf(termino) >=0){
        this.productosFiltrado.push( prod );
      }
    });
  }
}
