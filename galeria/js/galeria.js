var animationVel = 13;
var intervalVel = 5;
var IMG_LIST = ["images/img_1.jpg", "images/img_2.jpg", "images/img_3.jpeg",
"images/img_4.jpg", "images/img_5.jpg", "images/img_6.jpg", "images/img_7.jpg",
"images/img_8.jpg", "images/img_9.jpg", "images/img_10.jpeg"];
var imgPath;
var imgIndex;
var currentImg;
var processInterval;
var moving = false;
var currentImgWidth = 720;

//Carga nuevas imágenes aleatorias
function randomImg(){
    var n = IMG_LIST.length;
    imgIndex =[];
    imgPath = [];
    var i = 0;
    var flag;
    while(i < 5){
        flag = true;
        var nRandom = Math.round(Math.random() * (9));
        for(var j = 0; j < imgIndex.length; j++){
            if(imgIndex[j] == nRandom){
                flag = false;
            }
        }
        if(flag){
            imgIndex.push(nRandom);
            imgPath.push(IMG_LIST[nRandom]);
            i++;
        }
    }
    changeImgById(0, "img_main");
    currentImg = 0;
    document.getElementById("i_back").disabled = true;
    document.getElementById("i_next").disabled = false;
}

//Centra la imagen principal.
function centerImg(){
    if(!moving){
        var cWidth = document.body.clientWidth;
        var mainE = document.getElementById("img_main");
        mainE.style.left = ((cWidth / 2) - (currentImgWidth / 2)) + "px";
    }
}

//Cambia el src de la imagen perteneciante al id.
function changeImgById(n, id){
    var e = document.getElementById(id);
    e.src = (imgPath[n]);
}

//Validacion para generar nuevas imagenes.
function startRandom(){
    if(!moving){
        randomImg();
    }
}

//Mueve a la siguiente imagen auxiliar.
function moveNext(){
    currentImg += 1;
    if(currentImg <= 4){
        changeImgById(currentImg, "img_aux");
        document.getElementById("i_back").disabled = false;
    } 
    if(currentImg == 4){
        document.getElementById("i_next").disabled = true;
    }
}

//Mueve a la anterior imagen auxiliar.
function moveBack(){
    currentImg -= 1;
    if(currentImg >= 0){
        changeImgById(currentImg, "img_aux");
        document.getElementById("i_next").disabled = false;
    }
    if(currentImg == 0){
        document.getElementById("i_back").disabled = true;
    }
}

//Animacion para mostrar la siguiente imagen.
function moveAnimateNext(){
    var cWidth = document.body.clientWidth;
    var mainE = document.getElementById("img_main");
    var auxE = document.getElementById("img_aux");
    if(!moving){
        moveNext();
        auxE.style.left = (cWidth) + "px";
        auxE.classList.add("img_show");
        processInterval = setInterval(function(){
                animateImg(cWidth, "l", mainE, auxE);
            }, intervalVel);   
    }
}

//Animacion para mostrar la anterior imagen.
function moveAnimateBack(){
    var cWidth = document.body.clientWidth;
    var mainE = document.getElementById("img_main");
    var auxE = document.getElementById("img_aux");
    if(!moving){
        moveBack();
        auxE.style.left = (-currentImgWidth) + "px";
        auxE.classList.add("img_show");
        processInterval = setInterval(function(){
                animateImg(cWidth, "r", mainE, auxE);
            }, intervalVel);
        
    }
}

//Controlador para mover a la izquierda(l) o derecha(d).
function animateImg(cWidth, side, e, eAux){
    var mainLeft = parseInt(e.style.left);
    var auxLeft = parseInt(eAux.style.left);
    var midLeft = (cWidth / 2) - (currentImgWidth/2);
    moving = true;
    if(side == "l"){
        if(auxLeft > midLeft){
            moveLeft(eAux, auxLeft, midLeft);
        }
        if(auxLeft <= midLeft + currentImgWidth){
            moveLeft(e, mainLeft, -currentImgWidth);
        }
        if(mainLeft <= (-currentImgWidth)){
            clearInterval(processInterval);
            changeImgById(currentImg, "img_main");
            eAux.classList.remove("img_show");
            moving = false;
            centerImg();
            
        }
    }else if(side == "r"){
        if(auxLeft < midLeft){
            moveRight(eAux, auxLeft, midLeft);
        }
        if((auxLeft + currentImgWidth) >= midLeft){
            moveRight(e, mainLeft, cWidth);
        }
        if(mainLeft >= (cWidth)){
            clearInterval(processInterval);
            eAux.classList.remove("img_show");
            changeImgById(currentImg, "img_main");
            moving = false;
            centerImg();
        }
    }
    
}

//Resta la posicion de la izquierda
function moveLeft(e, current, max){
    if(current - animationVel > max){
        current -= animationVel;
    }else{
        current = max;
    }
    e.style.left = (current) + "px";
}

//Suma la posicion de la izquierda
function moveRight(e, current, max){
    if(current + animationVel < max) {
        current += animationVel;
    }else{
        current = max;
        
    }
    e.style.left = (current) + "px";
}
