let date = new Date();

//variables that represent the current month and year on each calendar
let currentMonth1 = date.getMonth();
let currentYear1 = date.getFullYear();
let currentMonth2 = date.getMonth();
let currentYear2 = date.getFullYear();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//dynamicly add days to the calendar 1 depending on the month and year
function loadCalendar1() {
    const monthYear = document.querySelector(".month-year1");
    dayClass = document.querySelector(".day1");

    //day as weekday (monday etc), date as an number
    let firstDayOfMonth = new Date(currentYear1, currentMonth1, 1).getDay();
    let lastDateOfMonth = new Date(currentYear1, currentMonth1 + 1, 0).getDate();
    let lastDateOfPreviousMonth = new Date(currentYear1, currentMonth1, 0).getDate();
    
    let oneDay = "";    //variable that will have the html for each day on the calendar
    let daysOnCalendar = 0; //used to make sure the calendar doesn't have a half-empty last row

    //add days from previous month
    for (let i = firstDayOfMonth-1; i > 0; i--) {
        oneDay += `<li class="notThisMonth">${lastDateOfPreviousMonth - i + 1}</li>`;
        daysOnCalendar++;
    }

    //add days from this month
    for (let i = 1; i <= lastDateOfMonth; i++) {
        oneDay += `<li class="thisMonth1">${i}</li>`;
        daysOnCalendar++;
    }

    //add days from next month if needed
    if (daysOnCalendar % 7!== 0) {
        for (let i = 1; i <= 7 - (daysOnCalendar % 7); i++) {
            oneDay += `<li class="notThisMonth">${i}</li>`;
        }
    }
    
    //update month and year display
    monthYear.innerHTML = `${months[currentMonth1]} ${currentYear1}`;

    //add html of each day to calendar
    dayClass.innerHTML = oneDay;

    thisMonth1 = document.querySelectorAll(".thisMonth1");

    //days from this month can be selected
    thisMonth1.forEach(day => {
        day.addEventListener("click", () => {
           
            //reset so there is only one selected date
            thisMonth1.forEach(day => {
                day.removeAttribute("id");
            });

            //new selected date has id selectedDate1
            day.setAttribute("id", "selectedDate1");

            const selectedDate = new Date(`${currentYear1}-${currentMonth1 + 1}-${day.textContent}`);

            //selected date will be start date stored in localStorage for other functions to use
            localStorage.setItem("startDate", selectedDate);

        });
    }); 
}


//same as for calendar 1 but the selected date represents the end date
function loadCalendar2() {
    const monthYear = document.querySelector(".month-year2");
    dayClass = document.querySelector(".day2");

    let firstDayOfMonth = new Date(currentYear2, currentMonth2, 1).getDay();
    let lastDateOfMonth = new Date(currentYear2, currentMonth2 + 1, 0).getDate();
    let lastDateOfPreviousMonth = new Date(currentYear2, currentMonth2, 0).getDate();
    let oneDay = "";
    let daysOnCalendar = 0;

    for (let i = firstDayOfMonth-1; i > 0; i--) {
        oneDay += `<li class="notThisMonth">${lastDateOfPreviousMonth - i + 1}</li>`;
        daysOnCalendar++;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        oneDay += `<li class="thisMonth2">${i}</li>`;
        daysOnCalendar++;
    }

    if (daysOnCalendar % 7!== 0) {
        for (let i = 1; i <= 7 - (daysOnCalendar % 7); i++) {
            oneDay += `<li class="notThisMonth">${i}</li>`;
        }
    }

    monthYear.innerHTML = `${months[currentMonth2]} ${currentYear2}`;
    dayClass.innerHTML = oneDay;

    thisMonth2 = document.querySelectorAll(".thisMonth2");

    thisMonth2.forEach(day => {
        day.addEventListener("click", () => {
           
            thisMonth2.forEach(day => {
                day.removeAttribute("id");
            });

            day.setAttribute("id", "selectedDate2");

            const selectedDate = new Date(`${currentYear2}-${currentMonth2 + 1}-${day.textContent}`);
            localStorage.setItem("endDate", selectedDate);

        });
    }); 
}

//load both calendars when page is opened/refeshed
loadCalendar1();
loadCalendar2();

//reset local storage
localStorage.setItem("endDate", "");
localStorage.setItem("startDate", "");

arrowIcons1 = document.querySelectorAll(".arrow-icons1 span");
arrowIcons2 = document.querySelectorAll(".arrow-icons2 span");

//adding logic for arrows on the calendar 1, used for changing month and year on that calendar
arrowIcons1.forEach(icon1 => {
    icon1.addEventListener("click", () => {

        //which arrow was clicked, changing global variable
        if (icon1.id === "previous1") {
            currentMonth1 -= 1;
        } else if (icon1.id === "next1") {
            currentMonth1 += 1;	
        }

        //changing the year if needed, months can have index 0(January) to 11(December)
        if (currentMonth1 < 0 || currentMonth1 > 11) {
            date = new Date(currentYear1, currentMonth1);
            currentMonth1 = date.getMonth();
            currentYear1 = date.getFullYear();
        }

        //load calendar with new month (and year)
        loadCalendar1();
    });   
});

//same as for arrows on calendar 1
arrowIcons2.forEach(icon2 => {
    icon2.addEventListener("click", () => {
        if (icon2.id === "previous2") {
            currentMonth2 -= 1;
        } else if (icon2.id === "next2") {
            currentMonth2 += 1;	
        }

        if (currentMonth2 < 0 || currentMonth2 > 11) {
            date = new Date(currentYear2, currentMonth2);
            currentMonth2 = date.getMonth();
            currentYear2 = date.getFullYear();
        }

        loadCalendar2();
    });   
});


//I used this resourse to help me with the calendar:
//https://www.codingnepalweb.com/dynamic-calendar-html-css-javascript/