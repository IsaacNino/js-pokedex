//DO NOT FORGET TO MAKE MEANIGUL COMMITS AND LEAVE BEHIND HELPFUL COMMENTS

//the height properties is made up of a number value
//some type properties are enclosed in brackets, to allow multiple values

let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
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
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    listItem.appendChild(button);
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
      let modalContainer = document.querySelector('#modal-container');
      
        modalContainer.innerHTML = '';
      
        let modal = document.createElement('div');
        modal.classList.add('modal');
      
        let sprite = document.createElement('img');
        sprite.classList.add('sprite');
        sprite.src = item.imageUrl;
      
        let closeButton = document.createElement('button');
        closeButton.classList.add('close-modal');
        closeButton.innerText = 'X';
        closeButton.addEventListener('click', hideModal);
      
        let modalTitle = document.createElement('h2');
        modalTitle.innerText = item.name;
      
        let modalContent = document.createElement('p');
        modalContent.innerText = (item.name + '\'s height is ' +  item.height + 'm! ');
      
        modal.appendChild(closeButton);
        modal.appendChild(modalTitle);
        modal.appendChild(modalContent);
        modal.appendChild(sprite);
        modalContainer.appendChild(modal);
      
        
        modalContainer.classList.add('is-visible');
      
      function hideModal () {
        modalContainer.classList.remove('is-visible');
      }
      
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
          hideModal();
        }
      });
      
      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
      
      document.querySelector(".pokemon-button").addEventListener("click", () =>{
        showDetails('Modal Title', 'Modal Content');
        
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