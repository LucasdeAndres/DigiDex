let digiName = new URLSearchParams(location.search).get("name")
let year = new URLSearchParams(location.search).get("year")
let level = new URLSearchParams(location.search).get("level")

console.log(digiName);
console.log(year);
console.log(level);

fetch("https://digi-api.com/api/v1/digimon")
    .then(res => res.json())
    .then(data => {console.log(data)
         let resultsSection = document.querySelector(".results")
        let newDigimonList = []
        let digimonList = []
            for(let i = 1; i <= data.pageable.totalElements; i ++ ){
                fetch(`https://digi-api.com/api/v1/digimon/${i}`)
                .then(res => res.json())
                .then(data => {
                    if(data.descriptions.length != 0 && data.descriptions[0]?.origin == "reference_book" ){
                        digimonList.push(data)  
                    }else {
                        console.log(data);
                    }
                    
                })
                
            }
        
            
        
            function filtroName(array) {
                return array.filter(function(digimon) {
                    return digimon.name.includes(digiName);
                });
            }
            
            function filtroYear(array) {
                return array.filter(function(digimon) {
                    return digimon.releaseDate == year;
                });
            }
            
            function filtroLevel(array) {
                return array.filter(function(digimon) {
                    return digimon.levels[0]?.level == level;
                });
            }
            
 


       
        function renderDigiCards() {
            
            let filteredDigimonList = digimonList;

            if (digiName != '') {
                filteredDigimonList = filtroName(filteredDigimonList);
            }
            
            if (year != '') {
                filteredDigimonList = filtroYear(filteredDigimonList);
            }
            
            if (level != '') {
                filteredDigimonList = filtroLevel(filteredDigimonList);
            }
            
            newDigimonList = filteredDigimonList;

            console.log(newDigimonList);

            if (newDigimonList.length == 0) {
                resultsSection.innerHTML = "Sorry nigga, aca no se encontro nada" 
            }else {
                let digiRender = ''
                for(let i = 0; i < newDigimonList.length; i++){
                    digiRender += `<a href="./detalle.html?name=${newDigimonList[i].name}" >
                    <article class="digiCard ${newDigimonList[i].name}">
                    <img src="${newDigimonList[i].images[0].href}" alt="${newDigimonList[i].name}" >
                    <h3>${newDigimonList[i].name}</h3>
                </article>
                </a>`
                }
                resultsSection.innerHTML = digiRender
            }



        }

        setTimeout(renderDigiCards, 1000)
        

    }

)
    .catch(err => console.log(err))