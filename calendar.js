//Calendar Demo: Gregory Davis
//Date: 6/28/2015

//Description: Calendar demo using JavaScript and JQuery. Full year and individual 
//month views. Year calendars are clickable to display the selected month. Month date 
//cells are clickable and will display the full date of the day clicked.

//Info: Calendar object and prototype method comes from Scott Andrew LePera's 
//"How to Build a Simple Calendar with JavaScript" tutorial article. 
//blog: http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html

//An excellent tutorial for making a basic calendar. I took this tutorial and just
//built upon it with some JQuery to show some different things you could do with
//the calendars. 

//This project was a chance for me to learn and practice working with calendars.
//I plan to reference it in the future and hopefully someone else will find the
//code useful as a starting point.
//===================================================================================



//Global Variables
//==============================================

// these are labels for the days of the week
cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// these are human-readable month name labels, in order
cal_months_labels = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];

// these are the days of the week for each month, in order
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


// this is the current date
cal_current_date = new Date(); 


//This will be updated everytime we display a singular month view.
cal_month_focus = 0;
cal_year_focus = 0;


//Calendar constructor
//=============================================
function Calendar(month, year) {
  this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
  this.year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
  //this.html = '';
}



Calendar.prototype.generateHTML = function(mark_current_month = true){
    
    //=============== Determine the day the first day of the month starts with ========
        //Create a date object for the first day of the month and year given.
        var firstDay = new Date(this.year, this.month, 1);

        //Query the new Date object for the day of the week, (0-6) 0 = Sunday.
        var startingDay = firstDay.getDay(); 
    //==================================================================================
    
    
    //=========== Number of days in the month ==========================================
        //Check the array using the month integer as the index.
        var monthLength = cal_days_in_month[this.month];

        //Now check if it's a Leap Year
        //Unfortunately Scott Andrew LePera's Web reference to this code is no longer valid.
        //However, a Google search of "determine leap year" or something similar will bring up
        //numerous solutions that are the same as shown here. Google is your friend.
        if (this.month == 1) { // February only!
            if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
                monthLength = 29;
            }
        }
    //=======================================================================================
    
    
    //================ Is Current Month ====================================================
         var currentMonth = false; //Boolean flag used later for checking the day.
         if (cal_current_date.getMonth() === this.month) {
             currentMonth = true;
         } 
   
    
    //======== Start generating the calendar HTML =============================================
    var monthName = cal_months_labels[this.month];
    cal_month_focus = this.month; //Always updtes to last month generated.
    cal_year_focus = this.year;
    
    //======== Add selected-month class if month is the current month =========================
    if (currentMonth && mark_current_month) {
         var html = '<table class="table table-bordered calendar-table selected-month">';     
    } else {
         var html = '<table class="table table-bordered calendar-table">';     
    }
    
    
    //=================== Set month and year title =============================================
    html += '<tr><th class="calendar-title" colspan="7">';
    html +=  monthName + "&nbsp;" + this.year;
    html += '</th></tr>';
    
    //================ Set the days of the week ================================================
    html += '<tr class="calendar-header">';
    for (var i = 0; i <= 6; i++ ){
      html += '<td class="calendar-header-day">';
      html += cal_days_labels[i];
      html += '</td>';
    }
    html += '</tr><tr>';
    
    
    //=========================  Calendar body  ==================================================
    var day = 1;
    
    //Calendar week rows.
    var numRows = Math.ceil((monthLength + startingDay) / 7);
    
    // this loop is for weeks (rows)
    for (var i = 0; i < numRows; i++) {
      // this loop is for weekdays (cells)
      for (var j = 0; j <= 6; j++) { 
        //Check for current day of current month.
        if (currentMonth && (day === cal_current_date.getDate())){
                html += '<td class="calendar-day selected-day">';
            } else {
                html += '<td class="calendar-day">';
            }
        
        if (day <= monthLength && (i > 0 || j >= startingDay)) {
          html += day;
          day++; 
        }
        html += '</td>';
      }
        
      // stop making rows if we've run out of days
      if (day > monthLength) {
        break;
      } else {
        html += '</tr><tr>';
      }
    }

    html += '</tr></table>'; //The End

    return html;
} //============================ End of generateHTML() =====================================




//Generate all 12 months.
function yearView () {
    var i = 0;
    do {
      //Create calendar object for each itteration which will be each month of the year.
      if (i === 0) {
        var cal = new Calendar(i);    
      } else {
        cal = new Calendar(i);    
      }
      
      //Generate the HTML for each ID
      switch (cal_months_labels[i]) {
          case "January":
              $("#cal-jan").html(cal.generateHTML());
              break;
          case "February":
              $("#cal-feb").html(cal.generateHTML());
              break;
          case "March":
              $("#cal-mar").html(cal.generateHTML());
              break;
          case "April":
              $("#cal-april").html(cal.generateHTML());
              break;
          case "May":
              $("#cal-may").html(cal.generateHTML());
              break;
          case "June":
              $("#cal-jun").html(cal.generateHTML());
              break;
          case "July":
              $("#cal-july").html(cal.generateHTML());
              break;
          case "August":
              $("#cal-aug").html(cal.generateHTML());
              break;
          case "September":
              $("#cal-sept").html(cal.generateHTML());
              break;
          case "October":
              $("#cal-oct").html(cal.generateHTML());
              break;
          case "November":
              $("#cal-nov").html(cal.generateHTML());
              break;
          case "December":
              $("#cal-dec").html(cal.generateHTML());
              break;      
      }
        
        
      i++;  
    } while (i <= 11);
    
}


function monthView (month, year) {
    var cal = new Calendar(month, year);  
    $("#cal-month").html(cal.generateHTML(false));  
}




//========= Navigation Click Event Handlers =====================================================

$( "#year-link" ).click(function() {
    $( "#month-view" ).hide();
    $( "#year-view" ).show(); 
    $( "#year-link" ).addClass( "active" );
    $( "#month-link" ).removeClass( "active" );
    //No need to run yearView() again, it's still there hidden. Of course if you plan on using this just before New Year you would just have to refresh the page.
});


$( "#month-link" ).click(function() {
    $( "#year-view" ).hide(); 
    $( "#month-view" ).show();
    $( "#month-link" ).addClass( "active" );
    $( "#year-link" ).removeClass( "active" );
    monthView();
});


//========= Calendar Click Event Handlers =====================================================

$( "#cal-jan" ).click(function() {
    $( "#year-view" ).hide(); 
    $( "#month-view" ).show();
    $( "#year-link" ).removeClass( "active" );
    $( "#month-link" ).addClass( "active" );
    monthView(0); //At the moment we only show calendars for the current year so only a month value is required.
});

$( "#cal-feb" ).click(function() {
    $( "#year-view" ).hide(); 
    $( "#month-view" ).show();
    $( "#year-link" ).removeClass( "active" );
    $( "#month-link" ).addClass( "active" );
    monthView(1);
});

$( "#cal-mar" ).click(function() {
    $( "#year-view" ).hide(); 
    $( "#month-view" ).show();
    $( "#year-link" ).removeClass( "active" );
    $( "#month-link" ).addClass( "active" );
    monthView(2);
});

$( "#cal-april" ).click(function() {
    $( "#year-view" ).hide(); 
    $( "#month-view" ).show();
    $( "#year-link" ).removeClass( "active" );
    $( "#month-link" ).addClass( "active" );
    monthView(3);
});

$( "#cal-may" ).click(function() {
    $( "#year-view" ).hide(); 
    $( "#month-view" ).show();
    $( "#year-link" ).removeClass( "active" );
    $( "#month-link" ).addClass( "active" );
    monthView(4);
});

$( "#cal-jun" ).click(function() {
    $( "#year-view" ).hide(); 
    $( "#month-view" ).show();
    $( "#year-link" ).removeClass( "active" );
    $( "#month-link" ).addClass( "active" );
    monthView(5);
});

$( "#cal-july" ).click(function() {
    $( "#year-view" ).hide(); 
    $( "#month-view" ).show();
    $( "#year-link" ).removeClass( "active" );
    $( "#month-link" ).addClass( "active" );
    monthView(6);
});

$( "#cal-aug" ).click(function() {
    $( "#year-view" ).hide(); 
    $( "#month-view" ).show();
    $( "#year-link" ).removeClass( "active" );
    $( "#month-link" ).addClass( "active" );
    monthView(7);
});

$( "#cal-sept" ).click(function() {
    $( "#year-view" ).hide(); 
    $( "#month-view" ).show();
    $( "#year-link" ).removeClass( "active" );
    $( "#month-link" ).addClass( "active" );
    monthView(8);
});

$( "#cal-oct" ).click(function() {
    $( "#year-view" ).hide(); 
    $( "#month-view" ).show();
    $( "#year-link" ).removeClass( "active" );
    $( "#month-link" ).addClass( "active" );
    monthView(9);
});

$( "#cal-nov" ).click(function() {
    $( "#year-view" ).hide(); 
    $( "#month-view" ).show();
    $( "#year-link" ).removeClass( "active" );
    $( "#month-link" ).addClass( "active" );
    monthView(10);
});

$( "#cal-dec" ).click(function() {
    $( "#year-view" ).hide(); 
    $( "#month-view" ).show();
    $( "#year-link" ).removeClass( "active" );
    $( "#month-link" ).addClass( "active" );
    monthView(11);
});


//========= Last/Next Month Click Event Handlers =====================================================


$( "#last-month" ).click(function() {
    var monthValue = cal_month_focus - 1;
    var yearValue = cal_year_focus;
    if (monthValue < 0) {
        monthValue = 11; 
        yearValue -= 1; 
    } 
    monthView(monthValue, yearValue);
});

$( "#next-month" ).click(function() {
    var monthValue = cal_month_focus + 1;
    var yearValue = cal_year_focus; 
    if (monthValue > 11) {
        monthValue = 0; 
        yearValue += 1; 
    } 
    monthView(monthValue, yearValue);
});




//Just to prove that table cells can reached.
$("#month-view").on("click", "td", function() {
    var message = "The date is: " +  cal_months_labels[cal_month_focus] + " " + $(this).text() + ", " + cal_year_focus;
    alert(message);
});








