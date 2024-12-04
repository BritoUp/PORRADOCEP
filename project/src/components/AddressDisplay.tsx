import React from 'react';
import { MapPin } from 'lucide-react';
import type { Address } from '../types/address';

interface AddressDisplayProps {
  address: Address | null;
  error?: string;
}

export function AddressDisplay({ address, error }: AddressDisplayProps) {
  if (error) {
    return (
      <div className="w-full max-w-xl bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!address) return null;

  return (
    <div className="w-full max-w-xl bg-white border border-gray-200 rounded-lg p-6 mt-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Endereço Encontrado</h2>
      </div>
      
      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-medium">CEP:</span> {address.cep}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Logradouro:</span> {address.logradouro}
        </p>
        {address.complemento && (
          <p className="text-gray-700">
            <span className="font-medium">Complemento:</span> {address.complemento}
          </p>
        )}
        <p className="text-gray-700">
          <span className="font-medium">Bairro:</span> {address.bairro}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Cidade:</span> {address.localidade}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Estado:</span> {address.uf}
        </p>
      </div>
    </div>
  );
}