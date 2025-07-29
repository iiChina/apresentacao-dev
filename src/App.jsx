import React, { useRef, useState } from "react";
import {
  Activity,
  MessageSquare,
  FileText,
  Search,
  MoreHorizontal,
  ChevronUp,
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
      data: "25/07/2025",
      status: "Confirmação da denúncia",
      observacao: "-",
      plataforma: "Shopee",
      produtos: [
        {
          descricao: "Fluatac Duo 1L",
          valor: "R$ 189,90",
          link: "https://exemplo.com/fluatac-duo",
          tipo: "Produto Parasitario",
        },
        {
          descricao: "Maxicam Plus 2mg com 10 comprimidos",
          valor: "R$ 45,00",
          link: "https://exemplo.com/maxicam-plus",
          tipo: "Outros",
        },
      ],
    },
    {
      id: 2,
      data: "18/07/2025",
      status: "Caso perdido",
      plataforma: "Mercado Livre",
      observacao: "-",
      produtos: [
        {
          descricao: "Marca registrada Ourofino Saúde Animal",
          valor: "R$ 0,00",
          link: "https://exemplo.com/marca-registrada",
          tipo: "Propriedade Intelectual",
        },
      ],
    },
    {
      id: 3,
      data: "11/07/2025",
      status: "Denúncia na plataforma",
      plataforma: "Mercado Livre",
      observacao: "-",
      produtos: [
        {
          descricao: "Ourovac Poli BT",
          valor: "R$ 259,00",
          link: "https://exemplo.com/ourovac-poli-bt",
          tipo: "Produto Parasitario",
        },
        {
          descricao: "Protegene Oral 50ml",
          valor: "R$ 98,00",
          link: "https://exemplo.com/protegen-oral",
          tipo: "Outros",
        },
        {
          descricao: "Nome comercial 'Ourovet'",
          valor: "R$ 0,00",
          link: "https://exemplo.com/ourovet-marca",
          tipo: "Propriedade Intelectual",
        },
      ],
    },
  ]);

  const handleAddOccurrence = (newOccurrence) => {
    const occurrence = {
      id: ocorrencias.length + 1,
      status: newOccurrence.status,
      data: newOccurrence.data,
      plataforma: newOccurrence.plataforma,
      observacao: newOccurrence.observacao,
      produtos: newOccurrence.produtos || [],
    };

    setOccurrences([occurrence, ...ocorrencias]);
    setIsAddOccurrenceModalOpen(false);
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

  return (
    <div
      style={{
        padding: "80px 200px",
        position: "fixed",
        top: -40,
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
          style={{ maxHeight: "calc(80vh - 140px)", overflowY: "auto" }}
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
                      Plataforma
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Observação
                    </th>
                    <th className="w-12 py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ocorrencias.map((ocorrencia) => (
                    <React.Fragment key={ocorrencia.id}>
                      {/* Linha principal da ocorrência */}
                      <tr className="hover:bg-gray-50 transition-colors">
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
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-medium border ${getPlatformBadgeColor(
                                ocorrencia.plataforma
                              )}`}
                            >
                              {ocorrencia.plataforma}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-green-600" />
                            <span className="text-gray-900">
                              {ocorrencia.observacao}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>

                      {/* Linha expandida dos produtos */}

                      {ocorrencia.produtos.length > 0 && (
                        <tr>
                          <td colSpan="5" className="px-4 py-0">
                            <div className="bg-gray-50 rounded-lg p-4 mx-2 mb-2">
                              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                                <Package className="w-4 h-4 text-purple-600" />
                                Produtos da Ocorrência (
                                {ocorrencia.produtos.length})
                              </h4>
                              <div>
                                {ocorrencia.produtos.map((produto, index) => (
                                  <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
                                    style={{ marginBottom: "10px" }}
                                  >
                                    <div
                                      className="flex items-start justify-between"
                                      style={{ padding: "20px" }}
                                    >
                                      <div className="flex-1">
                                        <h5 className="font-medium text-gray-900 mb-1">
                                          {produto.descricao}
                                        </h5>
                                        <p className="text-lg font-semibold text-green-600 mb-1">
                                          {produto.valor}
                                        </p>
                                        <p className="font-medium text-gray-900 mb-1">
                                          {produto.tipo}
                                        </p>
                                        {produto.link && (
                                          <a
                                            href={produto.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm transition-colors"
                                          >
                                            <ExternalLink className="w-3 h-3" />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
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
    status: "",
    plataforma: "",
    observacao: "",
  });

  const [produtos, setProdutos] = useState([
    {
      id: "product_1",
      descricao: "",
      valor: "",
      diferencaPreco: "",
      diferencaPercentual: "",
      tipo: "",
      link: "",
    },
  ]);
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });
  const cellRefs = useRef({});

  const tiposOcorrencia = [
    { value: "Confirmação da denúncia", label: "Confirmação da denúncia" },
    { value: "Caso perdido", label: "Caso perdido" },
    { value: "Denúncia na plataforma", label: "Denúncia na plataforma" },
  ];

  const plataformas = [
    { value: "Mercado Livre", label: "Mercado Livre" },
    { value: "Shopee", label: "Shopee" },
    { value: "Magazine Luiza", label: "Magazine Luiza" },
    { value: "Amazon", label: "Amazon" },
  ];

  const tiposProduto = [
    { value: "Propriedade Intelectual", label: "Propriedade Intelectual" },
    { value: "Produto Parasitario", label: "Produto Parasitario" },
    { value: "Outros", label: "Outros" },
  ];

  const columns = [
    { key: "descricao", label: "Descrição", width: "35%" },
    { key: "valor", label: "Preço", width: "10%" },
    { key: "diferencaPreco", label: "Diferença de Preço", width: "10%" },
    {
      key: "diferencaPercentual",
      label: "Diferença do Percentual",
      width: "10%",
    },
    { key: "tipo", label: "Tipo", width: "15%" },
    { key: "link", label: "Link", width: "20%" },
  ];

  const processSheetsData = (pastedData) => {
    console.log(pastedData);

    const cleanData = pastedData.trim();
    const columns = cleanData.split("\t");
    const teste = {
      descricao: columns[2],
      valor: columns[6],
      diferencaPreco: columns[7].replace("-", ""),
      diferencaPercentual: "R$ " + columns[8].replace("-", "").replace("%", ""),
      link: columns[12],
    };

    return teste;
  };

  // Função para adicionar produto processado do Sheets
  const addProductFromSheets = (processedData) => {
    console.log(processedData);

    const newId = `product_${produtos.length + 1}`;
    const newProduct = {
      id: newId,
      descricao: processedData.descricao || "",
      valor: processedData.valor || "",
      diferencaPreco: processedData.diferencaPreco || "",
      diferencaPercentual: processedData.diferencaPercentual || "",
      tipo: "",
      link: processedData.link || "",
    };

    setProdutos((prev) => [...prev, newProduct]);

    return newProduct;
  };

  // Handler para paste na tabela
  const handleTablePaste = (e) => {
    e.preventDefault();

    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("text");

    if (!pastedData) return;

    const processedColumns = processSheetsData(pastedData);

    if (processedColumns && Object.keys(processedColumns).length > 0) {
      addProductFromSheets(processedColumns);
    }
  };

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
      maxWidth: "1300px",
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
    pasteInstructions: {
      background: "#f0f9ff",
      border: "1px solid #bae6fd",
      borderRadius: "6px",
      padding: "12px",
      marginBottom: "16px",
      fontSize: "13px",
      color: "#0369a1",
    },
    tableContainer: {
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      overflow: "hidden",
      backgroundColor: "white",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "14px",
    },
    tableHeader: {
      backgroundColor: "#f9fafb",
    },
    th: {
      padding: "12px 8px",
      textAlign: "left",
      fontWeight: "600",
      color: "#374151",
      borderBottom: "1px solid #d1d5db",
      borderRight: "1px solid #e5e7eb",
    },
    td: {
      padding: "0",
      borderBottom: "1px solid #e5e7eb",
      borderRight: "1px solid #e5e7eb",
      position: "relative",
    },
    cellInput: {
      width: "100%",
      height: "40px",
      padding: "8px",
      border: "none",
      outline: "none",
      fontSize: "14px",
      backgroundColor: "transparent",
      boxSizing: "border-box",
    },
    cellSelect: {
      width: "100%",
      height: "40px",
      padding: "8px",
      border: "none",
      outline: "none",
      fontSize: "14px",
      backgroundColor: "transparent",
      cursor: "pointer",
      boxSizing: "border-box",
    },
    activeCell: {
      backgroundColor: "#dbeafe",
      border: "2px solid #3b82f6",
    },
    addRowBtn: {
      width: "100%",
      padding: "12px",
      border: "1px solid #d1d5db",
      borderTop: "none",
      background: "#f9fafb",
      color: "#6b7280",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
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
  };

  const formatPrice = (value) => {
    console.log(value);
    const isNegative = value.includes("-");

    // Remove todos os caracteres não numéricos
    let numericValue = value.replace(/\D/g, "");

    // Adiciona vírgula para separar centavos
    numericValue = numericValue.replace(/(\d)(\d{2})$/, "$1,$2");

    // Adiciona pontos como separadores de milhares
    numericValue = numericValue.replace(/(?=(\d{3})+(\D))\B/g, ".");

    // Adiciona prefixo "R$" e sinal negativo se necessário
    return (isNegative ? "R$ -" : "R$ ") + numericValue;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateProduct = (rowIndex, field, value) => {
    setProdutos((prev) =>
      prev.map((product, index) =>
        index === rowIndex
          ? {
              ...product,
              [field]:
                field === "valor" ||
                field === "diferencaPercentual" ||
                field === "diferencaPreco"
                  ? formatPrice(value)
                  : value,
            }
          : product
      )
    );
  };

  const addNewRow = () => {
    const newId = `product_${produtos.length + 1}`;
    setProdutos((prev) => [
      ...prev,
      {
        id: newId,
        descricao: "",
        valor: "",
        diferencaPreco: "",
        diferencaPercentual: "",
        tipo: "",
        link: "",
      },
    ]);
  };

  const handleKeyDown = (e, rowIndex, colIndex) => {
    if (e.shiftKey && e.key === "Tab") {
      e.preventDefault();
      let previousColumn = colIndex - 1;
      let previousRow = rowIndex;

      if (previousColumn < 0) {
        previousColumn = columns.length - 1;
        previousRow = previousRow - 1;
        if (previousRow < 0) {
          previousColumn = 0;
          previousRow = 0;
        }
      }

      setActiveCell({ row: previousRow, col: previousColumn });

      setTimeout(() => {
        const previousCellKey = `${previousRow}-${previousColumn}`;
        if (cellRefs.current[previousCellKey]) {
          cellRefs.current[previousCellKey].focus();
        }
      }, 0);
    } else if (e.key === "Tab") {
      e.preventDefault();
      let nextCol = colIndex + 1;
      let nextRow = rowIndex;

      if (nextCol >= columns.length) {
        nextCol = 0;
        nextRow = rowIndex + 1;
        if (nextRow >= produtos.length) {
          addNewRow();
        }
      }

      setActiveCell({ row: nextRow, col: nextCol });

      setTimeout(() => {
        const nextCellKey = `${nextRow}-${nextCol}`;
        if (cellRefs.current[nextCellKey]) {
          cellRefs.current[nextCellKey].focus();
        }
      }, 0);
    } else if (e.key === "Enter") {
      e.preventDefault();
      let nextRow = rowIndex + 1;
      if (nextRow >= produtos.length) {
        addNewRow();
      }
      setActiveCell({ row: nextRow, col: 0 });

      setTimeout(() => {
        const nextCellKey = `${nextRow}-0`;
        if (cellRefs.current[nextCellKey]) {
          cellRefs.current[nextCellKey].focus();
        }
      }, 0);
    } else if (e.key === "ArrowUp" && rowIndex > 0) {
      e.preventDefault();
      const nextRow = rowIndex - 1;
      setActiveCell({ row: nextRow, col: colIndex });

      setTimeout(() => {
        const nextCellKey = `${nextRow}-${colIndex}`;
        if (cellRefs.current[nextCellKey]) {
          cellRefs.current[nextCellKey].focus();
        }
      }, 0);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      let nextRow = rowIndex + 1;
      if (nextRow >= produtos.length) {
        addNewRow();
      }
      setActiveCell({ row: nextRow, col: colIndex });

      setTimeout(() => {
        const nextCellKey = `${nextRow}-${colIndex}`;
        if (cellRefs.current[nextCellKey]) {
          cellRefs.current[nextCellKey].focus();
        }
      }, 0);
    }
  };

  const renderCell = (produto, rowIndex, column, colIndex) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    const isActive = activeCell.row === rowIndex && activeCell.col === colIndex;

    const cellStyle = {
      ...styles.td,
      ...(isActive ? styles.activeCell : {}),
    };

    if (column.key === "tipo") {
      return (
        <td key={colIndex} style={cellStyle}>
          <select
            ref={(el) => (cellRefs.current[cellKey] = el)}
            value={produto[column.key]}
            onChange={(e) =>
              updateProduct(rowIndex, column.key, e.target.value)
            }
            onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
            onFocus={() => setActiveCell({ row: rowIndex, col: colIndex })}
            style={styles.cellSelect}
          >
            <option value="">Selecione</option>
            {tiposProduto.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
        </td>
      );
    }

    return (
      <td key={colIndex} style={cellStyle}>
        <input
          ref={(el) => (cellRefs.current[cellKey] = el)}
          type={column.key === "link" ? "url" : "text"}
          value={produto[column.key]}
          onChange={(e) => updateProduct(rowIndex, column.key, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
          onFocus={() => setActiveCell({ row: rowIndex, col: colIndex })}
          placeholder={
            column.key === "valor" ||
            column.key === "diferencaPreco" ||
            column.key === "diferencaPercentual"
              ? "R$ 0,00"
              : `${column.label}...`
          }
          style={styles.cellInput}
        />
      </td>
    );
  };

  const validateForm = () => {
    if (!formData.data || !formData.status) {
      alert("Por favor, preencha os campos obrigatórios: Data e Status.");
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
        `Ocorrência salva com sucesso!\n\nResumo:\n- Data: ${ocorrenciaData.data}\n- Status: ${ocorrenciaData.status}\n- Produtos: ${ocorrenciaData.produtos.length}`
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
            <label style={styles.formLabel}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              style={styles.formSelect}
            >
              <option value="">Selecione o status</option>
              {tiposOcorrencia.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Plataforma</label>
            <select
              name="plataforma"
              value={formData.plataforma}
              onChange={handleInputChange}
              required
              style={styles.formSelect}
            >
              <option value="">Selecione uma plataforma</option>
              {plataformas.map((plataforma) => (
                <option key={plataforma.value} value={plataforma.value}>
                  {plataforma.label}
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
            </div>

            <div
              style={styles.tableContainer}
              onPaste={handleTablePaste}
              tabIndex={-1}
            >
              <table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        style={{ ...styles.th, width: column.width }}
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {produtos.map((produto, rowIndex) => (
                    <tr key={produto.id}>
                      {columns.map((column, colIndex) =>
                        renderCell(produto, rowIndex, column, colIndex)
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
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
