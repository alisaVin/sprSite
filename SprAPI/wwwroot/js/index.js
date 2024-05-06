﻿const url = 'http://localhost:5016/position';

const springerContainer = document.querySelector('.container')

// function giveOutput() {
//   let input_lenght = document.getElementById('length_x').value;
//   let input_width = document.getElementById('length_x').value;
//   input_lenght = parseInt(input_lenght);
//   input_width = parseInt(input_width);

//   let output = "Der Spielfeld ist " + input_lenght + " x " + input_width + " groß.";
//   document.getElementById('field_output').innerText = output;
// }

//bearbeiten!!!
function submitInput() {

  let input_length = document.getElementById('length_x').value;
  let input_width = input_length;
  let inp_startX = document.getElementById('start_x').value;
  let inp_startY = document.getElementById('start_y').value;

  var position = JSON.stringify(
    {
      "lengthX": input_length,
      "widthY": input_width,
      "startX": inp_startX,
      "startY": inp_startY
    });
    
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: position
  })  

  .then(response => {
    if (response.ok){
      alert("Der Springer hat den Weg in _ Sritte gefunden 🐎")
    } else {
      alert("Da ist kein Weg...")
    }
    const responseList = response.json();
    console.log(responseList);
    /*const responseOutput = response.json();
    const data = responseOutput;
    console.log(data);*/
  })
  /*.then(data => {
    const responseList = data;
    console.log(responseList);
  })*/

  .catch(error => alert("Es hat ein Fehler aufgetreten", error))

  console.log(position);
  
  //response of array
  /*fetch('http://localhost:5016/intlist')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Ausgabe der List<int> in der Browser-Konsole
        // Führen Sie hier weitere Aktionen mit der List<int> durch
    })
    .catch(error => {
        alert('Error:', error);
    });*/
}

function createNewDiv() {

  let input_length = document.getElementById('length_x').value;
  let input_width = input_length;
  let inp_startX = document.getElementById('start_x').value;
  let inp_startY = document.getElementById('start_y').value;
  
  var oldDiv = document.getElementById('field_div');
  var gameField = document.createElement('div');

  for (var i = 0; i < input_length; i++) {
    //gameField.style.gridTemplateColumns('auto');
    for (var j = 0; j < input_width; j++) {
      var zelle = document.createElement('div');
      zelle.id = "zelle_" + i + "_" + j;
      zelle.classList.add('zelleStyle');
      gameField.appendChild(zelle);
      console.log(zelle.id)
    }
  }
  var newColumns = "repeat(" + input_length + ", 55px)";
  var newRows = "repeat(" + input_width + ", 55px)";

  gameField.style.gridTemplateRows = newRows;
  gameField.style.gridTemplateColumns = newColumns;
  gameField.id = "gameField";

  oldDiv.parentNode.replaceChild(gameField, oldDiv);

  var id = "zelle_" + inp_startX+ "_" + inp_startY;
  console.log(id);
  var ersteZelle = document.getElementById(id);
  console.log(ersteZelle);
  ersteZelle.classList.add('besucht')

}

var submitButton = document.getElementById('submit_button');
submitButton.addEventListener('click', function() {
  submitInput();
  createNewDiv();
});
/* async function AsyncGetMoves() {
    const response = await fetch(url);
    const json = await response.json();
    const mydata = json;
    console.log(mydata)
 
    // 3. Generate the Field
    GenerateChessfield()
    // 4. Style Field
    StyleChessfield()
    // 5. Write API Data to the Boxes
    ParseInput(mydata)
}
*/ 