require('dotenv').config();

///////failed attempt at building a working search bar

const wmApiKey = process.env.wmAPIKEY;

const titleList = document.getElementById('titleList');

const search = document.querySelector('.test-search');

let titles = [];

search.addEventListener('keyup', (event) => {
    // event.preventDefault();

    const theInput = event.target.value.toLowerCase();

    const filteredTitles = titles.filter((title) => {

    return (title.title_results.name.toLowerCase().includes(theInput)); 

    });
    
    displayTitles(filteredTitles);

    const wmSearchApi = `https://api.watchmode.com/v1/search/?apiKey=` + wmApiKey + `&search_field=name&search_value=` + theInput;

    const loadSearchedTitles = async () => {
            const response = await fetch(wmSearchApi);
            let titles = await response.json();
            displayTitles(titles);
            console.log(titles);   
    }

    displayTitles(filteredTitles);

    function displayTitles() {

       const htmlString = titles.forEach((indTitle) => {

            let searched = indTitle.title_results.name;

            let li = document.createElement('li');
            let ul = document.getElementById('titleList');
            ul.append(li)

            li.textContent = searched;
            

        });

        titleList.innerHTML = htmlString;
        
    }

    loadSearchedTitles();

});

