import { Component} from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

  
  constructor(private gifsService:GifsService) { }

  get busqueda(){
    return this.gifsService.historial;
  }

  buscar( busqueda:string){
    this.gifsService.buscarGifs(busqueda);
  }

}
