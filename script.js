var cards_array;
var cards_values =[];
var cards_ids = [];
var cards_rotation = 0;
var firstCard;
var secondCard;

window.onload = function () {
    newBoard();
};

function getImages(n){
    for( var image, array = [],imgTAG, i = 1; i <= n; i++ ){
        image = new Image;
        image.src = "images/" + i + ".jpg";
        imgTAG="<img src="+image.src+">";
        array.push( imgTAG );
    }
    return array;

}//добавити картинки

cards_array=getImages(16);



Array.prototype.shuffle_the_cards = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random()*(i+1));
        temp = this[j];
        this[j]= this[i];
        this[i]= temp;
    }
};//перемішую картинки

function newBoard(){
    var output = '';
    cards_array.shuffle_the_cards();
    for(var i =0; i<cards_array.length; i++){
        output += '<div id="card_'+i+'" onclick="search_couples(this,\''+cards_array[i]+'\')"></div>';
    }
    document.getElementById('board').innerHTML=output;

}
function deleteCard(){
    document.getElementById(cards_ids[0]).style.cssText='visibility: hidden;';
    document.getElementById(cards_ids[1]).style.cssText='visibility: hidden;';
    cards_rotation += 2;
    cards_values = [];
    cards_ids = [];
    if(cards_rotation == cards_array.length){
        alert("Board cleared... generating new board");
        document.getElementById('board').innerHTML = "";
        newBoard();
    }
}//видалення відгаданих пар

function not_interpreted(){
    var card_1 = document.getElementById(cards_ids[0]);
    var card_2 = document.getElementById(cards_ids[1]);
    card_1.style.background = 'url(index.jpg) no-repeat';
    card_1.innerHTML = "";
    card_2.style.background = 'url(index.jpg) no-repeat';
    card_2.innerHTML = "";
    // Clear both arrays
    cards_values = [];
    cards_ids = [];
}//переворот двох карт

function search_couples(card,val){
    if(cards_values.length < 2){
        card.style.background = '#FFF';
        card.innerHTML = val;
        if(cards_values.length == 0){
            cards_values.push(val);
            cards_ids.push(card.id);
        } else if(cards_values.length == 1){
            cards_values.push(val);
            cards_ids.push(card.id);
            firstCard = cards_values[0].slice(-7,-5).split("/").join("");
            secondCard = cards_values[1].slice(-7,-5).split("/").join("");
            if(Math.abs(parseInt(firstCard) - parseInt(secondCard)) === 8){
                setTimeout(deleteCard, 200);
            }
            else {
                setTimeout(not_interpreted, 700);
            }
        }
    }
}//пошук збігів
