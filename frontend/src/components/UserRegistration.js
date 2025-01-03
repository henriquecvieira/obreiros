// src/components/UserRegistration.js
import React, { useState } from "react";
import axios from "axios";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "homem",
    role: "",
    active: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/v1/createUser", formData);
      alert("Cadastro realizado com sucesso!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao realizar o cadastro.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <h1 style={{ textAlign: "center", color: "#007bff" }}>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name" style={{ fontSize: "14px", color: "#333" }}>Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "96%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="gender" style={{ fontSize: "14px", color: "#333" }}>Gênero:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", marginTop: "5px" }}
          >
            <option value="homem">Homem</option>
            <option value="mulher">Mulher</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="role" style={{ fontSize: "14px", color: "#333" }}>Cargo:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", marginTop: "5px" }}
          >
            <option value="">Selecione o cargo</option> {/* Opção de placeholder */}
            <option value="Pastor">Pastor</option>
            <option value="Pastor Evangelista">Pastor Evangelista</option>
            <option value="Presbítero">Presbítero</option>
            <option value="Oficial Obreiro(a)">Oficial Obreiro(a)</option>
            <option value="Diácono">Diácono</option>
            <option value="Diaconisa">Diaconisa</option>
            <option value="Cooperador(a)">Cooperador(a)</option>
            <option value="Maestro">Maestro</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="active" style={{ fontSize: "14px", color: "#333" }}>Ativo:</label>
          <input
            type="checkbox"
            id="active"
            name="active"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            style={{ marginTop: "5px" }}
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
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;
