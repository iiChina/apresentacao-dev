import React, { useState } from 'react';
import { Activity, MessageSquare, FileText, Search, MoreHorizontal, ExternalLink, ChevronDown, ChevronRight, MapPin, Calendar, DollarSign, Package, X, Plus, AlertTriangle, Link } from 'lucide-react';

const getStatusColor = (status) => {
  switch (status) {
    case 'Ativo':
      return 'text-green-800 border-green-200';
    case 'Pendente':
      return 'text-yellow-800 border-yellow-200';
    case 'Inativo':
      return 'text-red-800 border-red-200';
    default:
      return 'text-gray-800 border-gray-200';
  }
};

const OcorrenciasModal = ({ isOpen, onClose, vendedorId }) => {
  if (!isOpen) return null;

  // Previne scroll do body quando o modal está aberto
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup quando o componente for desmontado
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'Confirmação da denúncia':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Caso perdido':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Denúncia na plataforma':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Mercado Livre':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Shopee':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const [isAddOccurrenceModalOpen, setIsAddOccurrenceModalOpen] = useState(false);

  const [ocorrencias, setOccurrences] = useState([
    { id: 1,data: '18/07/2025',tipo: 'Confirmação da denúncia',plataforma: 'Mercado Livre',produtos: 1,links: '-',observacao: '-',anexos: '-' },
    {id: 2,data: '18/07/2025',tipo: 'Caso perdido',plataforma: 'Mercado Livre',produtos: 1,links: '-',observacao: '-',anexos: 1},
    {id: 3,data: '11/07/2025',tipo: 'Denúncia na plataforma',plataforma: '',produtos: 2,links: 2,observacao: '-',anexos: '-'}
  ]);

   

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999
      }}
    >
      <div 
        className="bg-white rounded-lg w-full max-h-[90vh] overflow-hidden shadow-2xl"
        style={{ maxWidth: '1200px' }}
      >
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Ocorrências de {vendedorId}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Gerenciamento de ocorrências para o vendedor não mapeado
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-6" style={{ maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
          {/* Contador de ocorrências */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {ocorrencias.length} ocorrência(s)
              </span>
            </div>
            <button onClick={() => setIsAddOccurrenceModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Ocorrência
            </button>
          </div>

          {/* Tabela de Ocorrências */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Data</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Tipo</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Plataformas</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Produtos</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Links</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Observação</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Anexos</th>
                    <th className="w-12 py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ocorrencias.map((ocorrencia) => (
                    <tr key={ocorrencia.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-gray-900">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {ocorrencia.data}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getTipoColor(ocorrencia.tipo)}`}>
                          {ocorrencia.tipo}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {ocorrencia.plataforma ? (
                          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getPlatformColor(ocorrencia.plataforma)}`}>
                            {ocorrencia.plataforma}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-900">{ocorrencia.produtos}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {ocorrencia.links !== '-' ? (
                          <div className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-600 cursor-pointer hover:underline">
                              {ocorrencia.links}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {ocorrencia.observacao !== '-' ? (
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-green-600" />
                            <span className="text-gray-900">{ocorrencia.observacao}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {ocorrencia.anexos !== '-' ? (
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-green-600" />
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
                              {ocorrencia.anexos}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer do Modal */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

const AddOccurrenceModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    date: '07/23/2025',
    type: '',
    platform: '',
    link: '',
    product: '',
    observation: ''
  });

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    setFormData({
      date: '07/23/2025',
      type: '',
      platform: '',
      link: '',
      product: '',
      observation: ''
    });
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl overflow-hidden"
        style={{ 
          width: '400px',
          maxHeight: '90vh'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Adicionar Ocorrência</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <p className="text-sm text-gray-600">
            Preencha os detalhes da ocorrência para o vendedor PROCAPET SHOP
          </p>

          {/* Data */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="w-4 h-4 inline mr-1" />
              Data
            </label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              Tipo
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione...</option>
              <option value="Confirmação da denúncia">Confirmação da denúncia</option>
              <option value="Caso perdido">Caso perdido</option>
              <option value="Denúncia na plataforma">Denúncia na plataforma</option>
            </select>
          </div>

          {/* Plataforma */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plataformas
            </label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({...formData, platform: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione uma plataforma</option>
              <option value="Mercado Livre">Mercado Livre</option>
              <option value="Shopee">Shopee</option>
              <option value="Amazon">Amazon</option>
            </select>
          </div>

          {/* Links */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                <Link className="w-4 h-4 inline mr-1" />
                Links
              </label>
              <button className="bg-blue-600 text-white p-1 rounded-md hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={formData.link}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              placeholder="Adicionar link"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Produtos */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                <Package className="w-4 h-4 inline mr-1" />
                Produtos
              </label>
              <button className="bg-blue-600 text-white p-1 rounded-md hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={formData.product}
              onChange={(e) => setFormData({...formData, product: e.target.value})}
              placeholder="Adicionar produto"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Observação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FileText className="w-4 h-4 inline mr-1" />
              Observação
            </label>
            <textarea
              value={formData.observation}
              onChange={(e) => setFormData({...formData, observation: e.target.value})}
              placeholder="Detalhes adicionais da ocorrência"
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

const VendedoresNaoMapeados = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendedor, setSelectedVendedor] = useState('');
  
  const vendedores = [
    {
      id: 'PROCAPOT SHOP',
      cnpj: '19.802.033/0001-83',
      plataformas: [],
      observacao: '',
      ocorrencias: 1,
      sellers: [
        {
          id: 'PROC001',
          nome: 'Procapot Shop Principal',
          plataforma: 'Website Próprio',
          endereco: 'São Paulo - SP',
          dataUltimaVenda: '2024-07-15',
          totalVendas: 'R$ 45.890',
          produtos: 127,
          status: 'Ativo'
        },
        {
          id: 'PROC001',
          nome: 'Procapot Shop Principal',
          plataforma: 'Website Próprio',
          endereco: 'São Paulo - SP',
          dataUltimaVenda: '2024-07-15',
          totalVendas: 'R$ 45.890',
          produtos: 127,
          status: 'Ativo'
        }
      ]
    },
    {
      id: 'VIRALATACHIC',
      cnpj: '-',
      plataformas: ['Mercado Livre'],
      observacao: '',
      ocorrencias: 1,
      sellers: [
        {
          id: 'VIRA001',
          nome: 'Viralata Chic Pet Shop',
          plataforma: 'Mercado Livre',
          endereco: 'Rio de Janeiro - RJ',
          dataUltimaVenda: '2024-07-18',
          totalVendas: 'R$ 12.450',
          produtos: 89,
          status: 'Ativo'
        }
      ]
    },
    {
      id: 'WESTYCOMERCIO',
      cnpj: '-',
      plataformas: ['Mercado Livre'],
      observacao: '',
      ocorrencias: 1,
      sellers: [
        {
          id: 'WEST001',
          nome: 'Westy Comércio de Pets',
          plataforma: 'Mercado Livre',
          endereco: 'Belo Horizonte - MG',
          dataUltimaVenda: '2024-07-20',
          totalVendas: 'R$ 8.230',
          produtos: 156,
          status: 'Ativo'
        }
      ]
    },
    {
      id: 'SS202410111110524',
      cnpj: '-',
      plataformas: ['Mercado Livre'],
      observacao: '',
      ocorrencias: 1,
      sellers: [
        {
          id: 'SS001',
          nome: 'Super Store Pet',
          plataforma: 'Mercado Livre',
          endereco: 'Salvador - BA',
          dataUltimaVenda: '2024-07-17',
          totalVendas: 'R$ 15.670',
          produtos: 203,
          status: 'Pendente'
        }
      ]
    },
    {
      id: 'ZAMUKIPET',
      cnpj: '-',
      plataformas: ['Mercado Livre'],
      observacao: '',
      ocorrencias: 2,
      sellers: [
        {
          id: 'ZAM001',
          nome: 'Zamuki Pet Store',
          plataforma: 'Mercado Livre',
          endereco: 'Fortaleza - CE',
          dataUltimaVenda: '2024-07-19',
          totalVendas: 'R$ 22.340',
          produtos: 175,
          status: 'Ativo'
        },
        {
          id: 'ZAM002',
          nome: 'Zamuki Pet Filial',
          plataforma: 'Mercado Livre',
          endereco: 'Recife - PE',
          dataUltimaVenda: '2024-07-16',
          totalVendas: 'R$ 18.920',
          produtos: 142,
          status: 'Ativo'
        }
      ]
    },
    {
      id: 'recantodobichos',
      cnpj: '-',
      plataformas: ['Mercado Livre'],
      observacao: '',
      ocorrencias: 1,
      sellers: [
        {
          id: 'REC001',
          nome: 'Recanto dos Bichos',
          plataforma: 'Mercado Livre',
          endereco: 'Porto Alegre - RS',
          dataUltimaVenda: '2024-07-21',
          totalVendas: 'R$ 9.450',
          produtos: 98,
          status: 'Ativo'
        }
      ]
    },
    {
      id: 'PromoshPppy',
      cnpj: '-',
      plataformas: ['Shopee', 'Mercado Livre'],
      observacao: '',
      ocorrencias: 1,
      sellers: [
        {
          id: 'PROM001',
          nome: 'Promosh Puppy ML',
          plataforma: 'Mercado Livre',
          endereco: 'Curitiba - PR',
          dataUltimaVenda: '2024-07-20',
          totalVendas: 'R$ 31.280',
          produtos: 267,
          status: 'Ativo',
          link: 'https://www.mercadolivre.com.br',
          cnpj: '51.445.409/0001-52'
        },
        {
          id: 'PROM002',
          nome: 'Promosh Puppy Shopee',
          plataforma: 'Shopee',
          endereco: 'Curitiba - PR',
          dataUltimaVenda: '2024-07-19',
          totalVendas: 'R$ 14.560',
          produtos: 189,
          status: 'Ativo',
          link: 'https://shopee.com.br',
          cnpj: '62.236.163/0001-25'
        }
      ]
    },
    {
      id: 'mundopet',
      cnpj: '-',
      plataformas: ['Mercado Livre'],
      observacao: '',
      ocorrencias: 1,
      sellers: [
        {
          id: 'MUN001',
          nome: 'Mundo Pet Brasil',
          plataforma: 'Mercado Livre',
          endereco: 'Brasília - DF',
          dataUltimaVenda: '2024-07-18',
          totalVendas: 'R$ 27.890',
          produtos: 234,
          status: 'Ativo'
        }
      ]
    }
  ];

  const filteredVendedores = vendedores.filter(vendedor =>
    vendedor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendedor.cnpj.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRow = (index) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
  };

  const getPlatformBadgeColor = (platform) => {
    switch (platform) {
      case 'Mercado Livre':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Shopee':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const openModal = (vendedorId) => {
    setSelectedVendedor(vendedorId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVendedor('');
  };

  return (
    <div className="bg-white p-6 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Lista de Vendedores Não Mapeados
        </h1>
        <p className="text-gray-600 text-sm">
          Vendedores que ainda não foram mapeados no sistema principal.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Pesquisar por ID do vendedor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Buscar
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">ID Vendedor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">CNPJ</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Plataformas</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Observação</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Ocorrências</th>
                <th className="w-12 py-3 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVendedores.map((vendedor, index) => (
                <React.Fragment key={index}>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleRow(index)}
                          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                          {expandedRows.has(index) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleRow(index)}
                          className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {vendedor.id}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {vendedor.cnpj}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {vendedor.plataformas.map((plataforma, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 rounded-md text-xs font-medium border ${getPlatformBadgeColor(plataforma)}`}
                          >
                            {plataforma}
                          </span>
                        ))}
                        {vendedor.plataformas.length === 0 && (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {vendedor.observacao || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openModal(vendedor.id)}>
                          <ExternalLink className="w-4 h-4 text-blue-600 hover:text-blue-700 transition-colors cursor-pointer" />
                        </button>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                          {vendedor.ocorrencias}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>

                  {/* Linha Expandida */}
                  {expandedRows.has(index) && (
                    <tr>
                      <td colSpan="6" className="px-0 py-0">
                        <div className="bg-gray-50 border-t border-gray-200">
                          <div className="p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Detalhes dos Sellers - {vendedor.id}
                            </h4>
                            
                            <div className="grid gap-4">
                              {vendedor.sellers.map((seller, sellerIndex) => (
                                <div key={sellerIndex} className="bg-white rounded-lg border border-gray-200 p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <h5 className="font-semibold text-gray-900">
                                          {seller.nome}
                                        </h5>
                                    </div>
                                    <span className="text-sm text-gray-500">ID: {seller.id}</span>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-2">
                                        <a href={seller.link} className="text-blue-600 flex items-center gap-1">
                                          <ExternalLink className="w-4 h-4 text-blue-600" />
                                        </a>
                                      <div>
                                        <p className="text-xs text-gray-500">Plataforma</p>
                                        <p className="text-sm font-medium text-gray-900">{seller.plataforma}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                      <FileText className="w-4 h-4 text-green-600" />
                                      <div>
                                        <p className="text-xs text-gray-500">CNPJ</p>
                                        <p className="text-sm font-medium text-gray-900">{seller.cnpj}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                      <MessageSquare className="w-4 h-4 text-purple-600" />
                                      <div>
                                        <p className="text-xs text-gray-500">Observação</p>
                                        <p className="text-sm font-medium text-gray-900">
                                          {new Date(seller.dataUltimaVenda).toLocaleDateString('pt-BR')}
                                        </p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                      <Activity className="w-4 h-4 text-orange-600" />
                                      <div>
                                        <p className="text-xs text-gray-500">Status</p>
                                        <p className={`text-sm font-medium ${getStatusColor(seller.status)}`}>{seller.status}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results Info */}
      <div className="mt-4 text-sm text-gray-600">
        Mostrando {filteredVendedores.length} de {vendedores.length} vendedores
      </div>

      {/* Modal de Ocorrências */}
      <OcorrenciasModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        vendedorId={selectedVendedor}
      />
    </div>
  );
};

export default VendedoresNaoMapeados;