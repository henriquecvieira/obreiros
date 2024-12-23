export default function usersByCreatedIdPresenter(log) {
  return log.map(
    ({ _id, userId, action, timestamp, ipAddress, additionalData: { success, message, email } = {} }) => ({
      _id,
      userId,
      action,
      timestamp: new Date(timestamp).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      ipAddress,
      success,
      message,
      email
    })
  );
}
