import type { SearchByStreetParams } from '../types/address';

export const fetchAddressByCEP = async (cep: string): Promise<Response> => {
  const cleanCEP = cep.replace(/\D/g, '');
  const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
  return response;
};

export const fetchAddressByStreet = async (params: SearchByStreetParams): Promise<Response> => {
  const { uf, cidade, logradouro } = params;
  const response = await fetch(
    `https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`
  );
  return response;
};

export const formatCEP = (cep: string): string => {
  return cep.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
};

export const validateCEP = (cep: string): boolean => {
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8;
};

export const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];