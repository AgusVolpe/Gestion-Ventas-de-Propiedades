import { Usuario } from "../../auth/interface/usuario.interface";
import { Producto } from "../../productos/interface/producto.interface";
import { EstadoReserva } from "./estadoReserva.enum";

export interface Reserva{
    id: number;
    producto: Producto;
    usuario: Usuario;
    nombreCliente: string;
    estado: EstadoReserva;
}