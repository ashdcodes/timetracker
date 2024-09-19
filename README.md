# Time Tracker

## Overview

Website Time Tracker is a Chrome extension that helps you monitor and manage your time spent on different websites. It provides real-time tracking and displays daily, weekly, and monthly statistics for your browsing habits.

## Features

- Real-time tracking of time spent on websites
- Daily, weekly, and monthly time statistics
- Clean, modern user interface
- Website favicons for easy recognition
- Automatic daily, weekly, and monthly resets
- Sorting of websites by time spent

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.
5. The Website Time Tracker extension should now appear in your Chrome toolbar.

## Usage

1. Click on the extension icon in the Chrome toolbar to open the popup.
2. The popup will display a list of websites you've visited, along with the time spent on each.
3. Use the toggle buttons at the top to switch between daily, weekly, and monthly views.
4. The time for the currently active tab will update in real-time.

## Files

- `manifest.json`: Defines the extension's properties and permissions.
- `background.js`: Handles the core functionality of tracking time spent on each website.
- `popup.html`: Provides the structure for the popup that displays the statistics.
- `popup.js`: Populates the popup with the tracked data and handles user interactions.
- `icon48.png` and `icon128.png`: Extension icons.

## Customization

You can customize the extension by modifying the following files:

- `popup.html`: Adjust the HTML structure of the popup.
- `popup.js`: Modify the JavaScript to change how data is displayed or add new features.
- `background.js`: Alter the tracking logic or add new tracking metrics.

## Privacy

This extension only stores data locally on your device. No information is sent to external servers.

## Contributing

Contributions to improve the Website Time Tracker are welcome. Please feel free to submit pull requests or open issues to suggest improvements or report bugs.

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).