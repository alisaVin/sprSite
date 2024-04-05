const url = '/swagger/v1/swagger.json';

const springerContainer = document.querySelector('.container')

let input_lenght = document.getElementById('lenght_x').value;
let input_width = document.getElementById('width_y').value;
let inp_startX = document.getElementById('start_x').value;
let inp_startY = document.getElementById('start_y').value;

function giveOutput() {
  let input_lenght = document.getElementById('lenght_x').value;
  let input_width = document.getElementById('width_y').value;
  input_lenght = parseInt(input_lenght);
  input_width = parseInt(input_width);

  let output = "Der Spielfeld ist " + input_lenght + " x " + input_width + " groß.";
  document.getElementById('field_output').innerText = output;
}

//bearbeiten!!!
function submitInput() {
  //link ändern
  fetch('/swagger/v1/swagger.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    //ändern
    body: JSON.stringify({
      name: 'User 1'
    })
  })  

  .then(response => {
    if (response.ok){
      alert("Der Springer läft &#128052;")
    } else {
      alert("Die Anfrage ist ungültig")
    }
    response.json()
  })

  .then(data => console.log(data))
  .catch(error => alert("Die Anfrage ist ungültig"))
  //.then(commits => alert(commits[0].author.login));
}


/*let position = {
    lenghtX: ,
    widthY: ,
    startX: ,
    startY: ,
}*/