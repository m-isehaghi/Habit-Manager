var sheetName = "planned"; // Change this to the name of your sheet
var recipientEmail = "example@gmail.com" // Change this to your recipient email
var recipientName = "Morteza" // Change this to your recipient name, this name would show in the title of the chart.


function main() {

  // Retrieve calendars name from sheet.
  calendars = getRowAsList(1, sheetName);

  // Retrieve planned data from the.
  planneds = getRowAsList(2, sheetName);

  // Check if data lengths match.
  if (calendars.length !== planneds.length) {
    Logger.log("Incorrect sheet data");
  } 

  // Calculate actuals for each calendar.
  actuals = sumEventsDuration(getFirstHourOfCurrentWeek(),calendars)
  
  // Create the chart.
  chart = createChart(calendars, planneds, actuals)

  // Send the chart by email.
  sendChartByEmail(chart,recipientEmail)

}

function getRowAsList(rowNumber, sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);

  // Check if the sheet exists
  if (sheet) {
    var data = sheet.getDataRange().getValues();
    
    // Check if the sheet is empty
    if (data.length === 0) {
      Logger.log("The sheet is empty.");
      return [];
    }

    // Check if the rowNumber is within the valid range
    if (rowNumber < 1 || rowNumber > data.length) {
      Logger.log("Row number is out of range.");
      return [];
    }

    // Get the specified row as a list
    var rowList = data[rowNumber - 1];
    return rowList;
  } else {
    Logger.log("Sheet not found.");
    return [];
  }
}

function sumEventsDuration(fromDate,calendars) {
  var results = [];

    // Get the current date and the date one day ago
  var currentDate = new Date();
  // var oneDayAgo = new Date(currentDate);
  // oneDayAgo.setDate(currentDate.getDate() - 1);

  // Iterate through the list of calendar names
  for (var i = 0; i < calendars.length; i++) {
    var calendarName = calendars[i];

    // Get the calendar by name
    var calendar = CalendarApp.getCalendarsByName(calendarName)[0];
    
    // Check if the calendar exists
    if (calendar) {
      // Get the events from one day ago to the current date
      var events = calendar.getEvents(fromDate, currentDate);
      
      // Calculate the total duration of events in minutes
      var totalDuration = 0;
      for (var j = 0; j < events.length; j++) {
        var event = events[j];
        var duration = (event.getEndTime() - event.getStartTime()) / (1000 * 60 * 60); // Convert to minutes
        totalDuration += duration;
      }

      // Add the total duration to the results array
      results.push(totalDuration);
    } else {
      results.push(0); // Calendar not found
    }
  }

  return results;
}

/**
 * Gets the date and time representing the start of the current week.
 *
 * @returns {Date} The date and time set to the first hour of the current week.
 */
function getFirstHourOfCurrentWeek() {
  // Get the current date.
  var today = new Date();

  // Determine the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday).
  var dayOfWeek = today.getDay();

  // Calculate how many days until the start of the week (Monday).
  var daysToMonday = 1 - dayOfWeek;

  // Create a new Date object representing the first day of the current week.
  var firstDayOfCurrentWeek = new Date(today);
  firstDayOfCurrentWeek.setDate(today.getDate() + daysToMonday);

  // Set the time to 00:00:00 for the first hour of the day.
  firstDayOfCurrentWeek.setHours(0, 0, 0, 0);

  return firstDayOfCurrentWeek;
}

// This function creates a column chart to visualize planned and actual activities.
// It takes three arrays as input: 'calendars,' 'planneds,' and 'actuals.'
// 'calendars' contains the activity names, 'planneds' has planned durations,
// and 'actuals' contains actual durations for each activity.

function createChart(calendars, planneds, actuals) {
  // Create a new DataTable for the chart with three columns: 'Activity,' 'Planned,' and 'Actual.'
  var sampleData = Charts.newDataTable()
    .addColumn(Charts.ColumnType.STRING, "Activity")
    .addColumn(Charts.ColumnType.NUMBER, "Planned")
    .addColumn(Charts.ColumnType.NUMBER, "Actual");

  // Iterate through the provided data arrays and add rows to the DataTable.
  for (var i = 0; i < calendars.length; i++) {
    sampleData.addRow([calendars[i], planneds[i], actuals[i]]);
  }

  // Create a new column chart with customization options, including titles, dimensions, and the DataTable.
  var chart = Charts.newColumnChart()
    .setTitle('Weekly report of '+ recipientName +' activity in week ' + getCurrentWeekNumber() + ' of the year ' + getCurrentYearAsString())
    .setXAxisTitle('Activity')
    .setYAxisTitle('Amount (Minutes)')
    .setDimensions(800, 400)
    .setDataTable(sampleData)
    .build();
    
  // Return the generated chart.
  return chart;
}



/**
 * Gets the current week number of the year based on the current date.
 *
 * @returns {number} The current week number.
 */
function getCurrentWeekNumber() {
  // Get the current date.
  var currentDate = new Date();
  
  // Format the current date to retrieve the week number.
  // 'w' is the format specifier for week number.
  var weekNumber = Utilities.formatDate(currentDate, Session.getScriptTimeZone(), 'w');
  
  // Parse the week number as an integer and return it.
  return parseInt(weekNumber);
}

/**
 * Gets the current year as a string.
 *
 * @returns {string} The current year as a string.
 */
function getCurrentYearAsString() {
  // Get the current date.
  var currentDate = new Date();
  
  // Extract the current year from the date object.
  var currentYear = currentDate.getFullYear();
  
  // Convert the current year to a string and return it.
  return currentYear.toString();
}



/**
 * Sends a chart as an email attachment to the specified recipient.
 *
 * @param {Chart} chart - The chart to be sent as an image attachment.
 * @param {string} recipientEmail - The email address of the recipient.
 */
function sendChartByEmail(chart, recipientEmail) {
  // Capture the chart as an image blob.
  var chartImageBlob = chart.getAs('image/png');

  // Compose the email with the chart image as an attachment.
  var subject = 'Chart Image';
  var message = 'Please find the chart image attached.';
  var attachment = {
    fileName: 'chart.png',
    content: chartImageBlob.getBytes(),
    mimeType: 'image/png'
  };

  // Send the email with the chart attachment to the recipient.
  MailApp.sendEmail({
    to: recipientEmail,
    subject: subject,
    body: message,
    attachments: [attachment]
  });

  // Todo for Masoud 
  // Create a Yearly report
}
