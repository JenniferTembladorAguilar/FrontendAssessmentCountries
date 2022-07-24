
// api url 
const api_url = "https://restcountries.com/v3.1/all";
var apiWiki_url = "https://en.wikipedia.org/api/rest_v1/page/summary/";
var allCountries;
var allCountriesWiki;
var allCountriesPaginated=[];

async function getApiWikipedia(url) {
    const response = await fetch(url);
    this.allCountriesWiki = await response.json();
    console.log(this.allCountriesWiki.extract_html);

    return this.allCountriesWiki.extract_html;
}


async function getApi(url) {

    const response = await fetch(url);

    // Store allCountries in JSON 
    this.allCountries = await response.json();

    console.log(this.allCountries);
    sortTable();
    //show(this.allCountries);
}



getApi(api_url);


function toggleSort(event) {

    var isChecked = document.getElementById('checkToggle').checked;
    console.log(isChecked);
    return isChecked;


}


function sortTable() {

    var isToggleActive = toggleSort();


    var allCountriesOrdered;
    if (isToggleActive) {
        allCountriesOrdered = this.allCountries.sort(function (a, b) {
            if (a.name.official > b.name.official) {
                return 1;
            }
            if (a.name.official < b.name.official) {
                return -1;
            }

            return 0;
        });
        paginator(allCountriesOrdered);
        show(1);

    } else {
        allCountriesOrdered = this.allCountries.sort(function (a, b) {
            if (a.name.official < b.name.official) {
                return 1;
            }
            if (a.name.official > b.name.official) {
                return -1;
            }

            return 0;
        });
        paginator(allCountriesOrdered);
        show(1);
    }
}

function getPicklistValue(event){
   sortTable();

}

function paginator(allCountriesOrdered){
    allCountriesPaginated=[];
    var buttonPage = "";
    let currentCountryPosition = 0;
    let rowsPerPage =  parseInt(document.getElementById("rowsDisplayed").value);
     
    //create pages 
    for (let i = 0; i < Math.ceil(allCountriesOrdered.length / rowsPerPage); i++) {
        
        let rows="";
        
        //identify last position page 
        let lastPosition = ((currentCountryPosition + rowsPerPage) > allCountriesOrdered.length) ? allCountriesOrdered.length : currentCountryPosition + rowsPerPage;
        console.log("----------------------"+lastPosition);
        for (; currentCountryPosition < lastPosition; currentCountryPosition++) {
            var valuesLanguage;
            if (allCountriesOrdered[currentCountryPosition].languages) {
                valuesLanguage = Object.values(allCountriesOrdered[currentCountryPosition].languages);
                console.log(valuesLanguage);
            } else {
                valuesLanguage = 'No Language to display';
            }

            var valuesCapital;
            if (allCountriesOrdered[currentCountryPosition].capital) {
                valuesCapital = allCountriesOrdered[currentCountryPosition].capital;
            } else {
                valuesCapital = 'No Capital';

            }

            rows += `<tr onclick="createModal(this)" id=${allCountriesOrdered[currentCountryPosition].name.common}>
                    <td>${allCountriesOrdered[currentCountryPosition].name.official} </td>
                    <td>${valuesCapital} </td>
                    <td>${allCountriesOrdered[currentCountryPosition].region} </td>
                    <td>${valuesLanguage} </td>
                    <td>${allCountriesOrdered[currentCountryPosition].population} </td>
                    <td><img src="${allCountriesOrdered[currentCountryPosition].flags.png}"> </td>
                    </tr>`;
        }
         
        allCountriesPaginated[i]=rows;

       buttonPage+= `<th><button onclick=getButtonPageClicked(this) id=${i+1} >Page ${i+1}</button></th>` 
     
        
    }
    document.getElementById("buttonPageTable").innerHTML = buttonPage;

}

function show(pageNumber=1) {
    let tab =
        `<tr>
    <th>OFFICIAL NAME</th>
    <th>CAPITAL</th>
    <th>REGION</th>
    <th>LANGUAGE</th>
    <th>POPULATION</th>
    <th>FLAG</th>
    </tr>`;
    
    tab+=allCountriesPaginated[pageNumber-1];
    //console.log('lenght all aocuntries '+allCountriesOrdered.length);


    // Loop 
    /*for (let country in allCountriesOrdered) {

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


        tab += `<tr onclick="createModal(this)" id=${allCountriesOrdered[country].name.common}>
    <td>${allCountriesOrdered[country].name.official} </td>
    <td>${valuesCapital} </td>
    <td>${allCountriesOrdered[country].region} </td>
    <td>${valuesLanguage} </td>
    <td>${allCountriesOrdered[country].population} </td>
    <td><img src="${allCountriesOrdered[country].flags.png}"> </td>
    </tr>`;
    }
*/
    document.getElementById("countriesTable").innerHTML = tab;

}

// instanciate new modal
async function createModal(event) {
    var commonName = event.id;
    console.log(commonName);
    var modalContent = await getApiWikipedia(this.apiWiki_url + commonName);
    console.log(modalContent);
    var modalToDisplay = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
    });

    modalToDisplay.setContent('<h1>' + commonName + '</h1>');
    modalToDisplay.setFooterContent('<p>' + modalContent + '</p>');
    modalToDisplay.open();


}


function getButtonPageClicked(event){
    console.log(event.id);
    show(parseInt(event.id));
}









