export interface ProfileResponse {
  run: number;
  documentNumber: number;
  names: string;
  firstLastName: string;
  secondLastName: string;
  email: string;
  cellphone: string;
  street: string;
  number: number;
  detail: string;
  region: {
    id: number;
    name: string;
  };
  commune: {
    id: number;
    name: string;
  };
}
