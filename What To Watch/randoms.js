
const watchModeKey = `f5FR2cFHLSJM7i8v85X4ONnx1NUziXmKD6CaDBtj`

const watchModeTitlesApi = `https://api.watchmode.com/v1/list-titles/?apiKey=` + watchModeKey; //no need for specifications on api due to the need of randomness!


fetch(watchModeTitlesApi)
.then((response) => response.json())
.then((watchModeTitlesData) => {

const titles = [];
watchModeTitlesData.titles.forEach((indTitle) => {
titles.push({ id: indTitle.id, title: indTitle.title, tmdb_id: indTitle.tmdb_id, year: indTitle.year, type: indTitle.type});

document.querySelector('.name').textContent = indTitle.title 
document.querySelector('.year').textContent = "Year: " + indTitle.year;
document.querySelector('.type').textContent = "Type: " + indTitle.type;

})

let rightTitle = titles.find(theTitle => theTitle.title === document.querySelector('.name').textContent);

const watchModeTitleMegaDataApi = `https://api.watchmode.com/v1/title/` + rightTitle.id + `/details/?apiKey=` + watchModeKey;
fetch(watchModeTitleMegaDataApi).then((response) => response.json()).then((watchModeTitleMegaData) => {

document.querySelector('.des').textContent = watchModeTitleMegaData.plot_overview;

document.querySelector('.genre').textContent = "Genre: " + watchModeTitleMegaData.genre_names;

document.querySelector('.card-img').src = watchModeTitleMegaData.poster;

let networkName = watchModeTitleMegaData.network_names; 

const watchModeNetworksApi = `https://api.watchmode.com/v1/sources/?apiKey=` + watchModeKey;

fetch(watchModeNetworksApi).then((response) => response.json()).then((watchModeNetworksData) => {

watchModeNetworksData.forEach((network) => {
console.log(network.name)
if (network.name.includes(networkName)) {

document.querySelector('.network-logo').src = network.logo_100px;
document.querySelector('.network-link').href = network.ios_appstore_url

console.log(network.ios_appstore_url)
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