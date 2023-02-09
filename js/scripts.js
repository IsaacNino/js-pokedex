let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    }
  }
  
  function getAll() {
    return pokemonList;
  }
  
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    button.setAttribute("data-toggle","modal");
    button.setAttribute("data-target", "#exampleModal");
    listItem.appendChild(button);
    listItem.classList.add("group-list-item");
    pokemonList.appendChild(listItem);
    //event listener getting added in for pokemon information
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function(){
      let modalTitle = document.querySelector('.modal-title');
      let modalBody =document.querySelector('.modal-body')
      
        modalTitle.innerHTML = '';
        modalBody.innerHTML = '';

        let modalText = document.createElement('div');
        modalText.classList.add('modal-text');
      
        let sprite = document.createElement('img');
        sprite.classList.add('sprite');
        sprite.src = item.imageUrl;
      
        let heightElement = document.createElement('p');
        heightElement.innerText = "Height:" + item.height + " m" ;

        let typesElement = document.createElement('p');
        typesElement.innerText = "Types: " + item.types;

        modalBody.appendChild(sprite);
        modalBody.appendChild(modalText);
        modalText.appendChild(heightElement);
        modalText.appendChild(typesElement);
        modalText.appendChild(abilitiesElement);
      
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalTitle.classList.contains('is-visible')){
          hideModal();
        }
      });
      
      modalTitle.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
      
      document.querySelector(".pokemon-button").addEventListener("click", () =>{
        showDetails('Modal Body', 'Modal Text');
        
      });
      
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});