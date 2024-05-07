const url = 'http://localhost:5016/position';

const springerContainer = document.querySelector('.container')
let sprPath = [];

//bearbeiten!!!
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
    if (response.ok){
      alert("Der Springer hat den Weg in " + sprLen + " gefunden 🐎")
    } else {
      alert("Da ist kein Weg...")
    }
    console.log(sprPath);
  } catch (error) {
    alert("Es hat ein Fehler aufgetreten", error);
  }
}

 /* fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: position
  })  

  .then(response => {
    if (response.ok){
      alert("Der Springer hat den Weg gefunden 🐎")
    } else {
      alert("Da ist kein Weg...")
    }
    return response.json();
  })

  .then(responseList => {
    const pathArray = Object.values(responseList);
    //console.log(pathArray);
    for (let p = 0; p < pathArray.length; p++) {
      sprPath.push(pathArray[p]);
    }
    console.log(sprPath);
    //console.log(sprPath);
    //console.log(typeof(sprPath));
    // sprPath = pathArray.map(item => item.value);
    // console.log(typeof(sprPath));
    /*for (let i = 0; i < pathArray.length; i++) {
      //console.log(pathArray[i]);
      sprPath.push(pathArray[i]);
    }
    return sprPath;
  })*/

  // .catch(error => alert("Es hat ein Fehler aufgetreten", error))
  // console.log(position);




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

  var gameFieldChild = document.getElementById('gameField').getElementsByTagName('div');
  //const gameFieldChild = Array.from(document.getElementById('gameField'));
  console.log(sprPath);
  console.log(gameFieldChild);
  for (let p = 0; p < gameFieldChild.length; p++) {
    if (p < sprPath.length) { // Stellen Sie sicher, dass p innerhalb des gültigen Bereichs von sprPath liegt
      let newIdZelle = gameFieldChild[p];
      newIdZelle.id = sprPath[p];
      console.log(sprPath[p]);
    } else {
      console.log('Index außerhalb des Bereichs von sprPath');
    }
    /*for (let m = 0; m < sprPath.length; m++) {
      let numID = sprPath[m];
      newIdZelle.id = numID;
      //console.log(newIdZelle.id);
      //zelle.id = newIdZelle.id;
    } 
    //console.log(newIdZelle.id);*/
  }
  console.log(zelle.id);


//BEARBEITEN!!!
 /*var gameFieldChild = document.getElementById('gameField').getElementsByTagName('div');
  for (let p = 0; p < gameFieldChild.length; p++) {
    let newIdZelle = gameFieldChild[p];
    console.log(newIdZelle);
    /*for (let m = 0; m < sprPath.length; m++) {
      let numID = sprPath[m];
      newIdZelle.id = numID;
      //console.log(newIdZelle.id);
      //zelle.id = newIdZelle.id;
    } 
    //console.log(newIdZelle.id);
  }
  var pathID = zelle.id;*/
}

/*function newID() {
  var gameFieldChild = document.getElementById('gameField').getElementsByTagName('div');
  for (let p = 0; p < gameFieldChild.length; p++) {
    let newIdZelle = gameFieldChild[p];
    console.log(newIdZelle);
    newIdZelle.id = sprPath[p];
    console.log(newIdZelle.id);
    /*for (let m = 0; m < sprPath.length; m++) {
      let numID = sprPath[m];
      newIdZelle.id = numID;
      //console.log(newIdZelle.id);
      //zelle.id = newIdZelle.id;
    } 
    //console.log(newIdZelle.id);
  }
}*/

var submitButton = document.getElementById('submit_button');
submitButton.addEventListener('click', async function() {
  await submitInput();
  createNewDiv();
});