

const watchModeKey = `f5FR2cFHLSJM7i8v85X4ONnx1NUziXmKD6CaDBtj`;
//api address for fetch 
const watchModeTitlesApi = `https://api.watchmode.com/v1/list-titles/?apiKey=` + watchModeKey + `&genres=1`; //api specifically for genre data


fetch(watchModeTitlesApi) 
.then((response) => response.json())
.then((watchModeTitlesData) => {

const titles = []; //deconstructing received api data into a new array
watchModeTitlesData.titles.forEach((indTitle) => {
titles.push({ id: indTitle.id, title: indTitle.title, tmdb_id: indTitle.tmdb_id, year: indTitle.year, type: indTitle.type});

document.querySelector('.name').textContent = indTitle.title 
document.querySelector('.year').textContent = "Year: " + indTitle.year; //DOM manipulation; setting the textContent to equal certain elements on the page
document.querySelector('.type').textContent = "Type: " + indTitle.type;

}) //this function gathers the description data of specific title. the id will be used to gather other specific data with other apis

let rightTitle = titles.find(theTitle => theTitle.title === document.querySelector('.name').textContent); 
//making sure that the titiles dont get mixed up and i get the specific data from each title. this step could 
//be considered unnecesary

//in the function below we gain access to more pieces of information to use on our website with the use of the id
//Do to the fact that all of these variables are in local scope I continued fetching for more data within the same function

const watchModeTitleMegaDataApi = `https://api.watchmode.com/v1/title/` + rightTitle.id + `/details/?apiKey=` + watchModeKey; //this api requires individual ids and fetches data per title
fetch(watchModeTitleMegaDataApi).then((response) => response.json()).then((watchModeTitleMegaData) => { //now we have access to all of the data we want of specific title of a specific genre

document.querySelector('.des').textContent = watchModeTitleMegaData.plot_overview; 

document.querySelector('.genre').textContent = "Genre: " + watchModeTitleMegaData.genre_names; 

document.querySelector('.card-img').src = watchModeTitleMegaData.poster; //grabbing picture item from data

//using data gathered to display content on What To Watch generated movie suggestions

let networkName = watchModeTitleMegaData.network_names; //now, we begin the process of getting the user direct access to view this content with links to the platforms!

const watchModeNetworksApi = `https://api.watchmode.com/v1/sources/?apiKey=` + watchModeKey; //this api provides individual network data

fetch(watchModeNetworksApi).then((response) => response.json()).then((watchModeNetworksData) => {

watchModeNetworksData.forEach((network) => { //function to seperate the networks individually

if (network.name.includes(networkName)) { //if statement confirms network name of fetched data indeed matches network name of the specific title

document.querySelector('.network-logo').src = network.logo_100px; //network name match found, displaying logo & direct link to watch the content on What To Watch
document.querySelector('.network-link').href = network.ios_appstore_url; 

}
}).catch((error) => {
console.log(error);
})
})

})
.catch((error) => {
console.log(error);
}) 
}).catch((error) => {
console.log(error);
})