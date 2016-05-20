$(document).ready(function () {
  //Initial load of existing animals onto DOM
  getAnimals();

  //Listen for new animal to be input into form
  $('#animalForm').on('submit', postAnimal);

  //Retrieve existing animals from the database and append them to the DOM
  function getAnimals() {
    $.ajax({
      type: 'GET',
      url: '/animals',
      success: function (animals) {
        console.log(animals);
        $('#animalList').empty();
        $('#animalList').append('<tr>' +
          '<th>' + 'Animal Type' + '</th>' +
          '<th>' + 'Quantity' + '</th>' +
          '</tr>');

        animals.forEach(function (animal) {
          $('#animalList').append('<tr>' +
          '<td>' + animal.animal_type + '</td>' +
          '<td>' + animal.quantity + '</td>' +
          '</tr>');
        });
      },
    });
  }

  //Post a new animal to the database from the input form
  function postAnimal(event) {
    event.preventDefault();

    var animalToPost = {};

    $.each($('#animalForm').serializeArray(), function (i, field) {
      animalToPost[field.name] = field.value;
    });

    $.ajax({
      type: 'POST',
      url: '/animals',
      data: animalToPost,
      success: function (data) {
        getAnimals();
      },
    });
  }
});
