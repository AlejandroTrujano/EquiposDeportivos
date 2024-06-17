export interface EquiposDeportivos{
    IdEquipo: number;
    NombreEquipo: string;
    Entrenador: string;
    Fundacion: string;
    CampeonatosGanados: number;
    EquipoDeportivo: EquiposDeportivos[];
    Ciudad: {
        IdCiudad: number;
        Nombre: string;
    }
}