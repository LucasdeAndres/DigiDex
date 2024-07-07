console.log(location.search);

let name = new URLSearchParams(location.search).get("name")

console.log(name);

fetch(`https://digi-api.com/api/v1/digimon/${name}`)
    .then(res => res.json())
    .then(data => {console.log(data)
        let resultsSection = document.querySelector(".detail")
        resultsSection.innerHTML = `<img src="${data.images[0].href}" alt="${data.name}">
        <h2>${data.name}</h2>
        <p class="date" >${data.releaseDate}</p>
        <p>${data.descriptions[1].description}</p>`
    })