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
      alert("Der Springer läft 🐎")
    } else {
      alert("Die Anfrage ist ungültig")
    }
    response.json()
  })

  .catch(error => alert("Es hat ein Fehler aufgetreten", error))

  console.log(position);
  
/* 
 .then(response => {
    if (response.ok){
      alert("Der Springer läft 🐎")
    } else {
      alert("Die Anfrage ist ungültig")
    }
    response.json()
  })

  .then(data => console.log(data))
  .catch(error => alert("Die Anfrage ist ungültig"))
*/
}