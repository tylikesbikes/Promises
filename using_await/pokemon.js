const pkmn = {

    async init() {
        try {
        const loadStatus = document.querySelector('h3');
        loadStatus.innerText='Loading'
        this.listOfPokemon = [];
        let url = 'https://pokeapi.co/api/v2/pokemon/?limit=1279';

        const {data} = await axios.get(`${url}`);
        data.results.forEach(p => this.listOfPokemon.push([p.name, p.url]));
        
        await this.fillChosenPokemonInfo(3);
        
        loadStatus.innerText = '';
        } catch(err) {
            console.log("ERROR: ", err);
        }
    },

    chooseRandomPokemon(howMany) {
        this.chosenPokemonIds = [];

        for (i = 0; i < howMany; i++) {
            let index = Math.floor(Math.random() * this.listOfPokemon.length);
            this.chosenPokemonIds.push(index);
            
        }
        return this.chosenPokemonIds;
    },

    async fillChosenPokemonInfo(howMany) {
        const pokeIds = this.chooseRandomPokemon(howMany);

        this.pokemonDetails = [];

        pokeIds.forEach (async (p) => {
            let url = this.listOfPokemon[p][1];
            let pokemonName = '';
            let species = '';
            let flavorTextEnglish = 'No English flavor text available';
            let picture = '';

            const {data} = await axios.get(`${url}`);
            pokemonName = data.name;
            species = data.species.url;
            picture = data.sprites.front_default;
                
            
            const {data: speciesData} = await axios.get(`${species}`);

            const flavorTextEntriesAll = speciesData.flavor_text_entries;
            flavorTextEntriesAll.forEach(e => {  
                if (e.language.name == 'en') {
                    flavorTextEnglish=e.flavor_text; 
                }
            })
            
            this.pokemonDetails.push({pokemonName, flavorTextEnglish, picture});
        })
    },

    async drawChosenPokemon() {
        
        const pkmn = document.querySelector('#pkmn');
        pkmn.innerHTML = '';
        this.pokemonDetails.forEach(p =>{
        
        pkmn.innerHTML += 
        `
        <div class="col-sm">
            <h3>${p.pokemonName}</h3>
            <img src="${p.picture}">
            <p>${p.flavorTextEnglish}</p>
        </div>
        `;
    })

    },

    async loadPokemon() {
        this.init();
        this.drawChosenPokemon();
        const btn = document.querySelector('button');
        btn.innerText = 'Show me MORE Pokemon!';
    }
}

pkmn.init();