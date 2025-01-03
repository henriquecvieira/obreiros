import PDFDocument from 'pdfkit';
import fs from 'fs';

export async function generateSchedulePdf(departmentGroups) {
  const doc = new PDFDocument();
  const outputPath = './escala.pdf';

  doc.pipe(fs.createWriteStream(outputPath));
  doc.fontSize(16).text('Escala de Obreiros', { align: 'center' });
  doc.moveDown(2);

  // Adiciona os dados formatados
  departmentGroups.forEach(group => {
    doc.fontSize(14).text(group.department, { underline: true });
    doc.moveDown(1);
    group.schedules.forEach(schedule => {
      doc.fontSize(12).text(schedule);
    });
    doc.moveDown(1);
  });

  doc.end();
  return outputPath;
}
