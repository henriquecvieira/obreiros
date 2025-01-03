import React, { useState } from "react";
import axios from "axios";

const ScheduleByDate = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Formata os dados para enviar como parâmetros de query string
      const { startDate, endDate } = formData;
      const response = await axios.get(
        `http://localhost:3000/v1/scheduleByDate?startDate=${startDate}&endDate=${endDate}`,
        { responseType: "blob" } // Para tratar o retorno como um arquivo PDF
      );

      // Cria uma URL de download para o PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "schedule.pdf"); // Nome do arquivo PDF
      document.body.appendChild(link);
      link.click();
      alert("PDF gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar o PDF.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <h1 style={{ textAlign: "center", color: "#007bff" }}>Gerar Escala por Data</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="startDate" style={{ fontSize: "14px", color: "#333" }}>Data Inicial:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            style={{ width: "96%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="endDate" style={{ fontSize: "14px", color: "#333" }}>Data Final:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            style={{ width: "96%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", marginTop: "5px" }}
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
          Gerar PDF
        </button>
      </form>
    </div>
  );
};

export default ScheduleByDate;
