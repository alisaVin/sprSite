const url = 'http://localhost:5016/position';

const springerContainer = document.querySelector('.container');
const loader = document.querySelector('.loading');
const overlay = document.getElementById('overlay');
const loading = document.getElementById('loadingAnimation');
let sprPath = [];


async function submitInput() {

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
    
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: position
    });

    if (!response.ok) {
      throw new Error("Es hat ein Fehler aufgetreten");
    }

    const responseList = await response.json();
    const pathArray = Object.values(responseList);
    sprPath.push(...pathArray); 

    let sprLen = sprPath.length - 1;
    if (response.ok && sprLen > 0){
      alert("Der Springer hat den Weg in " + sprLen + " Schritten gefunden 🐎")
    } else if (response.ok && sprLen < 0) {
      alert("Da ist kein Weg...")
    }
    else {
      alert("Da ist kein Weg...")
    }
    console.log(sprPath);
    
  } catch (error) {
    alert("Es hat ein Fehler aufgetreten", error);
  }
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
    }
  }

  var newColumns = "repeat(" + input_length + ", 55px)";
  var newRows = "repeat(" + input_width + ", 55px)";
  gameField.style.gridTemplateRows = newRows;
  gameField.style.gridTemplateColumns = newColumns;
  oldDiv.parentNode.replaceChild(gameField, oldDiv);

  var id = "zelle_" + inp_startX+ "_" + inp_startY;
  var ersteZelle = document.getElementById(id);
  ersteZelle.classList.add('besucht')

  var gameFieldChild = document.getElementById('gameField').getElementsByTagName('div');
  for (let p = 0; p < gameFieldChild.length; p++) {
    if (p < sprPath.length) { 
      let newIdZelle = gameFieldChild[p];
      newIdZelle.id = sprPath[p];
    } else {
      console.log('Index außerhalb des Bereichs von sprPath');
    }
  }

  for (let s = 0; s < gameFieldChild.length; s++) {
    let blaueZelle = document.getElementById(s);
    setTimeout(() => {
      blaueZelle.classList.add('besucht');
      blaueZelle.innerHTML = '<h4>' + s + ' &#128052;</h4>';
    }, 600 * (s + 1));
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var submitButton = document.getElementById('submit_button');
  submitButton.addEventListener('click', async function() {
    overlay.style.display = 'block';
    loading.style.display = 'block';
    await submitInput();
    loading.style.display = 'none';
    overlay.style.display = 'none';
    createNewDiv();
  });
});