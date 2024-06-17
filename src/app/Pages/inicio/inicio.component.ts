import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { EquiposDeportivosService } from '../../Services/equipos-deportivos.service';
import { EquiposDeportivos } from '../../Models/EquiposDeportivos';
import { Router } from '@angular/router';
import { CiudadService } from '../../Services/ciudad.service';
import { Ciudad } from '../../Models/Ciudad';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatCardModule, MatIconModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent {
 private ciudadService = inject(CiudadService);
 public listCiudad: Ciudad[] = [];
 //public displayedColumns: string[] = ['IdCiudad', 'Nombre'];

 private equiposdeportivosService = inject(EquiposDeportivosService);
 public listEquipos: EquiposDeportivos[] = [];
 public displayedColumns: string[] = ['IdEquipo', 'NombreEquipo', 'Entrenador', 'Fundacion', 'CampeonatosGanados', 'Ciudad', 'accion'];



 GetAllCiudad(){
   this.ciudadService.lista().subscribe({
    next:(data) => {
      if(data.Ciudades.length > 0){
        this.listCiudad = Object.values(data.Ciudades);
      }
    },
    error:(err)=>{
      this.GetAllCiudad();
    }
   })
 }

 GetAllEquipos(){ //metodo en TypeScript
    this.equiposdeportivosService.lista().subscribe({
      next:(data)=>{
        if(data.EquipoDeportivo.length > 0){
          this.listEquipos = Object.values(data.EquipoDeportivo);
        }
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
  }
  update(objeto: EquiposDeportivos){
    this.route.navigate(['/formulario', objeto.IdEquipo]);
  }
  delete(objeto: EquiposDeportivos){
    if(confirm("Deseas eliminar el equipo" + objeto.IdEquipo)){
      this.equiposdeportivosService.eliminar(objeto.IdEquipo).subscribe({
        next:(data)=>{
          if(data = true){
            this.GetAllEquipos();
          }else{
            alert("Error no se borro el equipo");
          }
        },
        error:(err)=>{
          console.log(err.message);
        }
      })
    }
  }

 constructor(private route:Router){
  this.GetAllCiudad();
  this.GetAllEquipos();
 }

 Add(){
  this.route.navigate(['/formulario', 0])
 }

}
