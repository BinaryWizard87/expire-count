function updateTime() {
  var now = new Date();
  var hours = now.getHours();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var seconds = now.getSeconds().toString().padStart(2, "0");
  var currentTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  document.getElementById("current-time").innerText = currentTime;
}

window.onload = function () {
  updateTime();
  setInterval(updateTime, 1000);

  // Calculate and update expiration dates in the table
  updateExpirationDates();
};

/* This is current date in hero section */
const currentDate = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}; // Customize format as needed

/* Calculate how many month from today */
const formattedDate = currentDate.toLocaleDateString("en-US", options); // Adjust locale if necessary

const dateElement = document.getElementById("currentDate");
dateElement.textContent = formattedDate;

function calculateFutureDate() {
  const userMonths = parseInt(document.getElementById("userMonths").value);
  if (isNaN(userMonths)) {
    alert("Please enter a valid number of months");
    return;
  }

  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1 + userMonths;
  let day = today.getDate();

  // Adjust for month and year overflow
  while (month > 12) {
    month -= 12;
    year++;
  }

  const futureDate = new Date(year, month - 1, day); // Create the future date
  const formattedDate = futureDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.getElementById("resultMonth").textContent = formattedDate;
}

/* Calculate how manu day from today */
function calculateFutureDateByDays() {
  const userDays = parseInt(document.getElementById("userDays").value); // Assuming an input field with id "userDays"
  if (isNaN(userDays)) {
    alert("Please enter a valid number of days");
    return;
  }

  const today = new Date();
  today.setDate(today.getDate() + userDays);

  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.getElementById("resultDay").textContent = formattedDate;
}

function updateExpirationDates() {
  const today = new Date();
  const rows = document.querySelectorAll(".exp-table tbody tr");

  rows.forEach((row) => {
    const shelfLifeCell = row.cells[0];
    const expirationDateCell = row.cells[1];
    const shelfLifeText = shelfLifeCell.textContent.trim();

    let halfShelfLifeDays = 0;
    if (shelfLifeText.includes("year")) {
      const years = parseFloat(shelfLifeText);
      halfShelfLifeDays = (years * 365) / 2;
    } else if (shelfLifeText.includes("month")) {
      const months = parseFloat(shelfLifeText);
      if (months === 1) {
        halfShelfLifeDays = 15; // Special case for 1 month
      } else {
        halfShelfLifeDays = (months * 30) / 2;
      }
    }

    if (halfShelfLifeDays > 0) {
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + halfShelfLifeDays);
      expirationDateCell.textContent = expirationDate
        .toISOString()
        .split("T")[0];
    }
  });
}

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

/* This is clock */
const seconds = document.querySelector(".seconds");
const minutes = document.querySelector(".minutes");
const minute = document.querySelector(".minute");
const hour = document.querySelector(".hour");

function getTime() {
  let date = new Date(),
    s = date.getSeconds(),
    m = date.getMinutes();

  hour.textContent = date.getHours();
  minute.textContent = m;

  minutes.style = `--dRotate:${6 * m}deg`;

  if (s == 0) {
    seconds.classList.add("stop-anim");
  } else {
    seconds.classList.remove("stop-anim");
  }
  if (m == 0) {
    minutes.classList.add("stop-anim");
  } else {
    minutes.classList.remove("stop-anim");
  }

  seconds.style = `--dRotate:${6 * s}deg`;
}

setInterval(getTime, 1000);
getTime();
