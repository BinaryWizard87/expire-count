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
 */

// Function to format date as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Function to add months to a date, including fractional months
function addMonths(date, months) {
  const result = new Date(date);
  const totalMonths = date.getMonth() + Math.floor(months);
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  result.setFullYear(result.getFullYear() + years);
  result.setMonth(remainingMonths);

  // Calculate fractional part and add the corresponding days
  const fractionalPart = months % 1;
  if (fractionalPart > 0) {
    const daysInMonth = new Date(
      result.getFullYear(),
      result.getMonth() + 1,
      0
    ).getDate();
    const additionalDays = Math.round(fractionalPart * daysInMonth);
    result.setDate(result.getDate() + additionalDays);
  }

  // Handle day overflow when adding months
  if (result.getDate() < date.getDate()) {
    result.setDate(0); // Set to the last day of the previous month
  }

  return result;
}

// Get the current date
const today = new Date();

// Add 6, 4.5, 3, 1.5, and 1 months to the current date
const newDate = addMonths(today, 6);
const new9Date = addMonths(today, 4.5);
const new6Date = addMonths(today, 3);
const new3Date = addMonths(today, 1.5);
const new2Date = addMonths(today, 1);

// Format the new dates
const formattedNewDate = formatDate(newDate);
const formattedNewDate9 = formatDate(new9Date);
const formattedNewDate6 = formatDate(new6Date);
const formattedNewDate3 = formatDate(new3Date);
const formattedNewDate2 = formatDate(new2Date);

// Set the value of HTML elements
document.getElementById("currentDate").value = formatDate(today);
document.getElementById("newDate").value = formattedNewDate;

document.getElementById("month9").value = formattedNewDate9;
document.getElementById("month6").value = formattedNewDate6;
document.getElementById("month3").value = formattedNewDate3;
document.getElementById("month2").value = formattedNewDate2;

// For demonstration purposes
console.log("Current Date: ", formatDate(today));
console.log("New Date (6 months later): ", formattedNewDate);
console.log("New Date (4.5 months later): ", formattedNewDate9);
console.log("New Date (3 months later): ", formattedNewDate6);
console.log("New Date (1.5 months later): ", formattedNewDate3);
console.log("New Date (1 month later): ", formattedNewDate2);
