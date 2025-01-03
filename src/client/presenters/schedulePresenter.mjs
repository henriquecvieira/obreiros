class SchedulePresenter {
  static format(usersBySchedule) {
    const formatted = {};

    // Primeira iteração para calcular o comprimento máximo dos campos
    Object.values(usersBySchedule).forEach(user => {
      user.schedules.forEach(schedule => {
        const { department, date, time } = schedule;

        // Inicializa o departamento se não existir
        if (!formatted[department]) {
          formatted[department] = [];
        }

        // Armazena as informações para formatação posterior
        formatted[department].push({
          name: user.name,
          date: new Date(date).toLocaleDateString(),
          time,
        });
      });
    });

    // Segunda iteração para formatar os dados com intervalos fixos
    return Object.entries(formatted).map(([department, schedules]) => {
      const scheduleRows = schedules.map(schedule => {
        const { name, date, time } = schedule;

        // Preenche com espaços para garantir que o nome vá da posição 1 até 30
        const nameWithPadding = name.padEnd(30, ' '); // Posição 1 até 30
        const dateWithPadding = date.padEnd(10, ' '); // Posição 31 até 40
        const timeWithPadding = time.padEnd(5, ' '); // Posição 41 até 45

        // Retorna a linha formatada com os campos alinhados
        return `${nameWithPadding} - ${dateWithPadding} - ${timeWithPadding}`;
      });

      return {
        department,
        schedules: scheduleRows,
      };
    });
  }
}

export default SchedulePresenter;
