// background.js
let currentTab = null;
let startTime = null;
let updateInterval = null;

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
    clearInterval(updateInterval);
    updateTime(currentTab.url);
  }
  currentTab = tab;
  startTime = new Date();
  updateInterval = setInterval(() => updateTime(currentTab.url), 1000);
}

function updateTime(url) {
  if (!url) return;
  const domain = new URL(url).hostname;
  const endTime = new Date();
  const timeSpent = endTime - startTime;

  chrome.storage.local.get(domain, data => {
    const stats = data[domain] || { daily: 0, weekly: 0, monthly: 0, favicon: '' };
    stats.daily += 1000;  // Add 1 second
    stats.weekly += 1000;
    stats.monthly += 1000;
    stats.favicon = `https://www.google.com/s2/favicons?domain=${domain}`;
    stats.lastUpdated = endTime.getTime();

    chrome.storage.local.set({ [domain]: stats });
  });
}

// Reset stats daily
const resetDaily = () => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    chrome.storage.local.get(null, data => {
      for (let domain in data) {
        data[domain].daily = 0;
        if (now.getDay() === 0) data[domain].weekly = 0;
        if (now.getDate() === 1) data[domain].monthly = 0;
      }
      chrome.storage.local.set(data);
    });
  }
};

setInterval(resetDaily, 60000); // Check every minute