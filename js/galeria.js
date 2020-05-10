const ACEL = 0.4;
const vel = 12;
const IMG_LIST = ["../img/img_1.jpg", "../img/img_2.jpg", "../img/img_3.jpeg",
"../img/img_4.jpg", "../img/img_5.jpg", "../img/img_6.jpg", "../img/img_7.jpg",
"../img/img_8.jpg", "../img/img_9.jpg", "../img/img_10.jpeg"];
var imgList;
var imgArray;
var currentImg;
var processInterval;
var moving = false;


function randomImg(){
    if (!moving){
        var n = IMG_LIST.length;
        imgArray =[];
        imgList = [];
        var i = 0;
        var flag;
        while(i < 5){
            flag = true;
            var nRandom = Math.round(Math.random() * (9));
            for(var j = 0; j < imgArray.length; j++){
                if(imgArray[j] == nRandom){
                    flag = false;
                }
            }
            if(flag){
                imgArray.push(nRandom);
                imgList.push(IMG_LIST[nRandom]);
                i++;
            }
        }
        changeImgById(2, "img_main");
        currentImg = 2;
        document.getElementById("i_back").disabled = false;
        document.getElementById("i_next").disabled = false;
    }
}

function centerImg(){
    if(!moving){
        var cWidth = document.body.clientWidth;
        var mainE = document.getElementById("img_main");
        mainE.style.left = ((cWidth / 2) - 360) + "px";
    }
}

function changeImgById(n, id){
    var e = document.getElementById(id);
    e.src = (imgList[n]);
}

function moveNext(){
    var aux = currentImg + 1;
    if(aux <= 4){
        currentImg = aux;
        changeImgById(currentImg, "img_aux");
        document.getElementById("i_back").disabled = false;
    } 
    if(aux == 4){
        document.getElementById("i_next").disabled = true;
    }
}

function moveBack(){
    var aux = currentImg - 1;
    if(aux >= 0){
        currentImg = aux;
        changeImgById(currentImg, "img_aux");
        document.getElementById("i_next").disabled = false;
    }
    if(aux == 0){
        document.getElementById("i_back").disabled = true;
    }
}

function moveAnimateNext(){
    var cWidth = document.body.clientWidth;
    var mainE = document.getElementById("img_main");
    var auxE = document.getElementById("img_aux");
    if(!moving){
        moveNext();
        auxE.style.left = (cWidth) + "px";
        auxE.classList.add("img_show");
        processInterval = setInterval(function(){animateImg(cWidth, "l", mainE, auxE);}, 5);
        
    }
    // console.log("imgmain:" + endWidth);
}

function moveAnimateBack(){
    var cWidth = document.body.clientWidth;
    var mainE = document.getElementById("img_main");
    var auxE = document.getElementById("img_aux");
    if(!moving){
        moveBack();
        auxE.style.left = "-720px";
        auxE.classList.add("img_show");
        processInterval = setInterval(function(){animateImg(cWidth, "r", mainE, auxE);}, 5);
        
    }
}

function animateImg(cWidth, a, e, eAux){
    var mainLeft = parseInt(e.style.left);
    var auxLeft = parseInt(eAux.style.left);
    var midLeft = (cWidth / 2) - 360;
    moving = true;
    if(a == "l"){
        if(auxLeft >= midLeft){
            moveLeft(eAux, auxLeft, midLeft);
        }
        if(auxLeft <= midLeft + 720){
            moveLeft(e, mainLeft, -720);
        }
        if(mainLeft <= (-720)){
            clearInterval(processInterval);
            moving = false;
            changeImgById(currentImg, "img_main");
            centerImg();
            eAux.classList.remove("img_show");
        }
    }else if(a == "r"){
        if(auxLeft <= midLeft){
            moveRight(eAux, auxLeft, midLeft);
        }
        if((auxLeft + 720) >= midLeft){
            moveRight(e, mainLeft, cWidth);
        }
        if(mainLeft >= (cWidth)){
            clearInterval(processInterval);
            moving = false;
            changeImgById(currentImg, "img_main");
            centerImg();
            eAux.classList.remove("img_show");
        }
    }
    
}

function moveLeft(e, current, max){
    if(current - vel > max){
        e.style.left = (current - vel) + "px";
    }else{
        e.style.left = max + "px";
    }
    current = parseInt(e.style.left);
}

function moveRight(e, current, max){
    if(current + vel < max) {
        e.style.left = (current + vel) + "px";
    }else{
        e.style.left = max + "px";
    }
    current = parseInt(e.style.left);
}
