import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { formatCEP, validateCEP } from '../utils/address';

interface CEPSearchFormProps {
  onSearch: (cep: string) => void;
  isLoading: boolean;
}

export function CEPSearchForm({ onSearch, isLoading }: CEPSearchFormProps) {
  const [cep, setCep] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCEP = cep.replace(/\D/g, '');
    
    if (!validateCEP(cleanCEP)) {
      setError('CEP inválido. Digite um CEP com 8 dígitos.');
      return;
    }

    setError('');
    onSearch(cleanCEP);
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCEP = formatCEP(e.target.value);
    setCep(formattedCEP);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="mb-2">
        <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">
          Digite um CEP
        </label>
        <div className="relative">
          <input
            type="text"
            id="cep"
            maxLength={9}
            placeholder="00000-000"
            value={cep}
            onChange={handleCEPChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </form>
  );
}