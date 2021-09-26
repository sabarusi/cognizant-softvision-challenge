export interface Candidate {
  id: string;
  name: string;
  step: "Entrevista inicial" | "Entrevista técnica" | "Oferta" | "Asignación" | "Rechazo";
  comments: string;
}

export const STEPS : Candidate['step'][] =[
  "Entrevista inicial",
  "Entrevista técnica",
  "Oferta",
  "Asignación",
  "Rechazo"
]
export enum ACTIONS{
  ADD,
  DELETE,
  MOVE
}