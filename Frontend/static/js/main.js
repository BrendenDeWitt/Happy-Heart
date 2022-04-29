// global variable that will keep track of the total number of records
var count = 1;

function showResult()
{
	// variable to get the inputted systolic value
	var sys = document.getElementById("sysPress").value;
	// variable to get the inputted diastolic value
	var dia = document.getElementById("diaPress").value;
	
	// variables to get the day, month, and year and a variable to store them as a date
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	
	// if statement to check if the count variable is currently in local storage and update it
	if (localStorage.getItem('count') === null)
	{
		count = 1;
		window.localStorage.setItem('count', JSON.stringify(count));
	}
	else if (count >= 2)
	{
		window.localStorage.setItem('count', JSON.stringify(count));
	}
	else
	{
		count = JSON.parse(localStorage.getItem('count'));
	}
	
	// if statement to check the given systolic and diastolic values and create a variable to store the result
	if (sys < 120 && dia < 80)
	{
		var result = "Normal Blood Pressure";
	}
	else if(sys > 119 && sys < 130 && dia < 80)
	{
		var result = "Elevated Blood Pressure";
	}
	else if(sys > 129 && sys < 140 || dia > 79 && dia < 90)
	{
		var result = "Stage I High Blood Pressure";
	}
	else if(sys > 139 && sys < 180 || dia > 89 && dia < 120)
	{
		var result = "Stage II High Blood Pressure";
	}
	else if(sys > 179 || dia > 119)
	{
		var result = "Hypertensive Crisis(emergency care is required)";
	}
	
	// stores the systolic, diastolic, date , and result that will be printed out to the home webpage
	let data =
		'\r Systolic: ' + sys + '\r\n ' +
		', Diastolic: ' + dia + '\r\n ' +
		', Date: ' + today + '\r\n ' +
		', Result: ' + result;
	// stores the id, systolic, diastolic, date , and result to be stores in local storage
	const info = {
		Id: count,
		Systolic: sys,
		Diastolic: dia,
		date: today,
		Result: result,
	}
	// stores the const info into local storage with the key as the current global count variable
	window.localStorage.setItem(count, JSON.stringify(info));
	// increments count for the next result
	count++;
	// updates the count variable in local storage
	window.localStorage.setItem('count', JSON.stringify(count));
	// outputs the all the data into the home webpage
	document.getElementById("result").innerHTML = data;
}

function displayAll()
{
	// updates the global count variable with the count from local storage
	count = JSON.parse(localStorage.getItem('count'));
	// for loop that goes through the local storage and prints out all the results into records webpage
	for (var i = 1; i < count; i++)
	{
		// creates a variable to store the systolic that has been parsed from local storage
		var sys = JSON.parse(localStorage.getItem(i)).Systolic;
		// creates a variable to store the diastolic that has been parsed from local storage
		var dia = JSON.parse(localStorage.getItem(i)).Diastolic;
		// creates a variable to store the date that has been parsed from local storage
		var date = JSON.parse(localStorage.getItem(i)).date;
		// creates a variable to store the result that has been parsed from local storage
		var result = JSON.parse(localStorage.getItem(i)).Result;
		// prints all the variables into the records homepage
		document.getElementById("allResults").innerHTML += "Systolic: " + sys + ", Diastolic: " + dia +  ", Date: " + date +  ", Result: " + result + "<br>";
	}
}

function deleteAll()
{
	// if statement to ask confirmation if the user wants to delete all records
	if (confirm("Are you sure you want to delete all data?") == true) {
		// clears the local storage
		localStorage.clear();
	}
}
