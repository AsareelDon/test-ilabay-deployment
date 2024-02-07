const dateStampLabel = (timestamp) => {
  let date = new Date(timestamp); // Change 'value' to 'date'
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const dateTime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`

  return dateTime;
}

export default dateStampLabel;
