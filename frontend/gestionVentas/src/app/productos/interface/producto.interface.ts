import { EstadoProducto } from "./estado-producto.enum";

export interface Producto{
    id: number;
    codigo: string;
    barrio: string;
    precio: number;
    urlImagen: string;
    estado: EstadoProducto
}