import { ReservaUsuario } from "../../reservas/interface/reserva-usuario.interface";
import { RolUsuario } from "./rol-usuario.interface";

export interface UsuarioData{
    id: number;
    email: string;
    roles: RolUsuario[];
    reservas: ReservaUsuario[];
}