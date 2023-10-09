/* - - - DOCUMENT ELEMENTS - - - */
const btnEls = document.querySelectorAll(".btn");
const searchEl = document.querySelector("#js-search");
const cardsEl = document.querySelector("#js-cards");
const infoEl = document.querySelector("#js-info");

// URL
const url = "https://pokeapi.co/api/v2";

/* - - - VARIABLES - - - */
let pokeData = [];
const offsets = [0, 151, 251, 386, 493, 649, 721, 809, 905];

/* - - - FUNCTIONS - - - */
const pokeCards = (data) => {
  const card = data
    .map((pokemon) => {
      return `
    <div class="card">
      <div class="id">#${pokemon.id}</div>
      <img class="pokemon-img" src="${pokemon.img}" alt="${pokemon.name}" />
      <div class="types characteristics-container">
      ${pokemon.types
        .map((item) => {
          return `<div class="icons">
          <img class="icon" title="${item.type.name}" src="/icons/${item.type.name}.svg" alt="${item.type.name}">
          </div>`;
        })
        .join("")}
      </div>
      <h2 class="pokemon-name">${pokemon.name}</h2>
      <div class="measurements characteristics-container">
        <p class="measurement">${pokemon.height * 10} cm</p>
        <p class="measurement">${pokemon.weight / 10} kg</p>
      </div>
    </div>
    `;
    })
    .join("");
  cardsEl.innerHTML = card;
};

const displayGenInfo = (genNumber, pokemonAmount) => {
  const info = `There are ${pokemonAmount} pokemons in generation ${genNumber}`;
  infoEl.textContent = info;
};

const filterData = (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredPokemons = pokeData.filter((pokemon) => {
    for (const item of pokemon.types) {
      if (item.type.name.startsWith(searchString)) return true;
    }
    return pokemon.name.startsWith(searchString) || pokemon.id === searchString;
  });
  pokeCards(filteredPokemons);
};

const fetchGen = async (e) => {
  // get the generation number from the button value
  const genNumber = e.target.value;
  const path = `/generation/${genNumber}`;

  // get the amount of pokemons
  await fetch(url + path)
    .then((res) => res.json())
    .then((data) => {
      const genData = {
        pokemonAmount: data.pokemon_species.length,
      };

      displayGenInfo(genNumber, genData.pokemonAmount);
      fetchData(genNumber, genData.pokemonAmount);
    });
};

const fetchData = async (gen, pokemonAmount) => {
  const offset = offsets[gen - 1];
  const path = `/pokemon?limit=${pokemonAmount}&offset=${offset}`;

  await fetch(url + path)
    .then((res) => res.json())
    .then((data) => {
      const fetches = data.results.map((item) => {
        return fetch(item.url)
          .then((res) => res.json())
          .then((data) => {
            return {
              id: String(data.id),
              name: data.name,
              img: data.sprites.other["official-artwork"].front_default,
              types: data.types,
              weight: data.weight,
              height: data.height,
            };
          });
      });

      Promise.all(fetches).then((res) => {
        pokeData = res;
        pokeCards(pokeData);
      });
    });
};

/* - - - EVENT LISTENERS - - - */
btnEls.forEach((btn) => btn.addEventListener("click", (e) => fetchGen(e)));
searchEl.addEventListener("input", (e) => filterData(e));
