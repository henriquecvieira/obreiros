import React, { useState, useEffect } from "react";
import axios from "axios";

const FunctionAssignment = () => {
  const [formData, setFormData] = useState({
    obreiroId: "",
    function: "",
    cargo: "",
    gender: "",
    date: "",
    time: "",
  });
  const [obreiros, setObreiros] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar os dados da escala para o backend
      const response = await axios.post("http://localhost:3000/escala/create", formData);
      alert("Escala cadastrada com sucesso!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar escala:", error);
      alert("Erro ao cadastrar a escala.");
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

        {/* Seleção de função */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="function" style={{ fontSize: "14px", color: "#333" }}>Função:</label>
          <select
            id="function"
            name="function"
            value={formData.function}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", marginTop: "5px" }}
          >
            <option value="">Selecione uma função</option>
            <option value="Portaria">Portaria</option>
            <option value="Limpeza">Limpeza</option>
            <option value="Cozinha">Cozinha</option>
            <option value="Nave da Igreja">Nave da Igreja</option>
            <option value="Som">Som</option>
            <option value="Departamento Infantil">Departamento Infantil</option>
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
          Gerar Escala
        </button>
      </form>
    </div>
  );
};

export default FunctionAssignment;
