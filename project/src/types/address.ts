export interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface SearchByStreetParams {
  uf: string;
  cidade: string;
  logradouro: string;
}