

fetch("https://digi-api.com/api/v1/digimon?pageSize=20")
    .then(res => res.json())
    .then(data => {console.log(data)
         let resultsSection = document.querySelector(".results")
        let digimonListPages = []
        let digimonList = []
            for(let i = 1; i <= data.pageable.totalElements; i ++ ){
                fetch(`https://digi-api.com/api/v1/digimon/${i}`)
                .then(res => res.json())
                .then(data => {
                    if(data.descriptions.length == 0 || data.descriptions[0].origin != "reference_book" ){
                        console.log(data);    
                    }else if (digimonList.length < 50) {
                        digimonList.push(data)
                    }else {
                        digimonListPages.push(digimonList)
                        digimonList = []
                        digimonList.push(data)
                    }
                    console.log(digimonListPages.length);
                })
                console.log(digimonListPages.length);
            }
        

        console.log(digimonListPages);

       
        function renderDigiCards() {
            let digiRender = ''
            for(let i = 0; i < digimonListPages[0].length; i++){
                digiRender += `<a href="./detalle.html?name=${digimonListPages[0][i].name}" >
                <article class="digiCard ${digimonListPages[0][i].name}">
                <img src="${digimonListPages[0][i].images[0].href}" alt="${digimonListPages[0][i].name}" >
                <h3>${digimonListPages[0][i].name}</h3>
            </article>
            </a>`
            }
            resultsSection.innerHTML = digiRender
        }

        setTimeout(renderDigiCards, 1000)
        

    }

)
    .catch(err => console.log(err))