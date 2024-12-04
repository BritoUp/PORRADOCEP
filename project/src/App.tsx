import React, { useState } from 'react';
import { SearchTabs } from './components/SearchTabs';
import { CEPSearchForm } from './components/CEPSearchForm';
import { StreetSearchForm } from './components/StreetSearchForm';
import { AddressResults } from './components/AddressResults';
import { fetchAddressByCEP, fetchAddressByStreet } from './utils/address';
import type { Address, SearchByStreetParams } from './types/address';

function App() {
  const [activeTab, setActiveTab] = useState<'cep' | 'endereco'>('cep');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCEPSearch = async (cep: string) => {
    setIsLoading(true);
    setError('');
    setAddresses([]);

    try {
      const response = await fetchAddressByCEP(cep);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado. Verifique o número e tente novamente.');
        return;
      }

      setAddresses([data]);
    } catch (err) {
      setError('Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStreetSearch = async (params: SearchByStreetParams) => {
    setIsLoading(true);
    setError('');
    setAddresses([]);

    try {
      const response = await fetchAddressByStreet(params);
      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        setError('Nenhum endereço encontrado com os dados informados.');
        return;
      }

      setAddresses(data);
    } catch (err) {
      setError('Ocorreu um erro ao buscar o endereço. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Busca CEP
          </h1>
          <p className="text-gray-600">
            Encontre endereços por CEP ou logradouro
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <SearchTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          {activeTab === 'cep' ? (
            <CEPSearchForm onSearch={handleCEPSearch} isLoading={isLoading} />
          ) : (
            <StreetSearchForm onSearch={handleStreetSearch} isLoading={isLoading} />
          )}

          <AddressResults addresses={addresses} error={error} />
        </div>
      </div>
    </div>
  );
}

export default App;