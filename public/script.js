// Experti JS
if(document.getElementById("expertiFile")){
const predmety = document.getElementById("predmety-tlacidlo")
const list1    = document.getElementById("predmety-obsah")
const list2    = document.getElementById("vyucba-obsah")
const vyucba   = document.getElementById("vyucba-tlacidlo")

predmety.addEventListener("click",(event)=>{
  list1.classList.toggle("show")
})

vyucba.addEventListener("click",(event)=>{
  list2.classList.toggle("show")
})

window.onclick = function(event) {
  if (!["BUTTON","INPUT","LABEL"].includes(event.target.tagName)) {
    var dropdowns = document.getElementsByClassName("obsah-menu");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
}

// Registracia JS
if(document.getElementById("registraciaFile")){
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
    var a = document.querySelector('input[name="type"]:checked').value
    console.log(a)
    
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Ak je profesor a chce ísť ďalej, choď na poslednú kartu
  if(a==='profesor' && n>0){ 
  currentTab = currentTab + 2;
  }
  // Ak je profesor a chce ísť späť, vráť sa na prvú kartu
  if(a==='profesor' && n<0){ 
    currentTab = currentTab -2;
    }
  // Ak je expert, posúvaj sa vždy o 1 kartu
  if(a==='expert'){
  currentTab = currentTab + n;   
  }
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("circles").style["display"] = "none";
    document.getElementById("buttons").style["display"] = "none"; 
    document.getElementById("regForm").submit()
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}
}







