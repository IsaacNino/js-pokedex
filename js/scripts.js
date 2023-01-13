//DO NOT FORGET TO MAKE MEANIGUL COMMITS AND LEAVE BEHIND HELPFUL COMMENTS

//the height properties is made up of a number value
//some type properties are enclosed in brackets, to allow multiple values

let pokemonList = [
    { name: 'Ninetails', types: 'Fire', height: 1.1, attack: 76, defense: 75, speed: 100}, //medium
    { name: 'Beedrill', types: ['Bug', ' Poison'], height: .9, attack: 90, defense: 40, speed: 75}, //small
    { name: 'Alakazam', types: 'Psychic', height: 1.5, attack: 50, defense: 45, speed: 120}, //big
    { name: 'Scyther', types: ['Bug', ' Flying'], height: 1.5, attack: 110, defense: 80, speed: 105}, //big
    { name: 'Kabutops', types: ['Water', ' Rock'], height: 1.3, attack: 115, defense: 105, speed: 80} //medium
];

//the closing else clause does not need a condition as it assumes reference to the data that has not been pointed to

/*for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height >= 1.5) {
      document.write(pokemonList[i].name + ' ' + '(height: ' + pokemonList[i].height + 'm),' + ' wow! That is a big Pokemon.' + '<br>')
    }
    else if (pokemonList[i].height <=1.4 && pokemonList[i].height >=1) {
      document.write(pokemonList[i].name + ' ' + '(height: ' + pokemonList[i].height + 'm),' + ' that is a meduim Pokemon.' + '<br>')
    }
    else {
       document.write(pokemonList[i].name + ' ' + '(height: ' + pokemonList[i].height + 'm),' + ' that is a small Pokemon.' + '<br>')
    }
};*/

pokemonList.forEach(function(pokemonList) {
  document.write(
    'This is'+ ' ' + pokemonList.name + ',' + ' its height is ' + pokemonList.height + 'm, and its type is ' + pokemonList.types + '. ' 
    + ' I wouldn\'t get too close, as its attack power is ' + pokemonList.attack + ', its defense is ' + pokemonList.defense + ', and its speed is ' 
    + pokemonList.speed + '. ' + '<br>');
});