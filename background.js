let currentTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, updateCurrentTab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === currentTab?.id && changeInfo.url) {
    updateCurrentTab(tab);
  }
});

function updateCurrentTab(tab) {
  if (currentTab) {
    updateTime(currentTab.url);
  }
  currentTab = tab;
  startTime = new Date();
}

function updateTime(url) {
  if (!url) return;
  const domain = new URL(url).hostname;
  const endTime = new Date();
  const timeSpent = endTime - startTime;

  chrome.storage.local.get(domain, data => {
    const stats = data[domain] || { daily: 0, weekly: 0, monthly: 0, favicon: '' };
    stats.daily += timeSpent;
    stats.weekly += timeSpent;
    stats.monthly += timeSpent;
    stats.favicon = `https://www.google.com/s2/favicons?domain=${domain}`;
    stats.lastUpdated = endTime.getTime();

    chrome.storage.local.set({ [domain]: stats });
  });

  startTime = new Date(); // Reset start time for next update
}

// Set up alarm for periodic updates
chrome.alarms.create('updateTimer', { periodInMinutes: 1/60 }); // Run every second

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'updateTimer') {
    if (currentTab) {
      updateTime(currentTab.url);
    }
  }
});

// Reset stats daily
chrome.alarms.create('resetStats', { periodInMinutes: 60 }); // Check every hour

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'resetStats') {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() < 60) { // Check if it's just past midnight
      chrome.storage.local.get(null, data => {
        for (let domain in data) {
          data[domain].daily = 0;
          if (now.getDay() === 0) data[domain].weekly = 0;
          if (now.getDate() === 1) data[domain].monthly = 0;
        }
        chrome.storage.local.set(data);
      });
    }
  }
});