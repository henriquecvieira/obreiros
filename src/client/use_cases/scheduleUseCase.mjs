import PDFDocument from 'pdfkit';

class Schedule {
  constructor() {}

  async execute(req, res) {
    const { schedule } = req.body; 
    if (!schedule || !Array.isArray(schedule)) {
        return res.status(400).send('O campo "schedule" é obrigatório e deve ser um array.');
    }
    const doc = new PDFDocument();
    const filename = `schedule-${Date.now()}.pdf`;

    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

       doc.fontSize(18).text('Escala de Obreiros', { align: 'center' }).moveDown(1);

    
    const headerY = 100; 
    doc.fontSize(12);
    doc.text('Nome', 50, headerY);    
    doc.text('Horário', 200, headerY); 
    doc.text('Função', 350, headerY); 

    
    const lineY = headerY + 15; 
    doc.strokeColor('#000').lineWidth(1).moveTo(50, lineY).lineTo(550, lineY).stroke();

   
    let yPosition = lineY + 15; 
    schedule.forEach((entry) => {
        const { nome, horario, funcao } = entry;

        doc.fontSize(10);
        doc.text(nome, 50, yPosition);     
        doc.text(horario, 200, yPosition); 
        doc.text(funcao, 350, yPosition);  

        yPosition += 20; 
    });

    doc.end();
  }
}

export default Schedule;
