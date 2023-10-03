/* - - - DOCUMENT ELEMENTS - - - */
const cardsEl = document.querySelector(".cards");
/* const btn1El = document.querySelector("#btn1");
const btn2El = document.querySelector("#btn2");
const btn3El = document.querySelector("#btn3");
const btn4El = document.querySelector("#btn4");
const btn5El = document.querySelector("#btn5");
const btn6El = document.querySelector("#btn6");
const btn7El = document.querySelector("#btn7");
const btn8El = document.querySelector("#btn8"); */

// URL
const URL = "https://pokeapi.co/api/v2/";

// PATHS
const gen1 = "pokemon?limit=121&offset=0";
/* const gen2 = "pokemon?limit=121&offset=121";
const gen3 = "pokemon?limit=121&offset=242";
const gen4 = "pokemon?limit=121&offset=363";
const gen5 = "pokemon?limit=121&offset=484";
const gen6 = "pokemon?limit=121&offset=605";
const gen7 = "pokemon?limit=121&offset=726";
const gen8 = "pokemon?limit=121&offset=847"; */

/* - - - VARIABLES - - - */
let pokeData = [];

/* - - - FUNCTIONS - - - */
const pokeCards = () => {
  console.log(pokeData);
  const card = pokeData
    .map((pokemon) => {
      return `
    <div class="card">
      <img src="${pokemon.img}" alt="pokemon" />
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

const fetchData = async () => {
  await fetch(URL + gen1)
    .then((res) => res.json())
    .then((data) => {
      const fetches = data.results.map((item) => {
        return fetch(item.url)
          .then((res) => res.json())
          .then((data) => {
            return {
              id: data.id,
              name: data.name,
              img: data.sprites.other["official-artwork"].front_default,
              types: data.types,
            };
          });
      });
      Promise.all(fetches).then((res) => {
        pokeData = res;
        pokeCards();
        // console.log(pokeData);
      });
    });
};

fetchData();

/* - - - EVENT LISTENERS - - - */
/* btn1El.addEventListener("click");
btn2El.addEventListener("click");
btn3El.addEventListener("click");
btn4El.addEventListener("click");
btn5El.addEventListener("click");
btn6El.addEventListener("click");
btn7El.addEventListener("click");
btn8El.addEventListener("click"); */
