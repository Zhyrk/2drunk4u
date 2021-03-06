//FUNZIONI PERSONALI DELL'APP

function getPlayerNumber(){
    let max = parseInt(getVariable("maxPlayers"))
    for(var i = 1; i<=max; i++){
        if(getVariable('G' + i) == null)
            return (i-1)
    }
    return max
}

function addPlayer(name){
    let max = parseInt(getVariable("maxPlayers"))
    let playerName = $('#playerName').val()
    $('#playerName').val("")
    let n = getPlayerNumber()
    if(n < max && playerName != ""){
        n++
        setVariable("G" + n, playerName)   
    }else{
        if(n >= max)
            alert('Numero massimo di giocatori raggiunto')

        if(playerName == "")
            alert("Nome del giocatore vuoto")
    }  
    
    printPlayerList()
}

function printPlayerList(){
    $("#playersList").empty()
    let max = parseInt(getVariable("maxPlayers"))
    for(var i=1; i<=max; i++){
        if(getVariable("G" + i) != null)
            $("#playersList").append("<div class='playerContainer' onclick=removePlayer('G"+ i + "')><span class='player'  id=G"+ i + ">" + getVariable("G" + i) + "</span><span class='removePlayer'> X</span></div>")
            //$("#playersList").append("<div class='playerContainer'><span class='player'  id=G"+ i + ">" + getVariable("G" + i) + "</span><a class='removePlayer' onclick=removePlayer('G"+ i + "')> X</a><div>")
    }
    centerContent(true)
}

function removePlayer(code){
    sessionStorage.removeItem(code)
    printPlayerList()

}

function getRandomPlayer(){
    let n = getPlayerNumber()
    let id = Math.floor(Math.random() * n) + 1

    return getVariable('G' + id)
}


function formatSentence(sentence){
    let prev;

    while(sentence.includes("#")){
        let player = getRandomPlayer()
        if(prev != null && prev != player)
            sentence = sentence.replace("#", player)
        else if(prev == null)
            sentence = sentence.replace("#", player)

        prev = player
    }

    return sentence
}

function getGameList(list, n){
    return computeList(generateSentenceList(list, n))
}

function displaySentence(list){
    let item = list.shift()
    $('#sentence').text("")
    $('#sentence').text(item.testo)
    if(item.tipo == "temp")
        $('body').css("background-color", "#a09f9f")
    else
        $('body').css("background-color", "rgb(142, 113, 180)")
    centerContentLoop(4)
}

//deprecated
function generateSentence(list){
    console.log(list.length)
    let random = Math.floor(Math.random() * list.length)

    $('#sentence').text("")
    $('#sentence').text(formatSentence(list[random].testo))
    centerContentLoop(4)

}

function generateSentenceList(sentenceList, n){
    let list = []
    for(var i=0;i<n;i++){
        let random = Math.floor(Math.random() * sentenceList.length)

        list.push(sentenceList[random])
    }

    return list;
}

function computeList(list){
    let index = 0;
    while(index < list.length){
        
        if(list[index].tipo != "temp")
            list[index].testo = formatSentence(list[index].testo)

        let item = list[index]
        
        if(item.tipo != null){
            switch(item.tipo){
                case "effect":
                        list.splice(index + 3, 0, 
                            {
                                testo: "l'effetto di " + item.testo + "e' finito",
                                tipo: "temp"
                            })
                    break;
                case "timer":
                        list.splice(index + 1, 0, 
                            {
                                testo: "Pagina timer di 10 secondi",
                                tipo: "temp"
                            })
                    break;
            }
        }
        index++;
    }

    return list;
}

function displayCategories(list){
    for(const i in list){
        //var callback = function(){setVariable('category', list[i])}
        var callback = function(){ console.log("ciao")}
        $("#selCategoria").append("<button class='category' onclick=''>" + list[i] + "</button>")
    }
}