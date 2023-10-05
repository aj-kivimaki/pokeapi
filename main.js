/* - - - DOCUMENT ELEMENTS - - - */
const btn1El = document.querySelector("#btn1");
const btn2El = document.querySelector("#btn2");
const btn3El = document.querySelector("#btn3");
const btn4El = document.querySelector("#btn4");
const btn5El = document.querySelector("#btn5");
const btn6El = document.querySelector("#btn6");
const btn7El = document.querySelector("#btn7");
const btn8El = document.querySelector("#btn8");
const btn9El = document.querySelector("#btn9");
const searchEl = document.querySelector("#search");
const cardsEl = document.querySelector(".cards");

// URL
const url = "https://pokeapi.co/api/v2/";

// PATHS
const gen1 = "pokemon?limit=151&offset=0";
const gen2 = "pokemon?limit=100&offset=151";
const gen3 = "pokemon?limit=135&offset=251";
const gen4 = "pokemon?limit=107&offset=386";
const gen5 = "pokemon?limit=156&offset=493";
const gen6 = "pokemon?limit=72&offset=649";
const gen7 = "pokemon?limit=88&offset=721";
const gen8 = "pokemon?limit=96&offset=809";
const gen9 = "pokemon?limit=105&offset=905";

/* - - - VARIABLES - - - */
let pokeData = [];

/* - - - FUNCTIONS - - - */
const pokeCards = (data) => {
  const card = data
    .map((pokemon) => {
      return `
    <div class="card">
      <img src="${pokemon.img}" alt="${pokemon.name}" />
      <h2 class="pokemon-name">${pokemon.name}</h2>
      <div class="id">#${pokemon.id}</div>
      <div class="types">
      ${pokemon.types
        .map((item) => {
          return `<p class="type">${item.type.name}</p>`;
        })
        .join("")}
      </div>
    </div>
    `;
    })
    .join("");
  cardsEl.innerHTML = card;
};

const filterData = (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredPokemons = pokeData.filter((pokemon) => {
    return (
      pokemon.name.startsWith(searchString) ||
      pokemon.id.startsWith(searchString)
    );
  });
  pokeCards(filteredPokemons);
};

const fetchData = async (path) => {
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
btn1El.addEventListener("click", () => fetchData(gen1));
btn2El.addEventListener("click", () => fetchData(gen2));
btn3El.addEventListener("click", () => fetchData(gen3));
btn4El.addEventListener("click", () => fetchData(gen4));
btn5El.addEventListener("click", () => fetchData(gen5));
btn6El.addEventListener("click", () => fetchData(gen6));
btn7El.addEventListener("click", () => fetchData(gen7));
btn8El.addEventListener("click", () => fetchData(gen8));
btn9El.addEventListener("click", () => fetchData(gen9));
searchEl.addEventListener("input", (e) => filterData(e));
