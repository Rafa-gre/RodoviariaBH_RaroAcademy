import { ViagemType } from "./ViagemType";

export type CompanhiaType = {
    id: number,
    nome: string,
    viagens: ViagemType[],
}
