import { EstadoDTO } from 'src/app/models/estado.dto';
export interface CidadeDTO {

    id: string;
    nome: string;
    estado? : EstadoDTO; 
}