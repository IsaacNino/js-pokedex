//DO NOT FORGET TO MAKE MEANIGUL COMMITS AND LEAVE BEHIND HELPFUL COMMENTS

//the height properties is made up of a number value
//some type properties are enclosed in brackets, to allow multiple values

let pokemonRepository = (function() {
  let pokemonList = [
    { name: 'Ninetails', types: 'Fire', height: 1.1, attack: 76, defense: 75, speed: 100 }, //medium
    { name: 'Beedrill', types: ['Bug', ' Poison'], height: .9, attack: 90, defense: 40, speed: 75 }, //small
    { name: 'Alakazam', types: 'Psychic', height: 1.5, attack: 50, defense: 45, speed: 120 }, //big
    { name: 'Scyther', types: ['Bug', ' Flying'], height: 1.5, attack: 110, defense: 80, speed: 105 }, //big
    { name: 'Kabutops', types: ['Water', ' Rock'], height: 1.3, attack: 115, defense: 105, speed: 80 } //medium
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    //event listenr getting added in for pokemon information
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();


pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});