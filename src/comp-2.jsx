import React, { useState, useEffect } from "react";

const ModalCadastroOcorrencia = ({ isOpen = true, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    data: "",
    tipo: "",
    observacao: "",
  });

  const [produtos, setProdutos] = useState([]);
  const [productCount, setProductCount] = useState(0);

  // Define data atual como padrão
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, data: today }));
  }, []);

  const tiposOcorrencia = [
    { value: "confirmacao-denuncia", label: "Confirmação da denúncia" },
    { value: "caso-perdido", label: "Caso perdido" },
    { value: "denuncia-plataforma", label: "Denúncia na plataforma" },
    { value: "investigacao", label: "Investigação" },
    { value: "outros", label: "Outros" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatPrice = (value) => {
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";

    const formattedValue = numericValue.replace(/(\d)(\d{2})$/, "$1,$2");
    const finalValue = formattedValue.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return `R$ ${finalValue}`;
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

    console.log("Dados da ocorrência:", ocorrenciaData);

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

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "hidden",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#111827",
                margin: 0,
              }}
            >
              Nova Ocorrência
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginTop: "4px",
                margin: "4px 0 0 0",
              }}
            >
              Preencha os dados da ocorrência e adicione os produtos
              relacionados
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              color: "#6b7280",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "4px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "24px",
            maxHeight: "calc(90vh - 140px)",
            overflowY: "auto",
          }}
        >
          {/* Dados da Ocorrência */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Data
            </label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Tipo
            </label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                backgroundColor: "white",
                cursor: "pointer",
              }}
            >
              <option value="">Selecione o tipo</option>
              {tiposOcorrencia.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Observação
            </label>
            <textarea
              name="observacao"
              value={formData.observacao}
              onChange={handleInputChange}
              placeholder="Descreva detalhes relevantes sobre a ocorrência..."
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                minHeight: "80px",
                resize: "vertical",
                fontFamily: "inherit",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Seção de Produtos */}
          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              paddingTop: "20px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>Produtos Relacionados</span>
              <button
                type="button"
                onClick={addProduct}
                style={{
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
                }}
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
                <div
                  style={{
                    textAlign: "center",
                    color: "#6b7280",
                    fontSize: "14px",
                    padding: "20px",
                    border: "2px dashed #d1d5db",
                    borderRadius: "8px",
                  }}
                >
                  Nenhum produto adicionado. Clique em "Adicionar Produto" para
                  começar.
                </div>
              ) : (
                produtos.map((produto) => (
                  <div
                    key={produto.id}
                    style={{
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "16px",
                      marginBottom: "12px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#6b7280",
                        }}
                      >
                        Produto {produto.number}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeProduct(produto.id)}
                        style={{
                          background: "#ef4444",
                          color: "white",
                          border: "none",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
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

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#374151",
                            marginBottom: "6px",
                          }}
                        >
                          Descrição
                        </label>
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
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            border: "1px solid #d1d5db",
                            borderRadius: "8px",
                            fontSize: "14px",
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            window.innerWidth <= 640 ? "1fr" : "2fr 1fr",
                          gap: "12px",
                        }}
                      >
                        <div>
                          <label
                            style={{
                              display: "block",
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#374151",
                              marginBottom: "6px",
                            }}
                          >
                            Preço
                          </label>
                          <input
                            type="text"
                            value={produto.preco}
                            onChange={(e) =>
                              updateProduct(produto.id, "preco", e.target.value)
                            }
                            placeholder="R$ 0,00"
                            style={{
                              width: "100%",
                              padding: "10px 12px",
                              border: "1px solid #d1d5db",
                              borderRadius: "8px",
                              fontSize: "14px",
                            }}
                          />
                        </div>

                        <div>
                          <label
                            style={{
                              display: "block",
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#374151",
                              marginBottom: "6px",
                            }}
                          >
                            Link
                          </label>
                          <input
                            type="url"
                            value={produto.link}
                            onChange={(e) =>
                              updateProduct(produto.id, "link", e.target.value)
                            }
                            placeholder="https://..."
                            style={{
                              width: "100%",
                              padding: "10px 12px",
                              border: "1px solid #d1d5db",
                              borderRadius: "8px",
                              fontSize: "14px",
                            }}
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
        <div
          style={{
            padding: "20px 24px",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            flexDirection: window.innerWidth <= 640 ? "column" : "row",
          }}
        >
          <button
            type="button"
            onClick={handleClose}
            style={{
              background: "white",
              color: "#374151",
              border: "1px solid #d1d5db",
              padding: "10px 20px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f9fafb")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              background: "#3b82f6",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
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

export default ModalCadastroOcorrencia;
