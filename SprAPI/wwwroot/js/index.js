const url = 'http://localhost:5000/position';

const springerContainer = document.querySelector('.container')

// function giveOutput() {
//   let input_lenght = document.getElementById('lenght_x').value;
//   let input_width = document.getElementById('width_y').value;
//   input_lenght = parseInt(input_lenght);
//   input_width = parseInt(input_width);

//   let output = "Der Spielfeld ist " + input_lenght + " x " + input_width + " groß.";
//   document.getElementById('field_output').innerText = output;
// }

//bearbeiten!!!
function submitInput() {

  let input_lenght = document.getElementById('lenght_x').value;
  let input_width = document.getElementById('width_y').value;
  let inp_startX = document.getElementById('start_x').value;
  let inp_startY = document.getElementById('start_y').value;

  var position = JSON.stringify(
    {
      "lengthX": input_lenght,
      "widthY": input_width,
      "startX": inp_startX,
      "startY": inp_startY
    });
    
  fetch('http://localhost:5016/position', {
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
    response.json()
  })

  .catch(error => alert("Es hat ein Fehler aufgetreten", error))

  console.log(position);
}


// 1. DIv leeren
// 2. EInen neuen mit dem Spielfeld hinzufügen
function createNewDiv() {

  let input_lenght = document.getElementById('lenght_x').value;
  let input_width = document.getElementById('width_y').value;
  let inp_startX = document.getElementById('start_x').value;
  let inp_startY = document.getElementById('start_y').value;
  
  var oldDiv = document.getElementById('field_div');
  var gameField = document.createElement('div');
  /*var gameField = document.createElement('table');

  for (var i = 0; i < input_width; i++) {  
    var tr = document.createElement('tr');

    for (var j = 0; j < input_lenght; j++) {
      var td = document.createElement('td');

      tr.appendChild(td);
    }
    gameField.appendChild(tr);
  }

  gameField.id = "gameField";
  //document.body.appendChild(gameField);
  //neuesDiv.innerHTML = "<svg><p>1</p></svg>";*/

  for (var i = 0; i < input_lenght; i++) {
    //gameField.style.gridTemplateColumns('auto');
    for (var j = 0; j < input_width; j++) {
      var zelle = document.createElement('div');
      zelle.id = "zelle_" + i + "_" + j;
      zelle.classList.add('zelleStyle'); 
      gameField.appendChild(zelle);
    }
  }
  var newColumns = "repeat(" + input_lenght + ", 55px)";
  var newRows = "repeat(" + input_width + ", 55px)";

  gameField.style.gridTemplateRows = newRows;
  gameField.style.gridTemplateColumns = newColumns;
  gameField.id = "gameField";

  var id = "zelle_" + inp_startX + "_" + inp_startY;
  var ersteZelle = document.getElementById(id);
  //ersteZelle.style.backgroundColor = "red";

  oldDiv.parentNode.replaceChild(gameField, oldDiv);
}

var submitButton = document.getElementById('submit_button');
submitButton.addEventListener('click', function() {
  submitInput();
  createNewDiv();
});