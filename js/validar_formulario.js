
function onlyNumbersInput(evt){
    var currentAscii = evt.charCode;
    console.log(currentAscii)
    if (currentAscii < 48 || currentAscii > 57){
        return false;
    }
    return true;
}

function onlyTextInput(evt){
    var currentAscii = evt.charCode;
    if((currentAscii >= 65 && currentAscii <= 90) ||
        (currentAscii >= 97 && currentAscii <= 122) ||
        (currentAscii >= 192 && currentAscii <= 255) ||
        (currentAscii == 32)
    ){
        return true
    }
    return false;
}

function nNumberValidate(evt, n){
    var onlyNumbers = onlyNumbersInput(evt);
    var e = evt.target;
    if(onlyNumbers){
        if(e.value.length == n){
            return false;
        }
        return true;
    }
    return false;
}

function dniFormatValidation(e){
    var len = e.value.length;
    var flag = false;
    var aux = 0;
    var total = 0;
    e.classList.toggle("s_input_error", len <= 10);
    if(len == 10){
        for (var i = 0; i < len-1 ; i++) {
            if(i % 2 == 0){
                aux = e.value.charAt(i) * 2;
                if (aux > 9){
                    aux -= 9;
                }
                total += aux;
            } else{
                total += parseInt(e.value.charAt(i));
            }
        }
        var verNum = 0;
        if(total % 10 != 0){
            verNum = 10 - total % 10;
        }
        if (e.value.charAt(len - 1) == verNum){
            flag = true;
            //console.log("Cedula Valida");
            e.classList.remove("s_input_error");
        }else{
            
        }
    }
    return flag;
}

function dniError(e){
    var dniValidate = dniFormatValidation(e);
    if(dniValidate){
        document.getElementById("s_dni_notice").classList.remove("s_show");
        return true;
    }else{
        document.getElementById("s_dni_notice").classList.add("s_show");
        return false;
    }
}

function nStringValidate(e, n){
    var val = e.value;
    var valString = val.split(" ");
    var nString = valString.length;
    var flag = false;
    
    e.classList.toggle("s_input_error", nString <= n || nString > n);
    if (nString == n){
        e.classList.remove("s_input_error");
        
        for(var i = 0; i < nString; i++){
            if (valString[i].length <= 0){
                e.classList.add("s_input_error");
                return false;
            }
        }
        return true;
    }
}

function nameError(e, n){
    var nStringVal = nStringValidate(e, n);
    if(!nStringVal){
        document.getElementById("s_name_notice").classList.add("s_show");
        return false;
    }
    document.getElementById("s_name_notice").classList.remove("s_show");
    return true;
}

function lastnameError(e, n){
    var nStringVal = nStringValidate(e, n);
    if(!nStringVal){
        document.getElementById("s_lastname_notice").classList.add("s_show");
        return false;
    }
    document.getElementById("s_lastname_notice").classList.remove("s_show");
    return true;
}

function addressEmptyValidation(e){
    var addressString = e.value;
    var flag = true;
    e.classList.add("s_input_error");
    if(addressString.length == ""){
        return false
    }
    for(var i = 0; i < addressString.length; i++){
        if(addressString.charCodeAt(i) != 32){
            e.classList.remove("s_input_error");
            return true;
        }
    }
    return false;
}

function addressError(e){
    if(addressEmptyValidation(e)){
        document.getElementById("s_address_notice").classList.remove("s_show");
        return true;
    }else{
        document.getElementById("s_address_notice").classList.add("s_show");
        return false;
    }
}

function phoneValidate(e, n){
    if(e.value.length < n){
        e.classList.add("s_input_error");
        return false;
    }else{
        e.classList.remove("s_input_error");
        return true;
    }
}

function phoneError(e, n){
    if(!phoneValidate(e, n)){
        document.getElementById("s_phone_notice").classList.add("s_show");
        return false;
    }else{
        document.getElementById("s_phone_notice").classList.remove("s_show");
        return true;
    }
}

function dateFormatValidation(e){
    
    var dateString = e.value.split("/");
    var n = dateString.length;

    e.classList.add("s_input_error");
    if((n == 3) && (dateString[0].length === 2) && (dateString[1].length === 2)
    && (dateString[2].length === 4)){
        e.classList.remove("s_input_error");
        return true;
    }else{
        return false;
    }
}

function dateError(e){
    var dateValidation = dateFormatValidation(e);
    if(dateValidation){
        document.getElementById("s_born_notice").classList.remove("s_show");
        return true;
    }else{
        document.getElementById("s_born_notice").classList.add("s_show");
        return false;
    }
}

function emailFormatValidation(e){
    var emailString = e.value.split("@");
    console.log(emailString);

    var n = emailString.length;
    e.classList.add("s_input_error");
    if(n == 2){
        if((emailString[0].length >= 3) && (emailString[1].localeCompare("est.ups.edu.ec") === 0 || emailString[1].localeCompare("ups.edu.ec") === 0)){
            e.classList.remove("s_input_error");
            return true;
        }
    }
    return false;
    //ed@est.ups.edu.ec
    
}

function emailError(e){
    var emailValidation = emailFormatValidation(e);
    if(emailValidation){
        document.getElementById("s_email_notice").classList.remove("s_show");
        return true;
    }else{
        document.getElementById("s_email_notice").classList.add("s_show");
        return false;
    }
}

function passwordFormatValidation(e){
    var passString = e.value;
    console.log(passString);
    var passLen = e.value.length;
    var charFormat = [false, false, false];
    var currentAscii;
    e.classList.add("s_input_error");
    if (passLen >= 8){
        for(var i = 0; i < passLen; i++){
            currentAscii = passString.charCodeAt(i);
            if(currentAscii >= 65 && currentAscii <= 90){
                charFormat[0] = true;
            }
            if(currentAscii >= 97 && currentAscii <= 122){
                charFormat[1] = true;
            }
            if(currentAscii == 64 || currentAscii == 95 || currentAscii == 36){
                charFormat[2] = true;
            }
        }
        for (var i = 0; i < 3; i++){
            if(charFormat[i] == false){
                return false;
            }
        }
        e.classList.remove("s_input_error");
        return true;
    }
    return false;
    /*Contras@*/
}

function passwordError(e){
    var passValidation = passwordFormatValidation(e);
    if(passValidation){
        document.getElementById("s_password_notice").classList.remove("s_show");
        return true;
    }else{
        document.getElementById("s_password_notice").classList.add("s_show");
        return false;
    }
}

function submitForm(){
    var formElements = document.forms[0].elements;
    var nForm = formElements.length;
    var flag = true;
    var aux;

    for(var i = 0; i < nForm; i++){
        var e = document.forms[0].elements[i];
        // console.log("i:" +i +" id:" + e.id)
        switch(e.id){
            case "i_dni":
                aux = dniError(e);
                flag = flag && aux;
                break;
            case "i_name":
                aux = nameError(e, 2);
                flag = flag && aux;
                break;
            case "i_lastname":
                aux = lastnameError(e, 2);
                flag = flag && aux;
                break;
            case "i_address":
                aux = addressError(e);
                flag = flag && aux;
                break;
            case "i_phone_number":
                aux = phoneError(e, 10);
                flag = flag && aux;
                break;
            case "i_born":
                aux = dateError(e);
                flag = flag && aux;
                break;
            case "i_email":
                aux = emailError(e);
                flag = flag && aux;
                break;
            case "i_password":
                aux = passwordError(e);
                flag = flag && aux;
                break;
            default:
                console.log("No form elements");
        }

    }
    // console.log("FLAG: " +flag);
    return flag;
}
