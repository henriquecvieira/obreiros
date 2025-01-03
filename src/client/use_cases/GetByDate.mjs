import UUIDGenerator from "../../support/UUIDGenerator.mjs";
import DataNotFoundException from "../../core/exceptions/DataNotFoundException.mjs";
import { generateSchedulePdf } from "../../support/PdfService.mjs";
import schedulePresenter from "../presenters/schedulePresenter.mjs"

class GetByDate {
  constructor(scheduleRepository) {
    this.scheduleRepository = scheduleRepository;
  }

  async execute(startDate, endDate) {
    try {
      // Busca as escalas no repositório
      const schedules = await this.scheduleRepository.getScheduleByDate(startDate, endDate);

      // Organiza os dados por usuário
      const usersBySchedule = {};
      schedules.forEach(schedule => {
        const userId = schedule._id.toString();
        if (!usersBySchedule[userId]) {
          usersBySchedule[userId] = {
            name: schedule.name,
            schedules: []
          };
        }
        usersBySchedule[userId].schedules.push({
          department: schedule.department,
          time: schedule.time,
          date: schedule.date
        });
      });

      const formattedSchedules = schedulePresenter.format(usersBySchedule);

      const pdfPath = await generateSchedulePdf(formattedSchedules);

      return pdfPath;

    } catch (error) {
      console.log(error)
      throw new DataNotFoundException("erro...");
    }
  }
}

export default GetByDate;
