$(document).ready(function () {

  getAnimals();

  $('#animalForm').on('submit', postAnimal);

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
