
// api url 
const api_url = "https://restcountries.com/v3.1/all";

 
async function getApi(url) {
	
	
	const response = await fetch(url);
	
	// Store allCountries in JSON 
	var allCountries = await response.json();

	console.log(allCountries);
	if (response) {
		 
	}
	show(allCountries);
}
 
getApi(api_url);

 
 
// Function to define innerHTML for HTML table
function show(allCountries) {
	let tab =
		`<tr>
		<th>Official Name</th>
        <th>Capital</th>
        <th>Region</th>
        <th>Language</th>
        <th>Population</th>
        <th>Flag</th>
		</tr>`;
	
	// Loop to access all rows
	for (let country in allCountries) {
     
     
   
		tab += `<tr>
	<td>${allCountries[country].name.official} </td>
    <td>${allCountries[country].capital} </td>
    <td>${allCountries[country].region} </td>
    <td>${allCountries[country].languages} </td>
    <td>${allCountries[country].population} </td>
    <td><img src="${allCountries[country].flags.png}"> </td>
    
		
</tr>`;
	}
	// Setting innerHTML as tab variable
	document.getElementById("countriesTable").innerHTML = tab;
}
