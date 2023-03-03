
const historicalUrl = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=61.4978&lon=23.761&units=metric&appid=${API_KEY}`;
const projectionUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=61.4978&lon=23.761&exclude=current,minutely,hourly&units=metric&appid=${API_KEY}`;
const API_KEY = "2a0f475a6b80a2bb6a8c0f62a057c874";
// Function to fetch historical temperature data
async function fetchHistoricalData() {
  const response = await fetch(historicalUrl);
  const data = await response.json();
  return data;
}

// Function to fetch future temperature projections
async function fetchProjectionData() {
  const response = await fetch(projectionUrl);
  const data = await response.json();
  return data;
}

// Function to create historical temperature chart
function createHistoricalChart(data) {
  const temperatureData = data.hourly.map(hour => hour.temp);
  const dateLabels = data.hourly.map(hour => new Date(hour.dt * 1000).toLocaleDateString());

  const ctx = document.getElementById("historical-chart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dateLabels,
      datasets: [{
        label: "Temperature (°C)",
        data: temperatureData,
        borderColor: "#3e95cd",
        fill: false
      }]
    },
    options: {
      title: {
        display: true,
        text: "Historical Temperature Data"
      }
    }
  });
}

// Function to create future temperature projections chart
function createProjectionChart(data) {
  const temperatureData = data.daily.map(day => day.temp.day);
  const dateLabels = data.daily.map(day => new Date(day.dt * 1000).toLocaleDateString());

  const ctx = document.getElementById("projection-chart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dateLabels,
      datasets: [{
        label: "Temperature (°C)",
        data: temperatureData,
        borderColor: "#3e95cd",
        fill: false
      }]
    },
    options: {
      title: {
        display: true,
        text: "Future Temperature Projections"
      }
    }
  });
}

// Function to initialize the dashboard
async function init() {
  const historicalData = await fetchHistoricalData();
  const projectionData = await fetchProjectionData();

  createHistoricalChart(historicalData);
  createProjectionChart(projectionData);
}

init();
