export const formatCEP = (cep: string): string => {
  return cep.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
};

export const validateCEP = (cep: string): boolean => {
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8;
};

export const fetchAddress = async (cep: string): Promise<Response> => {
  const cleanCEP = cep.replace(/\D/g, '');
  const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
  return response;
};