var apiContxt = "/fitto-admin-webservice";
var FAILURE_MSG = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>An error has occurred!<br />Please contact support team!!</p>";

var cursorX = "";
var cursorY = "";
function printMousePos(e){
      cursorX = e.pageX;
      cursorY= e.pageY;
}

function disableFutureDate(input){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	 if(dd<10){
	        dd='0'+dd
	    } 
	    if(mm<10){
	        mm='0'+mm
	    } 

	today = yyyy+'-'+mm+'-'+dd;
	document.getElementById(input).setAttribute("max", today);	
}

function validateEmail(email) {
	  //var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  //ISSUE# 2672
	  var regex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
	  if(!regex.test(email)) {
	    return false;
	  } else{
	    return true;
	  }
	}


function validatePassword (password) {
	var regex = /^.{8,16}$/;
	if(!regex.test(password)) {
	    return false;
	  } else{
	    return true;
	  }
}

function CheckPassword(inputtxt) { 
	var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
	if(!inputtxt.match(paswd)) { 
		return false;
	} else { 
		return true;
	}
}

function onlyNumber (param) {
	 var regex = /^\d*[.]?\d*$/;
	if(!regex.test(param)) {
	    return false;
	  } else{
	    return true;
	  }
}


function onlyAlphabetWithSpace (param) {
	 var regex = /^[a-zA-Z ]*$/;
	if(!regex.test(param)) {
	    return false;
	  } else{
	    return true;
	  }
}

function validateLanguage (param) {
	 var regex = /^[a-zA-Z ,]*$/;
	if(!regex.test(param)) {
	    return false;
	  } else{
	    return true;
	  }
}


function noSpecialCharacter (param) {
	 var regex = /[`~,@#&!%^*.$<>;':"\/\[\]\|{}()=_+-]/;
	 if(!regex.test(param)) {
	    return true;
	  } else{
	    return false;
	  }
}

function calcualateAge(dateOfBirth) {
	var dob = new Date(dateOfBirth);
	var today = new Date();
	var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
	return age;
}

function phoneNumberValidation(inputText) {
  var regex = /^\d{10}$/;
  if(!regex.test(inputText)) {
	    return false;
	  } else{
	    return true;
	  }
}

function validatePromoRule (param) {
	 var regex = /^[0-9 %]*$/;
	if(!regex.test(param)) {
	    return false;
	  } else{
	    return true;
	  }
}

const errorCallbackReferralCode = function (data){
	$("#loader").hide();
	console.log(data);
}

function validatePromoCode (param) {
	 var regex = /^[0-9a-zA-Z]*$/;
	if(!regex.test(param)) {
	    return false;
	  } else{
	    return true;
	  }
}

//TASK# 2689
function validateSpecialityDesc(param) {
	 var regex = /^[0-9a-zA-Z ,.]*$/;
	if(!regex.test(param)) {
	    return false;
	  } else{
	    return true;
	  }
}

function validateDropdownData(param) {
	 var regex = /^[0-9a-zA-Z ,]*$/;
	if(!regex.test(param)) {
	    return false;
	  } else{
	    return true;
	  }
}

function showEntriesPageLength (dataTableId) {
	var ele = $("[aria-controls='"+dataTableId+"']");
	var showEntriesVal = ele.children("option:selected").val();
	return parseInt(showEntriesVal);
}

function validateFloatKeyPress(el, evt, maxLength) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = el.value.split('.');
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }     
    //just one dot
    if(number.length>1 && charCode == 46){
         return false;
    }
    //get the carat position
    var caratPos = getSelectionStart(el);
    var dotPos = el.value.indexOf(".");
    
    if(dotPos == -1) {
    	 //Max 6 digit number before dot
        if(number[0].length >= maxLength && charCode != 46) {
        	return false;
        } 
    }
    
    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
        return false;
    }
    return true;
}

function getSelectionStart(o) {
	if (o.createTextRange) {
		var r = document.selection.createRange().duplicate()
		r.moveEnd('character', o.value.length)
		if (r.text == '') return o.value.length
		return o.value.lastIndexOf(r.text)
	} else return o.selectionStart
}