/* // Function to format date as YYYY-MM-DD
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
 */

function updateTime() {
  // Create a new Date object
  var now = new Date();

  // Get the hour and determine AM/PM
  var hours = now.getHours();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 to 12

  // Format the time as needed (e.g., HH:MM:SS AM/PM)
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var seconds = now.getSeconds().toString().padStart(2, "0");
  var currentTime = hours + ":" + minutes + ":" + seconds + " " + ampm;

  // Get the <p> tag by its ID and update its content
  document.getElementById("current-time").innerText = currentTime;
}

// Call the updateTime function once the page has loaded
window.onload = function () {
  updateTime();

  // Optionally, update the time every second
  setInterval(updateTime, 1000);
};

const currentDateElement = document.getElementById("currentDate");
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString();

currentDateElement.textContent = `Current Date: ${formattedDate}`;

function calculateDifference() {
  const userDate = document.getElementById("userDate").value;
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (userDate.match(datePattern)) {
    const currentDate = new Date();
    const enteredDate = new Date(userDate);

    const timeDifference = enteredDate - currentDate;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    let years = Math.floor(daysDifference / 365);
    let months = Math.floor((daysDifference % 365) / 30);
    let days = daysDifference - years * 365 - months * 30;

    let result = "";
    if (years > 0) result += `${years} year(s) `;
    if (months > 0) result += `${months} month(s) `;
    if (days > 0) result += `${days} day(s)`;

    document.getElementById("result").innerText = `The days left: ${result}`;
  } else {
    document.getElementById("result").innerText =
      "Please enter a valid date in the format yyyy-mm-dd.";
  }
}

function clearResult() {
  document.getElementById("userDate").value = "";
  document.getElementById("result").innerText = "";
}

function calculateShelfLife() {
  const expiryDate = new Date(document.getElementById("expiryDate").value);
  if (isNaN(expiryDate)) {
    document.getElementById("result").innerText = "Please enter a valid date.";
    return;
  }

  const periods = {
    newDate: 12, // 1 year in months
    month9: 9, // 9 months
    month6: 6, // 6 months
    month3: 3, // 3 months
    month2: 2, // 2 months
  };

  for (const [id, months] of Object.entries(periods)) {
    const halfLifeDate = new Date(expiryDate);
    halfLifeDate.setMonth(halfLifeDate.getMonth() - months / 2);
    document.getElementById(id).innerText = halfLifeDate
      .toISOString()
      .split("T")[0];
  }
}

/* update real expiryDate */
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const rows = document.querySelectorAll(".exp-table tbody tr");

  rows.forEach((row) => {
    const shelfLifeCell = row.cells[0];
    const expirationDateCell = row.cells[1];
    const shelfLifeText = shelfLifeCell.textContent.trim();

    let halfShelfLifeDays = 0;
    if (shelfLifeText.includes("year")) {
      const years = parseFloat(shelfLifeText);
      halfShelfLifeDays = (years * 12 * 30) / 2;
    } else if (shelfLifeText.includes("month")) {
      const months = parseFloat(shelfLifeText);
      halfShelfLifeDays = (months * 30) / 2;
    }

    if (halfShelfLifeDays > 0) {
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + halfShelfLifeDays);
      expirationDateCell.textContent = expirationDate
        .toISOString()
        .split("T")[0];
    }
  });
});
