import { Producto } from "../../productos/interface/producto.interface";
import { EstadoReserva } from "./estadoReserva.enum";

export interface ReservaUsuario{
    id: string;
    producto: Producto;
    nombreCliente: string;
    estado: EstadoReserva
}