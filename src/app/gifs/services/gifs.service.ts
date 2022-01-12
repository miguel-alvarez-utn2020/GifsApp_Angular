import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

//los servicios son globales
@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';
  private apiKey    :string = 'ICkAVA4iOI3aZyfxoolWhigko43Vkn6f';
  private _historial:string[] = [];

  //cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  get historial(){
    
    return [...this._historial];
  }

  constructor(private http:HttpClient){
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs( query:string = '' ) {
    query = query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);
      
      localStorage.setItem('historial', JSON.stringify(this._historial))
      
    }

    //forma en la que se haria en js: opción 1
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=ICkAVA4iOI3aZyfxoolWhigko43Vkn6f&q=dragon ball&limit=10')
    //   .then(resp => {
      //       resp.json().then(data => {
        //           console.log(data);
        //       })
        //   })
        
        //otra forma seria, mucho mas limpia es, con async en la declaración de nuestra función:
        // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=ICkAVA4iOI3aZyfxoolWhigko43Vkn6f&q=dragon ball&limit=10');
        // const data = await resp.json();
        // console.log(data);
        const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);


        console.log(params);
        this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params})
        .subscribe( (resp) => {
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados))
      } )

  }
  
}
