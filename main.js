//*************Variable Section */

const suits= ['♥︎', '♠︎', '♣︎', '♦︎']
const cardValues= ['Ace', 2, 3, 4, 5, 6, 7, 8,9, 10, 'Jack', 'Queen', 'King',]
const newDeck =[]
let dealtCard=[];
let king =10
let queen = 10
let jack =10
let cardArea = document.querySelector('#cardArea')
// let cardCheck = document.querySelector('.cardCheck')
let startBtn = document.querySelector('#startBtn')
let dealerCards =document.querySelector('#dealerCards');
let playerCards = document.querySelector('#playerCards');
let dHit = document.querySelector('#dHit')
let dHold = document.querySelector('#dHold')
let pHit = document.querySelector('#pHit')
let pHold = document.querySelector('#pHold')
let dealerDraw =document.querySelector('#dealerDraw');
let playerDraw =document.querySelector('#playerDraw');
let dCardTotal= document.querySelector('#dCardTotal')
let pCardTotal= document.querySelector('#pCardTotal')
let dealerTotal  =[];
let playerTotal  =[];
let playerCardTotal=0
let dealerCardTotal=0
let playAgain =document.querySelector('#playAgain')
let oneBtn = document.querySelector('#one');
let elevenBtn= document.querySelector('#eleven')
let shownCard = document.querySelector('.shownCard')
let dScore= document.querySelector('#dScore')
let pScore= document.querySelector('#pScore')



//********A Deck of cards */
//make a deck of cards
function makeDeckOfCards (){
    for (let i=0; i<suits.length; i++){
        for(let j=0; j<cardValues.length; j++){
            let theCard = (`${cardValues[j]} ${suits[i]}`)
            newDeck.push(theCard)
        }
    }
}
makeDeckOfCards()

//pick a random card and prevent it from being selected again--DONE!!
let tempHand  =[]   

function randCard(){
    let cardIndex = Math.floor(Math.random()*52);
        dealtCard= newDeck[cardIndex]
        console.log (dealtCard)
    const isCard = tempHand.includes(dealtCard)
    if (isCard ===true){
        randCard()
        } 
    tempHand.push(dealtCard);
}

function dealInit (){
    playerHand(); 
    setTimeout(dealerHand, 500);
    setTimeout(playerHand, 1000);
    setTimeout(dealerHand, 1500);
}

function playReset (){
    // based on info from stack overflow
 
        document.querySelectorAll( '.cardBoxDealer').forEach(items=>items.remove());
        document.querySelectorAll( '.cardBoxPlayer').forEach(items=>items.remove());
        startBtn.classList.remove('grayLetters');
        startBtn.disabled=false;
        pHit.disabled=false;
        dHit.disabled=false;
        dealerCardTotal=0;
        dCardTotal.value='';
        playerCardTotal=0;
        pCardTotal.value='';
    }
    
function dealerHand (){
    randCard()
        
    let div1 = document.createElement ('div');
        dealerCards.appendChild(div1);
        div1.textContent =dealtCard;
        div1.classList.add('cardBoxDealer');
        div1.classList.add('shownCard');
    
    let changCardToInt = dealtCard.split(" ",1);
    
    if (changCardToInt[0]==='Jack'||changCardToInt[0]==='Queen'||changCardToInt[0]==='King'){
        dealerTotal.push(10);
    }  else if (changCardToInt[0]==='Ace'){
        dAceValue();
    } else {
        dealerTotal.push(Number(changCardToInt));
    }
    
    for (let i=0; i<dealerTotal.length; i++){
        dealerCardTotal +=Number(dealerTotal[i])
        dCardTotal.value=dealerCardTotal 
        dealerTotal=[]
    }
    
    if (dealerCardTotal>=17 || dealerCardTotal>=22){
        dHit.disabled=true
    }
    if (dealerCardTotal===21){
        winner()
    }  
    checkStatus()
}
        
function playerHand (){
    randCard()
    
    let div = document.createElement ('div')
        playerCards.appendChild(div)
        div.textContent =dealtCard
        div.classList.add('cardBoxPlayer')
    
    let changCardToInt = dealtCard.split(" ",1)
    
    if (changCardToInt[0]==='Jack'||changCardToInt[0]==='Queen'||changCardToInt[0]==='King'){
        playerTotal.push(10)
    } else if (changCardToInt[0]==='Ace'){
        pAceValue()
    } else {
        playerTotal.push(Number(changCardToInt))
    }
    
    for (let i=0; i<playerTotal.length; i++){
            playerCardTotal +=Number(playerTotal[i])
            pCardTotal.value=playerCardTotal 
            // console.log(playerCardTotal)
            playerTotal=[]
        }
    if (playerCardTotal>=22 ||playerCardTotal===21 ){
        pHit.disabled=true;
        }

    checkStatus()

    }

// && dHit.disabled===true
function checkStatus (){
        console.log (pHit.disabled)
    console.log(dHit.disabled)
    if (pHit.disabled===true && dHit.disabled===true){
        console.log( 'im not active')
    compareScore() 

    }   
}


function oneElevenBtns (){
    console.log (playerCardTotal)
    console.log (elevenBtn)
    console.log (playerCardTotal)
    if (oneBtn===true){
        playerTotal.push(1)
    } else if (elevenBtn===true){
        // playerTotal.push(11);
        playerCardTotal.value+=11
    }
}

function dAceValue(){
    // need to add conditions to change value from one to eleven if needed after value was entered into array as one
    if (dealerCardTotal===0 ||dealerCardTotal===10 ||dealerCardTotal>=6){
        dealerTotal.push(11);
    } else {
        dealerTotal.push(1);
        }
    
} 

function pAceValue(){
    
    if (playerCardTotal===0 ||playerCardTotal===10){
        playerTotal.push(11);
    } else {
        playerTotal.push(1);
    }
}   

function winner(){
    // look up how to pop up a text box indicating winner
        alert('Winner')
        if (dealerCardTotal!==playerCardTotal){
            dScore.value ++;
        } else {
            alert('its a tie')
        }

    }

function compareScore (){
    
    if (dealerCardTotal > playerCardTotal){
            if (dealerCardTotal<21 && playerCardTotal <21){
        return  dScore.value ++}
        } else if (playerCardTotal > dealerCardTotal && dealerCardTotal<21 && playerCardTotal<21){
            return pScore.value ++
        } else if (dealerCardTotal >=22){
        return pScore.value ++
        } else if (playerCardTotal===21 && dealerCardTotal<21){
            return pScore.value ++
        } else if (dealerCardTotal===playerCardTotal){
            alert ('tie')
        }
}

function winScore(){

}

//disabled based from stackoverflow/thewebdev
startBtn.addEventListener('click', ()=> {
    dealInit(); 
    startBtn.classList.add('grayLetters');
    startBtn.disabled=true})

//stack overflow and tutorials point for "set timeout" help
dHit.addEventListener('click',dealerHand)
pHit.addEventListener('click',playerHand)

playAgain.addEventListener('click', playReset)

//switched to disabled
pHold.addEventListener('click', ()=> {pHit.disabled=true; checkStatus()})

//one and elven buttons
oneBtn.addEventListener('click', oneElevenBtns)
elevenBtn.addEventListener('click',oneElevenBtns)
console.log(oneBtn);
console.log(elevenBtn)


//May not need a dealer hold button
// dHold.addEventListener('click', ()=> {dHit.disabled=true})



//********************Adding Cards */

//need to get Ace figured out 
//************************** */

// let testAr = ['5 clubs', '9 hearts', 'ace spades']
// let removeItem= testAr[1]
// console.log(testAr)

// let updateAr = testAr.splice(removeItem,1)
// console.log(testAr)

    //  if (changCardToInt[0]==='Ace'&& dealerCardTotal===10){
    //             dealerTotal.push(11)
    //     } else if (changCardToInt[0]==='Ace'&& dealerCardTotal<10){
    //         //run aceQ function
    //     }

    //     function aceQ (one, eleven){
    //         if 
    //     }

    //Ace
    // if ace and dealer total>=6 
    //then ace = 11

    //if dealer total <=5
    //then ace =1
    //if 

    //if ace and dealer = 0
    // then ace = 1

    //
    //Scoring
