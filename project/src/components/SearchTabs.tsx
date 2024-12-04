import React from 'react';
import { MapPin, Search } from 'lucide-react';

interface SearchTabsProps {
  activeTab: 'cep' | 'endereco';
  onTabChange: (tab: 'cep' | 'endereco') => void;
}

export function SearchTabs({ activeTab, onTabChange }: SearchTabsProps) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onTabChange('cep')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          activeTab === 'cep'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <MapPin className="w-4 h-4" />
        Buscar por CEP
      </button>
      <button
        onClick={() => onTabChange('endereco')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          activeTab === 'endereco'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Search className="w-4 h-4" />
        Buscar por Endereço
      </button>
    </div>
  );
}