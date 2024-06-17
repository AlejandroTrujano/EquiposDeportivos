import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Ciudad } from '../Models/Ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Ciudades/GetAll";
  constructor() { }

  lista(){
    return this.http.get<Ciudad>(this.apiUrl);
  }
}
