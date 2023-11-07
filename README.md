# Habit Manager

Hobbit Manager is a versatile Activity Manager that simplifies the process of planning and tracking your daily activities. Whether you want to boost your productivity, cultivate new habits, or maintain a record of your daily routines, Hobbit Manager has you covered. The best part? No need to install any applications or learn complex software interfaces. You only require a Google account to get started.
Features:

Seamless Integration with Google Services: Hobbit Manager is designed to seamlessly integrate with Google Sheets and Google Calendar, making it easy to leverage the power of these popular productivity tools.

Track Your Progress: Effortlessly track your daily activities, set targets, and monitor your progress with an intuitive interface.

Summarize Your Activities: Receive a summary of your daily activities via email, providing a convenient way to review and reflect on your accomplishments.

User-Friendly Setup: This README is your step-by-step guide to setting up and using the Hobbit Manager. Whether you're tech-savvy or new to activity tracking, we've got you covered.

‌Below is a sample chart that I created for my activities:
![image](https://github.com/mortezaisehaghi/Habit-Manager/assets/13310072/5f00dd0e-03bd-4524-9eae-5f0cbdb883a7)



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
   Below is a sample sheet
![image](https://github.com/mortezaisehaghi/Habit-Manager/assets/13310072/b4ef116c-eb67-49ae-a0ee-c5521a0f649f)
 

2. Set up Google Calendar:
   - Create a Google Calendar for each type of activity you want to track (e.g., "Sport" for gym, walking, and running).
   - Make sure to have the same names in your Google Sheet and Google Calendar.

3. Allow Google Apps Script Access:
   - Open your Google Sheet.
   - Click on "Extensions" > "Apps Script."
   - Paste the provided code into the script editor and save it.
   - Run the `main` function once to grant necessary permissions.

4. Set Up a Daily Trigger:
   - In the script editor, click on the clock icon.
   - Configure a daily trigger for the `main` function.

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

This project is licensed under the Apache-2.0 license.

Enjoy tracking your habits with Habit Manager!

### Tags
#habit-tracker #activity-tracker #habit-management #self-improvement #tracking-app #goal-setting #time-tracker  #activity-management 
#Habit-Manager #activity-Manager #activity-Manager-google #habit-Manager-google #activity-Manager-apps-script #activity-management-apps-script
#apps-script #Habit-Manager-google #activity-management-google #activity-Manager-google #activity-Manager-google #activity-Manager-google
#management #habit #management #activity #tracking #google #calendar #apps-script #goole-sheet #google-calendar #google-activity-management #javascript

