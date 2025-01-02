import React, { useState, useEffect } from "react";
import axios from "axios";

const FunctionAssignment = () => {
  const [formData, setFormData] = useState({
    obreiroId: "",
    department: "",
    date: "",
    time: "",
  });
  const [obreiros, setObreiros] = useState([]);
  const [temporarySchedule, setTemporarySchedule] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchObreiros = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/obreiro/list");
        setObreiros(response.data);
      } catch (error) {
        console.error("Erro ao buscar obreiros:", error);
      }
    };
    fetchObreiros();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Encontrar o nome do obreiro baseado no ID
    const obreiro = obreiros.find((obreiro) => obreiro.id === formData.obreiroId);

    if (obreiro) {
      // Criar um novo item para a escala temporária
      const newScheduleItem = {
        name: obreiro.name,
        department: formData.department,
        date: formData.date,
        time: formData.time,
      };

      // Adicionar esse item à escala temporária
      setTemporarySchedule([...temporarySchedule, newScheduleItem]);

      // Limpar o formulário
      setFormData({
        obreiroId: "",
        department: "",
        date: "",
        time: "",
      });
    }
  };

  const handleConfirm = async () => {
    try {
      setIsSaving(true);

      // Enviar a escala temporária para o backend (salvando os dados)
      await axios.post("http://localhost:3000/v1/escala/create", { schedule: temporarySchedule });

      // Limpar a escala temporária após salvar
      setTemporarySchedule([]);
      alert("Escala confirmada e salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar a escala:", error);
      alert("Houve um erro ao salvar a escala.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <h1 style={{ textAlign: "center", color: "#007bff" }}>Cadastro de Escala</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo para selecionar obreiro */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="obreiroId" style={{ fontSize: "14px", color: "#333" }}>Obreiro:</label>
          <select
            id="obreiroId"
            name="obreiroId"
            value={formData.obreiroId}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", marginTop: "5px" }}
          >
            <option value="">Selecione um obreiro</option>
            {obreiros.map((obreiro) => (
              <option key={obreiro.id} value={obreiro.id}>{obreiro.name}</option>
            ))}
          </select>
        </div>

        {/* Seleção de departamento */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="department" style={{ fontSize: "14px", color: "#333" }}>Departamento:</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", marginTop: "5px" }}
          >
            <option value="">Selecione um Departamento</option>
            <option value="Portaria">Portaria</option>
            <option value="Limpeza">Limpeza</option>
            <option value="Cozinha">Cozinha</option>
            <option value="Nave da Igreja">Nave</option>
            <option value="Som">Som</option>
            <option value="Departamento Infantil">Infantil</option>
          </select>
        </div>

        {/* Data da escala */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="date" style={{ fontSize: "14px", color: "#333" }}>Data:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{ width: "95%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", marginTop: "5px" }}
          />
        </div>

        {/* Campo de horário */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="time" style={{ fontSize: "14px", color: "#333" }}>Horário:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            style={{ width: "95%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "4px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Adicionar
        </button>
      </form>

      {/* Exibição da Escala Temporária */}
      <div style={{ marginTop: "30px", padding: "10px", backgroundColor: "#f1f1f1", borderRadius: "8px" }}>
        <h3 style={{ color: "#007bff" }}>Escala Temporária</h3>
        <ul>
          {temporarySchedule.map((item, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>{item.name}</strong> - {item.department} - {item.date} - {item.time}
            </li>
          ))}
        </ul>

        {/* Botão de confirmação */}
        <button
          onClick={handleConfirm}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "4px",
            backgroundColor: "#17a2b8",
            color: "white",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
          }}
          disabled={isSaving}
        >
          {isSaving ? "Salvando..." : "Confirmar e Salvar Escala"}
        </button>
      </div>
    </div>
  );
};

export default FunctionAssignment;
