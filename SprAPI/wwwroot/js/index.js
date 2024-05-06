const url = 'http://localhost:5016/position';

const springerContainer = document.querySelector('.container')
const sprPath = new Array();

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
    return response.json();
  })
  .then(responseList => {
    const pathArray = Object.values(responseList);
    for (let i = 0; i < pathArray.length; i++) {
      //console.log(pathArray[i]);
      sprPath.push(pathArray[i]);
    }
  })

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
  gameField.id = 'gameField';

  for (let i = 0; i < input_length; i++) {
    for (let j = 0; j < input_width; j++) {
      var zelle = document.createElement('div');
      zelle.id = "zelle_" + i + "_" + j;
      zelle.classList.add('zelleStyle');
      gameField.appendChild(zelle);
      //console.log(zelle.id)
    }
  }
  var newColumns = "repeat(" + input_length + ", 55px)";
  var newRows = "repeat(" + input_width + ", 55px)";
  gameField.style.gridTemplateRows = newRows;
  gameField.style.gridTemplateColumns = newColumns;
  oldDiv.parentNode.replaceChild(gameField, oldDiv);

  var id = "zelle_" + inp_startX+ "_" + inp_startY;
  //console.log(id);
  var ersteZelle = document.getElementById(id);
  ersteZelle.classList.add('besucht')

//BEARBEITEN!!!
 var gameFieldChild = document.getElementById('gameField').getElementsByTagName('div');
  for (let p = 0; p < gameFieldChild.length; p++) {
    let newIdZelle = gameFieldChild[p];
    for (let m = 0; m < sprPath.length; m++) {
      newIdZelle.id = sprPath[m];
      zelle.id = newIdZelle.id;
      console.log(zelle.id);
    }
    
  }

  var pathID = zelle.id;
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