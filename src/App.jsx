import React, { useState } from "react";
import {
  Activity,
  MessageSquare,
  FileText,
  Search,
  MoreHorizontal,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  X,
  Plus,
  AlertTriangle,
  Link,
} from "lucide-react";

const getStatusColor = (status) => {
  switch (status) {
    case "Ativo":
      return "text-green-800 border-green-200";
    case "Pendente":
      return "text-yellow-800 border-yellow-200";
    case "Inativo":
      return "text-red-800 border-red-200";
    default:
      return "text-gray-800 border-gray-200";
  }
};

const OcorrenciasModal = ({ isOpen, onClose, vendedorId }) => {
  if (!isOpen) return null;

  // Previne scroll do body quando o modal está aberto
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup quando o componente for desmontado
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case "Confirmação da denúncia":
        return "bg-green-100 text-green-800 border-green-200";
      case "Caso perdido":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Denúncia na plataforma":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const [isAddOccurrenceModalOpen, setIsAddOccurrenceModalOpen] =
    useState(false);

  const [ocorrencias, setOccurrences] = useState([
    {
      id: 1,
      data: "18/07/2025",
      status: "Confirmação da denúncia",
      observacao: "-",
      produtos: [],
    },
    {
      id: 2,
      data: "18/07/2025",
      status: "Caso perdido",
      observacao: "-",
      produtos: [],
    },
    {
      id: 3,
      data: "11/07/2025",
      status: "Denúncia na plataforma",
      observacao: "-",
      produtos: [
        // {
        //   descricao: "",
        //   valor: "",
        //   link: "",
        // },
      ],
    },
  ]);

  const handleAddOccurrence = (newOccurrence) => {
    const occurrence = {
      id: ocorrencias.length + 1,
      tipo: newOccurrence.tipo,
      data: newOccurrence.data,
      observacao: newOccurrence.observacao,
    };

    setOccurrences([occurrence, ...ocorrencias]);
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        padding: "80px 200px",
        position: "fixed",
        top: -20,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <div className="bg-white rounded-lg w-full overflow-hidden shadow-2xl">
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
        <div
          className="p-6"
          style={{ maxHeight: "calc(90vh - 140px)", overflowY: "auto" }}
        >
          {/* Contador de ocorrências */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 p-6 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {ocorrencias.length} ocorrência(s)
              </span>
            </div>
            <button
              onClick={() => setIsAddOccurrenceModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
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
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Data
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Produtos
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Observação
                    </th>
                    <th className="w-12 py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ocorrencias.map((ocorrencia) => (
                    <tr
                      key={ocorrencia.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-gray-900">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {ocorrencia.data}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium border ${getTipoColor(
                            ocorrencia.status
                          )}`}
                        >
                          {ocorrencia.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-900">
                            {ocorrencia.produtos.length}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {ocorrencia.observacao !== "-" ? (
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-green-600" />
                            <span className="text-gray-900">
                              {ocorrencia.observacao}
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

      {/* Modal de Adicionar Ocorrência */}
      <ModalCadastroOcorrencia
        isOpen={isAddOccurrenceModalOpen}
        onClose={() => setIsAddOccurrenceModalOpen(false)}
        onSave={handleAddOccurrence}
      />
    </div>
  );
};

const ModalCadastroOcorrencia = ({ isOpen = true, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    data: "",
    tipo: "",
    observacao: "",
  });

  const [produtos, setProdutos] = useState([]);
  const [productCount, setProductCount] = useState(0);

  // Define data atual como padrão
  // useEffect(() => {
  //   const today = new Date().toISOString().split("T")[0];
  //   setFormData((prev) => ({ ...prev, data: today }));
  // }, []);

  const tiposOcorrencia = [
    { value: "propriedade-intelectual", label: "Propriedade Intelectual" },
    { value: "produto-parasitário", label: "Produto Parasitário" },
    { value: "outros", label: "Outros" },
  ];

  const styles = {
    overlay: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "20px",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    },
    modal: {
      background: "white",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "600px",
      // maxHeight: "95vh",
      overflow: "hidden",
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    modalHeader: {
      padding: "24px",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#111827",
      margin: 0,
    },
    modalSubtitle: {
      fontSize: "14px",
      color: "#6b7280",
      marginTop: "4px",
      margin: "4px 0 0 0",
    },
    closeBtn: {
      background: "none",
      border: "none",
      fontSize: "24px",
      color: "#6b7280",
      cursor: "pointer",
      padding: "4px",
      borderRadius: "4px",
      transition: "background-color 0.2s",
    },
    modalBody: {
      padding: "24px",
      maxHeight: "calc(90vh - 140px)",
      overflowY: "auto",
    },
    formGroup: {
      marginBottom: "20px",
    },
    formLabel: {
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "6px",
    },
    formInput: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "14px",
      transition: "border-color 0.2s, box-shadow 0.2s",
      boxSizing: "border-box",
    },
    formSelect: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "14px",
      backgroundColor: "white",
      cursor: "pointer",
      boxSizing: "border-box",
    },
    formTextarea: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "14px",
      minHeight: "80px",
      resize: "vertical",
      fontFamily: "inherit",
      boxSizing: "border-box",
    },
    productsSection: {
      borderTop: "1px solid #e5e7eb",
      paddingTop: "20px",
      marginTop: "20px",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#111827",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    addProductBtn: {
      background: "#3b82f6",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      transition: "background-color 0.2s",
    },
    productItem: {
      background: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "12px",
      position: "relative",
    },
    productHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
    },
    productNumber: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#6b7280",
    },
    removeProductBtn: {
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      cursor: "pointer",
      position: "absolute",
      top: "12px",
      right: "12px",
    },
    productForm: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "12px",
    },
    productFormRow: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "12px",
    },
    emptyProducts: {
      textAlign: "center",
      color: "#6b7280",
      fontSize: "14px",
      padding: "20px",
      border: "2px dashed #d1d5db",
      borderRadius: "8px",
    },
    modalFooter: {
      padding: "20px 24px",
      borderTop: "1px solid #e5e7eb",
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
    },
    btnSecondary: {
      background: "white",
      color: "#374151",
      border: "1px solid #d1d5db",
      padding: "10px 20px",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    btnPrimary: {
      background: "#3b82f6",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    // Media queries simuladas com JavaScript
    mobileProductFormRow: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "12px",
    },
    mobileModalFooter: {
      padding: "20px 24px",
      borderTop: "1px solid #e5e7eb",
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      flexDirection: "column",
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatPrice = (value) => {
    let numericValue = value.replace(/\D/g, "");
    numericValue = numericValue.replace(/(\d)(\d{2})$/, "$1,$2");
    numericValue = numericValue.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return numericValue ? "R$ " + numericValue : "";
  };

  const addProduct = () => {
    const newProductCount = productCount + 1;
    setProductCount(newProductCount);

    const newProduct = {
      id: `product_${newProductCount}`,
      number: newProductCount,
      descricao: "",
      preco: "",
      link: "",
    };

    setProdutos((prev) => [...prev, newProduct]);
  };

  const removeProduct = (productId) => {
    setProdutos((prev) => prev.filter((product) => product.id !== productId));
  };

  const updateProduct = (productId, field, value) => {
    setProdutos((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              [field]: field === "preco" ? formatPrice(value) : value,
            }
          : product
      )
    );
  };

  const validateForm = () => {
    if (!formData.data || !formData.tipo) {
      alert("Por favor, preencha os campos obrigatórios: Data e Tipo.");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const ocorrenciaData = {
      ...formData,
      produtos: produtos.filter((produto) => produto.descricao.trim() !== ""),
    };

    if (onSave) {
      onSave(ocorrenciaData);
    } else {
      alert(
        `Ocorrência salva com sucesso!\n\nResumo:\n- Data: ${ocorrenciaData.data}\n- Tipo: ${ocorrenciaData.tipo}\n- Produtos: ${ocorrenciaData.produtos.length}`
      );
    }

    handleClose();
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#3b82f6";
    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = "#d1d5db";
    e.target.style.boxShadow = "none";
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.modalHeader}>
          <div>
            <h2 style={styles.modalTitle}>Nova Ocorrência</h2>
            <p style={styles.modalSubtitle}>
              Preencha os dados da ocorrência e adicione os produtos
              relacionados
            </p>
          </div>
          <button
            style={styles.closeBtn}
            onClick={handleClose}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={styles.modalBody}>
          {/* Dados da Ocorrência */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Data</label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleInputChange}
              required
              style={styles.formInput}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Tipo</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              required
              style={styles.formSelect}
            >
              <option value="">Selecione o tipo</option>
              {tiposOcorrencia.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Observação</label>
            <textarea
              name="observacao"
              value={formData.observacao}
              onChange={handleInputChange}
              placeholder="Descreva detalhes relevantes sobre a ocorrência..."
              style={styles.formTextarea}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          {/* Seção de Produtos */}
          <div style={styles.productsSection}>
            <div style={styles.sectionTitle}>
              <span>Produtos Relacionados</span>
              <button
                type="button"
                onClick={addProduct}
                style={styles.addProductBtn}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2563eb")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#3b82f6")
                }
              >
                <span>+</span> Adicionar Produto
              </button>
            </div>

            <div>
              {produtos.length === 0 ? (
                <div style={styles.emptyProducts}>
                  Nenhum produto adicionado. Clique em "Adicionar Produto" para
                  começar.
                </div>
              ) : (
                produtos.map((produto) => (
                  <div key={produto.id} style={styles.productItem}>
                    <div style={styles.productHeader}>
                      <span style={styles.productNumber}>
                        Produto {produto.number}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeProduct(produto.id)}
                        style={styles.removeProductBtn}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#dc2626")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#ef4444")
                        }
                      >
                        Remover
                      </button>
                    </div>

                    <div style={styles.productForm}>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Descrição</label>
                        <input
                          type="text"
                          value={produto.descricao}
                          onChange={(e) =>
                            updateProduct(
                              produto.id,
                              "descricao",
                              e.target.value
                            )
                          }
                          placeholder="Descrição do produto"
                          required
                          style={styles.formInput}
                        />
                      </div>

                      <div style={styles.productFormRow}>
                        <div style={styles.formGroup}>
                          <label style={styles.formLabel}>Preço</label>
                          <input
                            type="text"
                            value={produto.preco}
                            onChange={(e) =>
                              updateProduct(produto.id, "preco", e.target.value)
                            }
                            placeholder="R$ 0,00"
                            style={styles.formInput}
                          />
                        </div>

                        <div style={styles.formGroup}>
                          <label style={styles.formLabel}>Link</label>
                          <input
                            type="url"
                            value={produto.link}
                            onChange={(e) =>
                              updateProduct(produto.id, "link", e.target.value)
                            }
                            placeholder="https://..."
                            style={styles.formInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.modalFooter}>
          <button
            type="button"
            onClick={handleClose}
            style={styles.btnSecondary}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f9fafb")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={styles.btnPrimary}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
          >
            Salvar Ocorrência
          </button>
        </div>
      </div>
    </div>
  );
};

const VendedoresNaoMapeados = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendedor, setSelectedVendedor] = useState("");

  const vendedores = [
    {
      id: "PROCAPOT SHOP",
      cnpj: "19.802.033/0001-83",
      plataformas: [],
      observacao: "",
      ocorrencias: 3,
      sellers: [
        {
          id: "PROC001",
          nome: "Procapot Shop Principal",
          plataforma: "Website Próprio",
          endereco: "São Paulo - SP",
          dataUltimaVenda: "2024-07-15",
          totalVendas: "R$ 45.890",
          produtos: 127,
          status: "Ativo",
        },
        {
          id: "PROC001",
          nome: "Procapot Shop Principal",
          plataforma: "Website Próprio",
          endereco: "São Paulo - SP",
          dataUltimaVenda: "2024-07-15",
          totalVendas: "R$ 45.890",
          produtos: 127,
          status: "Ativo",
        },
      ],
    },
    {
      id: "VIRALATACHIC",
      cnpj: "-",
      plataformas: ["Mercado Livre"],
      observacao: "",
      ocorrencias: 3,
      sellers: [
        {
          id: "VIRA001",
          nome: "Viralata Chic Pet Shop",
          plataforma: "Mercado Livre",
          endereco: "Rio de Janeiro - RJ",
          dataUltimaVenda: "2024-07-18",
          totalVendas: "R$ 12.450",
          produtos: 89,
          status: "Ativo",
        },
      ],
    },
    {
      id: "WESTYCOMERCIO",
      cnpj: "-",
      plataformas: ["Mercado Livre"],
      observacao: "",
      ocorrencias: 3,
      sellers: [
        {
          id: "WEST001",
          nome: "Westy Comércio de Pets",
          plataforma: "Mercado Livre",
          endereco: "Belo Horizonte - MG",
          dataUltimaVenda: "2024-07-20",
          totalVendas: "R$ 8.230",
          produtos: 156,
          status: "Ativo",
        },
      ],
    },
    {
      id: "SS202410111110524",
      cnpj: "-",
      plataformas: ["Mercado Livre"],
      observacao: "",
      ocorrencias: 3,
      sellers: [
        {
          id: "SS001",
          nome: "Super Store Pet",
          plataforma: "Mercado Livre",
          endereco: "Salvador - BA",
          dataUltimaVenda: "2024-07-17",
          totalVendas: "R$ 15.670",
          produtos: 203,
          status: "Pendente",
        },
      ],
    },
    {
      id: "ZAMUKIPET",
      cnpj: "-",
      plataformas: ["Mercado Livre"],
      observacao: "",
      ocorrencias: 3,
      sellers: [
        {
          id: "ZAM001",
          nome: "Zamuki Pet Store",
          plataforma: "Mercado Livre",
          endereco: "Fortaleza - CE",
          dataUltimaVenda: "2024-07-19",
          totalVendas: "R$ 22.340",
          produtos: 175,
          status: "Ativo",
        },
        {
          id: "ZAM002",
          nome: "Zamuki Pet Filial",
          plataforma: "Mercado Livre",
          endereco: "Recife - PE",
          dataUltimaVenda: "2024-07-16",
          totalVendas: "R$ 18.920",
          produtos: 142,
          status: "Ativo",
        },
      ],
    },
    {
      id: "recantodobichos",
      cnpj: "-",
      plataformas: ["Mercado Livre"],
      observacao: "",
      ocorrencias: 3,
      sellers: [
        {
          id: "REC001",
          nome: "Recanto dos Bichos",
          plataforma: "Mercado Livre",
          endereco: "Porto Alegre - RS",
          dataUltimaVenda: "2024-07-21",
          totalVendas: "R$ 9.450",
          produtos: 98,
          status: "Ativo",
        },
      ],
    },
    {
      id: "PromoshPppy",
      cnpj: "-",
      plataformas: ["Shopee", "Mercado Livre"],
      observacao: "",
      ocorrencias: 3,
      sellers: [
        {
          id: "PROM001",
          nome: "Promosh Puppy ML",
          plataforma: "Mercado Livre",
          endereco: "Curitiba - PR",
          dataUltimaVenda: "2024-07-20",
          totalVendas: "R$ 31.280",
          produtos: 267,
          status: "Ativo",
          link: "https://www.mercadolivre.com.br",
          cnpj: "51.445.409/0001-52",
        },
        {
          id: "PROM002",
          nome: "Promosh Puppy Shopee",
          plataforma: "Shopee",
          endereco: "Curitiba - PR",
          dataUltimaVenda: "2024-07-19",
          totalVendas: "R$ 14.560",
          produtos: 189,
          status: "Ativo",
          link: "https://shopee.com.br",
          cnpj: "62.236.163/0001-25",
        },
      ],
    },
    {
      id: "mundopet",
      cnpj: "-",
      plataformas: ["Mercado Livre"],
      observacao: "",
      ocorrencias: 3,
      sellers: [
        {
          id: "MUN001",
          nome: "Mundo Pet Brasil",
          plataforma: "Mercado Livre",
          endereco: "Brasília - DF",
          dataUltimaVenda: "2024-07-18",
          totalVendas: "R$ 27.890",
          produtos: 234,
          status: "Ativo",
        },
      ],
    },
  ];

  const filteredVendedores = vendedores.filter(
    (vendedor) =>
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
      case "Mercado Livre":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Shopee":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const openModal = (vendedorId) => {
    setSelectedVendedor(vendedorId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "unset";
    setIsModalOpen(false);
    setSelectedVendedor("");
  };

  return (
    <div className="bg-white p-6 w-full">
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
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  ID Vendedor
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  CNPJ
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Plataformas
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Observação
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Ocorrências
                </th>
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
                    <td className="py-3 px-4 text-gray-600">{vendedor.cnpj}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {vendedor.plataformas.map((plataforma, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 rounded-md text-xs font-medium border ${getPlatformBadgeColor(
                              plataforma
                            )}`}
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
                      {vendedor.observacao || "-"}
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

                            <div className="grid gap-2">
                              {vendedor.sellers.map((seller, sellerIndex) => (
                                <div
                                  key={sellerIndex}
                                  className="bg-white rounded-lg border border-gray-200 p-4"
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <h5 className="font-semibold text-gray-900">
                                        {seller.nome}
                                      </h5>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                      ID: {seller.id}
                                    </span>
                                  </div>

                                  <div
                                    className="grid gap-4"
                                    style={{
                                      gridTemplateColumns: "repeat(5, 1fr)",
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <a
                                        href={seller.link}
                                        className="text-blue-600 flex items-center gap-1"
                                      >
                                        <ExternalLink className="w-4 h-4 text-blue-600" />
                                      </a>
                                      <div>
                                        <p className="text-xs text-gray-500">
                                          Plataforma
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                          {seller.plataforma}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <FileText className="w-4 h-4 text-green-600" />
                                      <div>
                                        <p className="text-xs text-gray-500">
                                          CNPJ
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                          {seller.cnpj}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <MessageSquare className="w-4 h-4 text-purple-600" />
                                      <div>
                                        <p className="text-xs text-gray-500">
                                          Observação
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                          {new Date(
                                            seller.dataUltimaVenda
                                          ).toLocaleDateString("pt-BR")}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <Activity className="w-4 h-4 text-orange-600" />
                                      <div>
                                        <p className="text-xs text-gray-500">
                                          Status
                                        </p>
                                        <p
                                          className={`text-sm font-medium ${getStatusColor(
                                            seller.status
                                          )}`}
                                        >
                                          {seller.status}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <ExternalLink className="w-4 h-4 text-blue-600" />
                                      <div className="grid">
                                        <p className="text-xs text-gray-500">
                                          Ocorrências
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                          3
                                        </p>
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
