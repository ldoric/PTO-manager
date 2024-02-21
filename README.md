# PTO Manager


Features:
- Sign-in system that validates input data (password must have 8 characters, 1 special character, etc.).
- Use of a cookie for sign-in.
- No database connection; if input is valid, you proceed to the manager page.
- When closing the browser or clicking sign-off, all data (local storage) is cleared.
- On the manager page, there are two calendars, an employee selector, and an "add PTO" button.
- Calendars are custom-made; by default, they display the current month, but you can change the month with arrow icons.
- On the calendars, you can select a date; the first calendar represents the start date, and the second calendar is for the end date.
- Employees are fetched from the API and loaded into selectors as options.
- When correctly selected, clicking "add PTO" assigns the selected employee a new PTO.
- Employees are stored in local storage, and all their PTOs are saved with them.
- When an employee has a PTO, their profile container is displayed with all their PTOs.
- PTOs are displayed with information about the time (past, current, or future PTO) and a background image depending on the season.
- Every PTO has a delete button that removes it from local storage.
- Data is not lost when refreshing the page; if there are PTOs in local storage, they will be displayed.

Created as a project for my Programming for the Internet class at FESB.
