import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { EquiposDeportivos} from '../Models/EquiposDeportivos';
import { ResponseAPI } from '../Models/ResponseAPI';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquiposDeportivosService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "EquiposDeportivos/GetAll";
  constructor() { }

  lista(){
    return this.http.get<EquiposDeportivos>(this.apiUrl);
  }

  eliminar(IdEquipo: number): Observable<any>{
    const rutEliminar = 'EquiposDeportivos/Delete';
    const url = appsettings.apiUrl+rutEliminar+`?IdEquipo=${IdEquipo}`;

    return this.http.get(url);
  }

  byId(IdEquipo: number){
    const rutGetById = 'EquiposDeportivos/GetById';
    const url = appsettings.apiUrl+rutGetById+`?IdEquipo=${IdEquipo}`;

    return this.http.get<EquiposDeportivos>(url);
  }

  add(objeto : JSON){
    const rutAdd = 'EquiposDeportivos/Add';
    const url = appsettings.apiUrl+rutAdd;
    
    return this.http.post<ResponseAPI>(url, objeto);
  }

  update(objeto: EquiposDeportivos){
    const rutUpdate = 'EquiposDeportivos/Update';
    const url = appsettings.apiUrl+rutUpdate;

    return this.http.post<ResponseAPI>(url, objeto);
  }
  
}



