console.log('%c HI', 'color: firebrick');
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

let listDogs = document.getElementById("dog-image-container");
let listBreeds = document.getElementById("dog-breeds");
let breedSelect = document.getElementById("breed-dropdown");
let selectedBreed = "a";

// debugger
let breeds = true;


breedSelect.onchange = getBreeds;

fetch(imgUrl)
    .then(resp=>resp.json())
    .then(json=>{  
        loadImage(json.message);
    });

getBreeds();

function getBreeds(){
    while(listBreeds.children.length > 0){
        listBreeds.querySelector('li').remove();
    }
    selectedBreed = breedSelect.options[breedSelect.selectedIndex].value;
    console.log('gotten')
    fetch(breedUrl)
        .then(resp=>resp.json())
        .then(json=>{  
            loadBreeds(json.message);
        });
}
function loadImage(jsonData){
    jsonData.forEach(function(dat){
        let text = document.createElement('li');
        text.innerHTML = `<img src="${dat}">`;
        listDogs.appendChild(text);
    })
}

function loadBreeds(jsonData){
    for (var dat in jsonData){

        if (breeds){
            if (jsonData[dat].length < 1){
                if(dat.charAt(0) === selectedBreed){
                    let text = document.createElement('li');
                    text.innerText = dat;
                    listBreeds.appendChild(text);
                }
            }
            else {
                jsonData[dat].forEach(function(d){
                    if (d.charAt(0) === selectedBreed){
                        let text = document.createElement('li');
                        text.innerText = `${d} ${dat}`;
                        listBreeds.appendChild(text);
                    }
                })
            }
        }
        else{
            // debugger
            let text = document.createElement('li');
            text.setAttribute('class','listItem');
            if (jsonData[dat].length < 1){
                text.innerText = dat; 
                listBreeds.appendChild(text);
            }
            else{
                jsonData[dat].forEach(function(d){
                    text.innerText = `${d} ${dat}`;
                    listBreeds.appendChild(text);
                })
            }
        }
    }
}
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

document.addEventListener('click', (e)=>{
    if (e.target.className === 'listItem'){
        e.target.style.color = getRandomColor();
    }
});