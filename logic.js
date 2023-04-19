let gridItem=document.getElementsByClassName("square")
let text=document.getElementsByClassName("square-content")
let name_x=document.getElementById("name-x")
let name_o=document.getElementById("name-o")
let currentTurn="x"
let gameIsFinished=false
let index_X=0
let index_O=0;
let boardArray=[
    "0","1","2",
    "3","4","5",
    "6","7","8"
]
if(currentTurn=="x"){
    name_x.classList.add("color-name")
    document.querySelector(".x").classList.add("bord")
}
for(const item of gridItem){
    item.addEventListener("click",function(){
        if(gameIsFinished)return
        let value=item.getAttribute("value")
        let index=value-1
   
        if(boardArray[index]=="x" || boardArray[index]=="o")return
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
console.log(currentTurn);
        if(currentTurn=="x"){
            name_x.classList.add("color-name")
            name_o.classList.remove("color-name")
            document.querySelector(".x").classList.add("bord")
            document.querySelector(".o").classList.remove("bord")
           
        }else{
            name_o.classList.add("color-name")
            name_x.classList.remove("color-name")
            document.querySelector(".o").classList.add("bord")
            document.querySelector(".x").classList.remove("bord")
            
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
                alertify.alert(`${name_x.innerText} Won!`)
            }else{
                alertify.alert(`${name_o.innerText} Won!`)
            }
        },300)
        }
     
        if(isDraw){
            gameIsFinished=true
            setTimeout(()=>{
                alertify.alert("draw")
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
        
    }
    // h.textContent=`${currentTurn} turn`

}








