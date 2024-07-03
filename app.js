// Function to format date as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Function to add months to a date
function addMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);

  // Handle overflow of months to adjust the year
  if (result.getMonth() > 11) {
    result.setFullYear(result.getFullYear() + 1);
    result.setMonth(result.getMonth() - 12);
  }

  return result;
}

// Get the current date
const today = new Date();

// Add 6 months to the current date
const newDate = addMonths(today, 6);

const new9Date = addMonths(today, 4.5);
const new6Date = addMonths(today, 3);
const new3Date = addMonths(today, 1.5);
const new2Date = addMonths(today, 1);
// Format the new date
const formattedNewDate = formatDate(newDate);
const formattedNewDate9 = formatDate(new9Date);
const formattedNewDate6 = formatDate(new6Date);
const formattedNewDate3 = formatDate(new3Date);
const formattedNewDate2 = formatDate(new2Date);

// Set the value of HTML elements (if you have input fields to display the dates)
document.getElementById("currentDate").value = formatDate(today);
document.getElementById("newDate").value = formattedNewDate;

document.getElementById("month9").value = formattedNewDate9;
document.getElementById("month6").value = formattedNewDate6;
document.getElementById("month3").value = formattedNewDate3;
document.getElementById("month2").value = formattedNewDate2;

// For demonstration purposes
console.log("Current Date: ", formatDate(today));
console.log("New Date (6 months later): ", formattedNewDate);

function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  document.getElementById("current-time").innerText = formattedTime;
}

// Update the time immediately
updateTime();

// Update the time every second
setInterval(updateTime, 1000);
