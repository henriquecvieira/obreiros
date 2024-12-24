import PDFDocument from 'pdfkit';

class Schedule {
  constructor() {
  }

  async execute(req, res) {
    // TODO CRIAR PDF com Nome, Horario e 
    console.log({params: req.body})
    const { schedule } = req.body; // Recebe um array de objetos com nome, horário e função

    if (!schedule || !Array.isArray(schedule)) {
        return res.status(400).send('O campo "schedule" é obrigatório e deve ser um array.');
    }

    // Cria um novo documento PDF
    const doc = new PDFDocument();
    const filename = `schedule-${Date.now()}.pdf`;

    // Define o cabeçalho da resposta para download do PDF
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/pdf');

    // Pipe do PDF para a resposta
    doc.pipe(res);

    // Adiciona título ao PDF
    doc.fontSize(18).text('Escala de Trabalho', { align: 'center' }).moveDown(1);

    // Cria a tabela de escala
    doc.fontSize(12).text('Nome', 50, doc.y, { continued: true });
    doc.text('Horário', 200, doc.y, { continued: true });
    doc.text('Função', 350, doc.y);
    doc.moveDown(0.5);
    doc.strokeColor('#000').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    // Adiciona os dados ao PDF
    schedule.forEach((entry) => {
        const { nome, horario, funcao } = entry;
        doc.moveDown(0.5);
        doc.fontSize(10).text(nome, 50, doc.y, { continued: true });
        doc.text(horario, 200, doc.y, { continued: true });
        doc.text(funcao, 350, doc.y);
    });

    // Finaliza o documento
    doc.end();
  }
}

export default Schedule
