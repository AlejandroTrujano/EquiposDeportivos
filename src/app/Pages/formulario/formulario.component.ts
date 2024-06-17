import { Component, Input, OnInit, inject  } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { CiudadService } from '../../Services/ciudad.service';
import { Ciudad } from '../../Models/Ciudad';
import { EquiposDeportivos } from '../../Models/EquiposDeportivos';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { EquiposDeportivosService } from '../../Services/equipos-deportivos.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    MatButtonModule, 
    MatTableModule, 
    MatCardModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})

export class FormularioComponent implements OnInit{

  private ciudadService = inject(CiudadService);
  private equipo = inject(EquiposDeportivosService);
  public listCiudad: Ciudad[] = [];
  public formBuild = inject(FormBuilder);
  @Input('IdEquipo') IdEquipo! : number;
 //public displayedColumns: string[] = ['IdCiudad', 'Nombre'];

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
 
 public forms:FormGroup = this.formBuild.group({
  NombreEquipo: [''],
  Entrenador:[''],
  Fundacion:[0],
  CampeonatosGanados:[''],
  Ciudad: {
    IdCiudad: [0]
  }
});

 ngOnInit(): void {
  if(this.IdEquipo != 0){
    this.equipo.byId(this.IdEquipo).subscribe({
      next:(data) => {
        this.forms.patchValue({
          NombreEquipo: data.NombreEquipo,
          Entrenador: data.Entrenador,
          Fundacion: data.Fundacion,
          CampeonatosGanados: data.CampeonatosGanados,
          Ciudad: data.Ciudad.Nombre
        })
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
 }

 add(){
  const objeto : EquiposDeportivos = {
    IdEquipo : this.IdEquipo,
    NombreEquipo : this.forms.value.NombreEquipo,
    Entrenador : this.forms.value.Entrenador,
    Fundacion : this.forms.value.Fundacion,
    CampeonatosGanados : this.forms.value.CampeonatosGanados,
    EquipoDeportivo: this.forms.value.number,
    Ciudad: {
        IdCiudad: this.forms.value.Ciudad,
        Nombre: this.forms.value.Nombre
    }
  }
  if(this.IdEquipo == 0){
    this.equipo.add(objeto).subscribe({
      next:(data)=>{
        if(data.messageContent){
          this.route.navigate(["/"]);
        }else{
          alert("Error al insertar");
        }
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
  }else{
    this.equipo.update(objeto).subscribe({
      next:(data) =>{
        if(data){
          this.route.navigate(["/"]);
        }else{
          alert("Error al editar");
        }
      },
      error:(err) => {
        console.log(err.message);
      }
      })
    }
  }

 postForm(form:EquiposDeportivos){
    console.log(form);
 }


 constructor(private route:Router){
    this.GetAllCiudad();
 }

 volver(){
  this.route.navigate(["/inicio"])
 }
}


