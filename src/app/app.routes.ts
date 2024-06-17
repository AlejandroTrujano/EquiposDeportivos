import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { FormularioComponent } from './Pages/formulario/formulario.component';

export const routes: Routes = [
    {path:'', component:InicioComponent},
    {path:'inicio', component:InicioComponent},
    {path:'formulario/:IdEquipo', component:FormularioComponent}
];1

