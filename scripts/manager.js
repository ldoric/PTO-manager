//fetch employes info from api
async function getEmployees(){
	try {
		const res = await fetch("https://jsonplaceholder.typicode.com/users", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})

		const data = await res.json();

        //creating employees array to store the api data
        const employees = [];

        //create employee object for each employee and store it in employees array
        data.forEach(employee => {

            //save needed data
            const employeeObject = {
                id: employee.id,
                name: employee.name,
                email: employee.email,
                ptos: []
            };

            //add object to array
            employees.push(employeeObject);
        });

        //storing employees in local storage, no need to fetch again
        localStorage.setItem("employees", JSON.stringify(employees));

        return employees;
		
	} catch (error) {
		alert(error)
	}
}

function loadEmployeesToSelector() {
    const employeesJSON = localStorage.getItem("employees");

    //if there are no employees in local storage, call getEmployees()
    if (!employeesJSON) {
        getEmployees().then(data => {
            const employees = data;
            const employeeSelector = document.getElementById("employeeSelector");

            //adding each employees as an option to selector
            employees.forEach(employee => {
                const option = document.createElement("option");
                option.value = employee.id;
                option.text =  employee.name;	
                employeeSelector.appendChild(option);
                //every employee will also have a hidden profile container
                createProfileContainer(employee.id);
            });
        });
    } else {
        const employees = JSON.parse(employeesJSON);
        const employeeSelector = document.getElementById("employeeSelector");

        //adding each employee as an option to selector
        employees.forEach(employee => {
            const option = document.createElement("option");
            option.value = employee.id;
            option.text =  employee.name;
            employeeSelector.appendChild(option);
            createProfileContainer(employee.id);
            //if there are employees withh ptos in local storage, load their container
            loadProfileContainer(employee.id);
        });
    }
}

//load employees to selector and create their profiles when page is opened/refreshed
loadEmployeesToSelector();


//create profile container with basic info without ptos
function createProfileContainer(id) {
    const employees = JSON.parse(localStorage.getItem("employees"));
    
    //creating profile container
    const profileContainer = document.createElement("div");
    profileContainer.classList.add("profile-container");
    profileContainer.id = "profile-container-" + id;

    //creating labels for basic info
    const nameLabel = document.createElement("p");
    nameLabel.classList.add("name-label");
    nameLabel.textContent = employees[id - 1].name;
    
    const idLabel = document.createElement("p");
    idLabel.textContent = "Id: "+ id;

    const emailLabel = document.createElement("p");
    emailLabel.textContent = employees[id - 1].email;

    //creating container that will show ptos when they are created
    const ptosContainer = document.createElement("div");
    ptosContainer.id = "ptos-container-" + id;

    //adding everything created to parent profile container
    profileContainer.appendChild(nameLabel);
    profileContainer.appendChild(emailLabel);
    profileContainer.appendChild(idLabel);
    profileContainer.appendChild(ptosContainer);

    //hide the container because there are no ptos to showcase
    profileContainer.style.display = "none";

    document.body.appendChild(profileContainer);
}

//each profile container can have multiple pto containers (for every pto)
function createPtoContainer(startDate, endDate, Id) {

    const currentYear = startDate.getFullYear();
    
    //getting start dates of the seasons in the year when this pto starts
    const spring = new Date(currentYear, 3-1, 21); //-1 because months start form 0
    const summer = new Date(currentYear, 6-1, 21);
    const fall = new Date(currentYear, 9-1, 23);
    const winter = new Date(currentYear, 12-1, 21);
    
    //dependes on the season
    let seasonImg = "";

    //season will be determined by the start date of pto
    if (startDate >= spring && startDate < summer) {
        //spring
        seasonImg = "../images/spring.webp";
    } else if (startDate >= summer && startDate < fall) {
        //summer
        seasonImg = "../images/summer.jpg";
    } else if (startDate >= fall && startDate < winter) {
        //fall
        seasonImg = "https://scx2.b-cdn.net/gfx/news/hires/2020/fall.jpg";
    } else if (startDate >= winter || startDate <= spring) {
        //winter
        seasonImg = "https://hips.hearstapps.com/hmg-prod/images/trees-on-snow-covered-landscape-in-heavy-snow-day-royalty-free-image-1634585533.jpg";
    } 

    //formatting date for display
    startDateFormatted = startDate.toLocaleDateString();
    endDateFormatted = endDate.toLocaleDateString();

    //creating parent pto container
    const ptoContainer = document.createElement("div");
    ptoContainer.classList.add("pto-container");

    //creating background season image element 
    const imageElement = document.createElement("img");
    imageElement.classList.add("pto-image");
    imageElement.src = seasonImg;
    imageElement.alt = "PTO Image";

    //creating pto content container that consists of date range and delete button	
    const ptoContentContainer = document.createElement("div");
    ptoContentContainer.classList.add("pto-content-container");
   
    //creating date range label
    const dateRangeLabel = document.createElement("p");
    dateRangeLabel.textContent = `${startDateFormatted} - ${endDateFormatted}`;
    ptoContentContainer.appendChild(dateRangeLabel);

    //creating delete button
    const deletePTOimg = document.createElement("img");
    deletePTOimg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/1024px-Flat_cross_icon.svg.png";
    deletePTOimg.alt = "deleteImg";
    ptoContentContainer.appendChild(deletePTOimg);

    //with css image goes to the background and the information is displayed on top of it
    ptoContainer.appendChild(imageElement);
    ptoContainer.appendChild(ptoContentContainer);

    //delete button will delete this pto
    deletePTOimg.addEventListener("click", () => {

        const employeesJSON = localStorage.getItem("employees");
        const employees = JSON.parse(employeesJSON);

        //checking if there is really a pto with this date range in local storage, if yes filter it out and save the rest
        employees[Id - 1].ptos = employees[Id - 1].ptos.filter(pto => {
            return !(pto.startDate === startDate.toISOString() && pto.endDate === endDate.toISOString());
        });
        
        //save the updated employees array to local storage
        localStorage.setItem("employees", JSON.stringify(employees));
        
        //reload profile container with updated ptos
        loadProfileContainer(Id);
    });

    return ptoContainer;
}

//add ptos to the profile container
function loadProfileContainer(id){
    const employees = JSON.parse(localStorage.getItem("employees"));

    const profileContainer = document.getElementById("profile-container-" + id);
    const ptosContainer = document.getElementById("ptos-container-" + id);

    //clerning currently displayed ptos
    ptosContainer.innerHTML = "";
    
    //creating pto labels for past, current and future
    //per default hide all labels, later show the ones that are needed
    const pastPtoLabel = document.createElement("p");
    pastPtoLabel.classList.add("pto-label");
    pastPtoLabel.id = "pastPTO" + id;
    pastPtoLabel.textContent = "Past PTO:";
    pastPtoLabel.style.display = "none";

    const currentPtoLabel = document.createElement("p");
    currentPtoLabel.classList.add("pto-label");
    currentPtoLabel.id = "currentPTO" + id;
    currentPtoLabel.textContent = "Current PTO:";
    currentPtoLabel.style.display = "none";

    const futurePtoLabel = document.createElement("p");
    futurePtoLabel.classList.add("pto-label");
    futurePtoLabel.id = "futurePTO" + id;
    futurePtoLabel.textContent = "Future PTO:";
    futurePtoLabel.style.display = "none";

    //adding labels to the container
    ptosContainer.appendChild(pastPtoLabel);
    ptosContainer.appendChild(currentPtoLabel);
    ptosContainer.appendChild(futurePtoLabel);

    //if there are no ptos, hide the whole profile container
    if (employees[id - 1].ptos.length === 0) {
        profileContainer.style.display = "none";
        return;
    }

    //there are some ptos so show the container
    profileContainer.style.display = "";

    //adding ptos to the profile container
    employees[id - 1].ptos.forEach(pto => {

        const startDate = new Date(pto.startDate);
        const endDate = new Date(pto.endDate);

        //creating pto container for every pto
        const ptoContainer = createPtoContainer(startDate, endDate, id);

        const currentDate = new Date();
        
        //adding pto container after the correct label (past, current, future)
        //make sure that label is visible
        if (endDate < currentDate) {

            pastPtoLabel.style.display = "";
            pastPtoLabel.insertAdjacentElement("afterend", ptoContainer);
        } else if (startDate <= currentDate && endDate >= currentDate) {
            
            currentPtoLabel.style.display = "";
            currentPtoLabel.insertAdjacentElement("afterend", ptoContainer);
        } else {
            
            futurePtoLabel.style.display = "";
            futurePtoLabel.insertAdjacentElement("afterend", ptoContainer);
        }


    });
}


const addButton = document.querySelector(".add-button");

//if the input is correct, call addPto()
addButton.addEventListener("click", () => {

    //get the selected employee
    const selectedId = document.getElementById("employeeSelector").value;

    //make sure there is a selected eemployee, start and end date
    //if not, alert, if yes, add new pto
    if (selectedId === "Select Employee") {
        alert("Select an employee.");
    } else if (!localStorage.getItem("startDate")) {
        alert("Select a start date.");
    } else if (!localStorage.getItem("endDate")) {
        alert("Select an end date.");
    } else {
       addPto(selectedId);
    }
});

//add new pto to the selected employee
function addPto(selectedId) {
    const startDate = new Date(localStorage.getItem("startDate"));
    const endDate = new Date(localStorage.getItem("endDate"));

    //make sure start date is before end date, if not, alert
    if (startDate > endDate) {
        alert("Start date must be before end date.");
        return;
    }
    
    const employeesJSON = localStorage.getItem("employees");
    const employees = JSON.parse(employeesJSON);

    //add new pto to the object
    employees[selectedId - 1].ptos.push({
        startDate: startDate,
        endDate: endDate
    });

    //updating local storage with new pto
    localStorage.setItem("employees", JSON.stringify(employees));

    //there should be at least one pto now for this employee, so show the profile container
    loadProfileContainer(selectedId);
}


