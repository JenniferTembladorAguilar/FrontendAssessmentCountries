
// api url 
const api_url = "https://restcountries.com/v3.1/all";

var allCountries;
async function getApi(url) {
 
    const response = await fetch(url);

    // Store allCountries in JSON 
    this.allCountries  = await response.json();

    console.log(this.allCountries);
    sortTable();
    show(this.allCountries);
}

getApi(api_url);
 

function toggleSort(event){
    
    var isChecked = document.getElementById('checkToggle').checked;
    console.log(isChecked);
    return isChecked;
   
   
}
 
 
function sortTable(){
    
    var isToggleActive = toggleSort(event) ;
     

var allCountriesOrdered;
if(isToggleActive){
    allCountriesOrdered = this.allCountries.sort(function (a, b) {
        if (a.name.official > b.name.official) {
          return 1;
        }
        if (a.name.official < b.name.official) {
          return -1;
        }
         
        return 0;
      });
      show(allCountriesOrdered);
       
}else{
    allCountriesOrdered = this.allCountries.sort(function (a, b) {
        if (a.name.official < b.name.official) {
          return 1;
        }
        if (a.name.official > b.name.official) {
          return -1;
        }
         
        return 0;
      });
      show(allCountriesOrdered);
}  
}  


function show(allCountriesOrdered) {

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

