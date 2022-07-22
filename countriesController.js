
// api url 
const api_url = "https://restcountries.com/v3.1/all";


async function getApi(url) {


    const response = await fetch(url);

    // Store allCountries in JSON 
    var allCountries = await response.json();

    console.log(allCountries);
 
    show(allCountries);
}

getApi(api_url);


 
  
function show(allCountries) {

   var allCountriesOrdered = allCountries.sort(function (a, b) {
        if (a.name.official > b.name.official) {
          return 1;
        }
        if (a.name.official < b.name.official) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });



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
    for (let country in allCountriesOrdered) {
         
        var valuesLanguage;
        if (allCountriesOrdered[country].languages) {
            valuesLanguage = Object.values(allCountriesOrdered[country].languages);
            console.log(valuesLanguage);
        } else {
            valuesLanguage = 'No Language to display';
        }

        var valuesCapital;
        if (allCountriesOrdered[country].capital) {
            valuesCapital = allCountriesOrdered[country].capital;
        } else {
            valuesCapital = 'No Capital';

        }


        tab += `<tr>
	<td>${allCountriesOrdered[country].name.official} </td>
    <td>${valuesCapital} </td>
    <td>${allCountriesOrdered[country].region} </td>
    <td>${valuesLanguage} </td>
    <td>${allCountriesOrdered[country].population} </td>
    <td><img src="${allCountriesOrdered[country].flags.png}"> </td>
    
		
</tr>`;
    }
    
    document.getElementById("countriesTable").innerHTML = tab;

    
}
