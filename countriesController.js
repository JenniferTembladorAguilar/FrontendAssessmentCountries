
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



 
function show(allCountries) {
    let tab =
        `<tr>
		<th>OFFICIAL NAME</th>
        <th>CAPITAL</th>
        <th>REGION</th>
        <th>LANGUAGE</th>
        <th>POPULATION</th>
        <th>FLAG</th>
		</tr>`;

    // Loop 
    for (let country in allCountries) {

        var valuesLanguage;
        if (allCountries[country].languages) {
            valuesLanguage = Object.values(allCountries[country].languages);
            console.log(valuesLanguage);
        } else {
            valuesLanguage = 'No Language to display';
        }

        var valuesCapital;
        if (allCountries[country].capital) {
            valuesCapital = allCountries[country].capital;
        } else {
            valuesCapital = 'No Capital';

        }


        tab += `<tr>
	<td>${allCountries[country].name.official} </td>
    <td>${valuesCapital} </td>
    <td>${allCountries[country].region} </td>
    <td>${valuesLanguage} </td>
    <td>${allCountries[country].population} </td>
    <td><img src="${allCountries[country].flags.png}"> </td>
    
		
</tr>`;
    }
     
    document.getElementById("countriesTable").innerHTML = tab;
}
