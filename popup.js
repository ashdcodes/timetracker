let currentView = 'daily';
let intervalId;

document.addEventListener('DOMContentLoaded', () => {
  updateStats();
  intervalId = setInterval(updateStats, 1000); // Update every second

  document.getElementById('dailyBtn').addEventListener('click', () => switchView('daily'));
  document.getElementById('weeklyBtn').addEventListener('click', () => switchView('weekly'));
  document.getElementById('monthlyBtn').addEventListener('click', () => switchView('monthly'));
});

function switchView(view) {
  currentView = view;
  document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`${view}Btn`).classList.add('active');
  updateStats();
}

function updateStats() {
  chrome.storage.local.get(null, data => {
    const table = document.getElementById('statsTable');
    // Clear existing rows except header
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    const now = new Date().getTime();
    const sortedDomains = Object.keys(data).sort((a, b) => {
      const timeA = data[a].lastUpdated === now ? data[a][currentView] + 1000 : data[a][currentView];
      const timeB = data[b].lastUpdated === now ? data[b][currentView] + 1000 : data[b][currentView];
      return timeB - timeA;
    });

    for (let domain of sortedDomains) {
      const row = table.insertRow(-1);
      const websiteCell = row.insertCell(0);
      const timeCell = row.insertCell(1);

      websiteCell.innerHTML = `<img src="${data[domain].favicon}" alt="" class="favicon" width="16" height="16"><span class="website">${domain}</span>`;
      
      let time = data[domain][currentView];
      if (data[domain].lastUpdated === now) {
        time += 1000; // Add 1 second if this is the current active tab
      }
      timeCell.textContent = formatTime(time);
    }
  });
}

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}

// Clean up interval when popup is closed
window.addEventListener('unload', () => {
  clearInterval(intervalId);
});