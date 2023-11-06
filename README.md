# Habit Manager

Habit Manager is a simple tool that allows you to plan and track your daily activities, then receive a chart summarizing your activities via email. It is designed to work with Google Sheets and Google Calendar. This README will guide you through the setup and usage of this tool.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you can use Habit Manager, make sure you have the following:

1. A Google account to access Google Sheets and Google Calendar.
2. A Google Sheet with your planned activities and hours.
3. Google Calendar(s) set up for each type of activity you want to track.

## Setup

1. Create a Google Sheet:
   - Create a new Google Sheet or use an existing one to plan your activities. The first row should contain the names of your calendars (e.g., "Sport" for gym, walking, and running).
   - In the second row, add the planned hours for each activity per week.
   - Take note of the Google Sheet's name as you'll need it later.

2. Set up Google Calendar:
   - Create a Google Calendar for each type of activity you want to track (e.g., "Sport" for gym, walking, and running).
   - Make sure to have the same names in your Google Sheet and Google Calendar.

3. Allow Google Apps Script Access:
   - Open your Google Sheet.
   - Click on "Extensions" > "Apps Script."
   - Paste the provided code into the script editor and save it.
   - Run the `myFunction` function once to grant necessary permissions.

4. Set Up a Daily Trigger:
   - In the script editor, click on the clock icon.
   - Configure a daily trigger for the `myFunction` function.

## Usage

Habit Manager helps you track your activities and receive a summary via email. To use it:

1. Open your Google Sheet.
2. Update the planned hours for your activities in the second row.
3. Make sure your Google Calendar events match your planned activities.
4. The tool will run automatically on a daily trigger.

## Customization

You can customize the tool by modifying the code to fit your specific needs. Some possible customizations include:

- Changing the format of the email sent.
- Adjusting the chart style in the `createChart` function.
- Modifying the trigger schedule.

## Contributing

If you want to contribute to this project, feel free to create pull requests or open issues. Your contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

Enjoy tracking your habits with Habit Manager!
