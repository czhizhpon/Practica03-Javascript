function print_value(n){
    var resul_elem = document.getElementById("i_result");
    
    if(n=="."){
        resul_elem.value = resul_elem.value + n;
    }else if(n == "C"){
        resul_elem.value = 0;
    }else if(resul_elem.value == "0" && !isNaN(n)){
        resul_elem.value = n;
    }else{
        resul_elem.value = resul_elem.value + n;
    }
}

function calc_result(){
    var resul_elem = document.getElementById("i_result");
    var resul = eval(resul_elem.value);
    if(!isFinite(resul)){
        alert("Error - No se puede dividir para 0");
        resul_elem.value = 0;
    }else{
        resul_elem.value = eval(resul_elem.value);
    }
}