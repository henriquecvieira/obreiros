const formatDate = (dateValue) => {
  const dateString = dateValue.toString()

  if (dateString.length === 10) {
    let datePart = dateValue.match(/\d+/g)
    let year = datePart[2]
    let month = datePart[1]
    let day = datePart[0]
    return year + '-' + month + '-' + day
  }

  let d = new Date(dateValue)
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) { month = '0' + month; }
  if (day.length < 2) { day = '0' + day; }

  return [year, month, day].join('-');
}

export default {
  formatDate
}
