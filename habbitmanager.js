function main() {
  var sheetName = "planned"; // Change this to the name of your sheet
  var recipientEmail = "example@gmail.com" // Change this to your recipient email

  // Retrieve calendars name from sheet.
  calendars = getRowAsList(1, sheetName);

  // Retrieve planned data from the sheet.
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

function getFirstHourOfCurrentWeek() {
  var today = new Date();
  var dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  var daysToMonday = 1 - dayOfWeek; // Calculate how many days until Monday
  var firstDayOfCurrentWeek = new Date(today);
  firstDayOfCurrentWeek.setDate(today.getDate() + daysToMonday);
  
  // Set the time to 00:00:00 for the first hour of the day
  firstDayOfCurrentWeek.setHours(0, 0, 0, 0);
  
  return firstDayOfCurrentWeek;
}

function createChart(calendars, planneds, actuals) {
  var sampleData = Charts.newDataTable()
    .addColumn(Charts.ColumnType.STRING, "Activity")
    .addColumn(Charts.ColumnType.NUMBER, "Planned")
    .addColumn(Charts.ColumnType.NUMBER, "Actual");

  // Create a loop to add data rows dynamically
  for (var i = 0; i < calendars.length; i++) {
    sampleData.addRow([calendars[i], planneds[i], actuals[i]]);
  }

  var chart = Charts.newColumnChart()
    .setTitle('Weekly report of Morteza activity in week '+ getCurrentWeekNumber() +' of the year '+ getCurrentYearAsString())
    .setXAxisTitle('Activity')
    .setYAxisTitle('Amount (Minutes)')
    .setDimensions(800, 400)
    .setDataTable(sampleData)
    .build();
    return chart;
}


function getCurrentWeekNumber() {
  var currentDate = new Date();
  var weekNumber = Utilities.formatDate(currentDate, Session.getScriptTimeZone(), 'w');
  return parseInt(weekNumber);
}

function getCurrentYearAsString() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  return currentYear.toString();
}


function sendChartByEmail(chart,recipientEmail) {

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

  MailApp.sendEmail({
    to: recipientEmail,
    subject: subject,
    body: message,
    attachments: [attachment]
  });
}
