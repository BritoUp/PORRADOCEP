import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ESTADOS_BRASIL } from '../utils/address';
import type { SearchByStreetParams } from '../types/address';

interface StreetSearchFormProps {
  onSearch: (params: SearchByStreetParams) => void;
  isLoading: boolean;
}

export function StreetSearchForm({ onSearch, isLoading }: StreetSearchFormProps) {
  const [formData, setFormData] = useState<SearchByStreetParams>({
    uf: '',
    cidade: '',
    logradouro: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.uf || !formData.cidade || !formData.logradouro) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    if (formData.logradouro.length < 3) {
      setError('Digite pelo menos 3 caracteres no logradouro.');
      return;
    }

    setError('');
    onSearch(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
      <div>
        <label htmlFor="uf" className="block text-sm font-medium text-gray-700 mb-1">
          Estado
        </label>
        <select
          id="uf"
          name="uf"
          value={formData.uf}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Selecione um estado</option>
          {ESTADOS_BRASIL.map(estado => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
          Cidade
        </label>
        <input
          type="text"
          id="cidade"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          placeholder="Digite o nome da cidade"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="logradouro" className="block text-sm font-medium text-gray-700 mb-1">
          Logradouro
        </label>
        <div className="relative">
          <input
            type="text"
            id="logradouro"
            name="logradouro"
            value={formData.logradouro}
            onChange={handleChange}
            placeholder="Digite o nome da rua"
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
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </form>
  );
}