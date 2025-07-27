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
      maxHeight: "90vh",
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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

                      <div
                        style={
                          isMobile
                            ? styles.mobileProductFormRow
                            : styles.productFormRow
                        }
                      >
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
        <div style={isMobile ? styles.mobileModalFooter : styles.modalFooter}>
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

export default ModalCadastroOcorrencia;
