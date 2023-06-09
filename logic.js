let gridItem=document.getElementsByClassName("square")
let text=document.getElementsByClassName("square-content")
let name_x=document.getElementById("name-x")
let name_o=document.getElementById("name-o")
let input_x=document.querySelector("main  input")
let input_o=document.querySelector("span  input")
let none=document.querySelector(" .btn")
let card=document.querySelector(".card")
let list=document.querySelector(".list")
let player_x=document.getElementById("player-x")
let player_o=document.getElementById("player-o")
let audio=document.querySelector("audio")
let img_success_x=document.getElementById("img-success-x")
let img_success_o=document.getElementById("img-success-o")
let currentTurn="x"
let gameIsFinished=false
let index_X=0
let index_O=0; 
let label_x=document.querySelector("main label")
let label_o=document.querySelector("span label")



input_x.addEventListener("input",()=>{
    name_x.innerText=input_x.value

    if(input_x.value != ""){
        label_x.style.display="none"
    }
    if(input_x.value == ""){
        label_x.style.display="block"
    }
    
})

input_o.addEventListener("input",()=>{
    name_o.innerText=input_o.value

    if(input_o.value != ""){
        label_o.style.display="none"
    }
    if(input_o.value == ""){
        label_o.style.display="block"
    }
})


document.getElementById("none").addEventListener("click",function(){
    document.getElementById("none").style.background="rgb(7, 78, 78)"
    document.getElementById("none").style.boxShadow="1px 5px 5px black"
   setTimeout(()=>{
    document.getElementById("login").style.display="none"
    list.style.display="flex"
    none.style.display="flex"
    card.style.display="flex"
   },1000)
})



let boardArray=[
    "0","1","2",
    "3","4","5",
    "6","7","8"
]


if(currentTurn=="x"){
    name_x.classList.add("color-name")
    document.querySelector(".x").classList.add("bord")
    player_x.classList.add("color-red")
}
for(const item of gridItem){
    item.addEventListener("click",function(){
        if(gameIsFinished)return 

        let value=item.getAttribute("value")
        let index=value-1
   
        if(boardArray[index]=="x" || boardArray[index]=="o")return
        audio.play()
        let squareContent=document.querySelector(`.square[value="${value}"] .square-content`)
        if(currentTurn=="x"){
            squareContent.style.color="red"
            squareContent.innerHTML=currentTurn
        }else{
            squareContent.style.color="green"
            squareContent.innerHTML=currentTurn
        }

        boardArray[index]=currentTurn
        evaluateBoard()
        if(currentTurn == "x"){
            currentTurn = "o"
        }else{
            currentTurn = "x"
        }

        if(currentTurn=="x"){
            name_x.classList.add("color-name")
            name_o.classList.remove("color-name")
            document.querySelector(".x").classList.add("bord")
            document.querySelector(".o").classList.remove("bord")
            player_x.classList.add("color-red")
            player_o.classList.remove("color-green")
           
        }else{
            name_o.classList.add("color-name")
            name_x.classList.remove("color-name")
            document.querySelector(".o").classList.add("bord")
            document.querySelector(".x").classList.remove("bord")
            player_o.classList.add("color-green")
            player_x.classList.remove("color-red")
        }
    })

    function evaluateBoard(){
        let isDraw=true
        for(square of boardArray){
            if(square !="x" && square !='o' ){
                isDraw=false
            }
        }

        if(
            //rows
            (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2]) ||
            (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]) ||
            (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8]) ||

             //columns
             (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]) ||
             (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]) ||
             (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]) ||

              //Diagonal
            (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8]) ||
            (boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6]) 
        ){
          let winner=currentTurn == "o" ? "o":"x"
          if(winner=="x"){
            index_X++
          }else{
            index_O++
          }

          if(index_X > index_O){
            img_success_x.style.display="block"
            img_success_o.style.display="none"
          }else if(index_X < index_O){
            img_success_o.style.display="block"
            img_success_x.style.display="none"
          }else if(index_X == index_O){
            img_success_o.style.display="none"
            img_success_x.style.display="none"
          }
          if(index_X != 0){
            document.getElementById("index-x").innerHTML=index_X
          }
          if(index_O != 0){
            document.getElementById("index-o").innerHTML=index_O
          }
          gameIsFinished=true
          isDraw=false
         setTimeout(()=>{
            if(winner == "x"){
                // alertify.alert(`${name_x.innerText} Won &#127942;`)
                alertify.alert( "Geme X O",`${name_x.innerText} Won &#127942;`);

            }else{
                alertify.alert("Geme X O",`${name_o.innerText} Won &#127942;`)
            }
        },300)
        }
     
        if(isDraw){
            gameIsFinished=true
            setTimeout(()=>{
                alertify.alert("Geme X O","draw")
            },300)
        }

    }
}

document.querySelector(".btn").addEventListener("click",function(){
    reset()
})


function reset(){
    // resetting the visual part
    for(item of gridItem){
        let value=item.getAttribute("value")
        let squareContent=document.querySelector(`.square[value="${value}"] .square-content`)
        squareContent.innerHTML=""
        boardArray=[
            "0","1","2",
            "3","4","5",
            "6","7","8"
        ]
    }
    gameIsFinished=false
    currentTurn="x"
    if(currentTurn=="x"){
        name_x.classList.add("color-name")
        name_o.classList.remove("color-name")
        document.querySelector(".x").classList.add("bord")
        document.querySelector(".o").classList.remove("bord")
        player_x.classList.add("color-red")
        player_o.classList.remove("color-green")
    }
    // h.textContent=`${currentTurn} turn`

}








