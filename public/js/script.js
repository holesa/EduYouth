// Special styling for the homepage
if(document.getElementById("homepage")){
  const navLinks = document.getElementsByClassName("nav-color");
  const logo = document.getElementById("logo");
  for(let i = 0;i<navLinks.length;i++){
    navLinks[i].style.color = "#002347";
    }
  logo.src="http://localhost:3000/img/home-logo.png";  
}
else{
  logo.src="http://localhost:3000/img/logo.png";
}


// Experts file
if(document.getElementById("experts-file")){
  const subjectsBtn     = document.getElementById("subjects-btn")
  const subjectsBox     = document.getElementById("subjects-box")
  const teachingBox     = document.getElementById("teaching-box")
  const teachingBtn     = document.getElementById("teaching-btn")
  const cityBox         = document.getElementById("city-box")
  const cityBtn         = document.getElementById("city-btn") 

function displayFilterMenu(){
  subjectsBtn.addEventListener("click",(event)=>{
    if(subjectsBox.style.display === "none" || subjectsBox.style.display === ""){
      subjectsBox.style.display = "block";
      teachingBox.style.display = "none";
      cityBox.style.display = "none";
    }
    else{
      subjectsBox.style.display = "none";  
    }

})

  teachingBtn.addEventListener("click",(event)=>{
      if(teachingBox.style.display === "none" || teachingBox.style.display === ""){
        teachingBox.style.display = "block";
        subjectsBox.style.display = "none";
        cityBox.style.display = "none";
      }
      else{
        teachingBox.style.display = "none";  
      }


})

  cityBtn.addEventListener("click",(event)=>{
      if(cityBox.style.display === "none" || cityBox.style.display === ""){
        cityBox.style.display = "block";
        teachingBox.style.display = "none";
        subjectsBox.style.display = "none";
      }
      else{
        cityBox.style.display = "none";  
      }

  })

}
displayFilterMenu()

function rememberCheckboxes(){
  // Store value of checkboxes to the localstorage
  let checkedValues = JSON.parse(localStorage.getItem("checkedValues")) || {}  
  const checkboxes = document.querySelectorAll("input[class=checkbox]")
    checkboxes.forEach(data=>{
      data.addEventListener("change",(item)=>{
        checkedValues[data.id] = data.checked;
        localStorage.setItem("checkedValues",JSON.stringify(checkedValues))  
      })
    })
   // Load checked checkboxes from the localstorage
    for(let j in checkedValues){
      if(checkedValues[j] === true){
      document.getElementById(j).setAttribute("checked",checkedValues[j])
      }
    }
  }
 rememberCheckboxes()
}


// Multistep_registration file
if(document.getElementById("multistep-registration")){
  const tab = document.getElementsByClassName("tab");
  const nextBtn = document.getElementById("nextBtn");
  const stepTwo = document.getElementById("step-two");
  const step = document.getElementsByClassName("step");
  const navButton = document.getElementsByClassName("navigation-buttons")[0];
  // const errorBox = document.getElementsByClassName("error-box");
  const errorBox = document.getElementsByClassName("alert")[0];
  let currentTab = 0; 
showTab(currentTab); 

// Display specific step
function showTab(n) {
  tab[n].style.display = "block";
  if(n === 0) {
    document.getElementById("prevBtn").style.display = "none";
  } 
    else{
      document.getElementById("prevBtn").style.display = "inline";
    }
  if(n === (tab.length - 2)) {
    nextBtn.innerHTML = "Potvrdiť";
  } 
    else{
      document.getElementById("nextBtn").innerHTML = "Ďalej";
    }
  activeInactive(n)
}

// Handle next and previous button logic
function nextPrev(n) {
    if(!validateForm(n)){ return false}
    else{
        errorBox.innerHTML = "";
        errorBox.classList.remove("alert-danger")
        let role = document.querySelector("input[name='role']:checked").value;
        tab[currentTab].style.display = "none";
      // If you have reached the end of the form
        if(nextBtn.innerHTML === "Potvrdiť" && n!=-1){  
        document.getElementById("regForm").submit()
        return false
      }
      // Exlude step two if you are a professor and go forward
        if(role === "profesor" && currentTab===0 && n===1){
        currentTab = 2;
        stepTwo.style.display = "none";
      }
      // Exlude step two if you are a professor and go back
       else if(role === "profesor" && currentTab===2 && n===-1){ 
        currentTab = 0;
        }
      // If you are a expert or a professor at the last step, go back or forward by one tab
        else{
          currentTab+=n;
          stepTwo.style.display = "block";   
        }
      // Finally display the correct tab:
      showTab(currentTab);
  }     
  
}

// Check if a field is empty
function validateForm(n) {
  let valid = ""
  const roleRadio = document.getElementsByClassName("role");
  const teachingCheckbox = document.getElementsByClassName("teachingCheckbox");
  const subjectCheckbox = document.getElementsByClassName("subjectCheckbox");
  const cityCheckbox = document.getElementsByClassName("cityCheckbox");
  const profileField = document.getElementsByClassName("profile-field");
  if(n>0){
  // Validate tab 1
    if(currentTab===0){
      return validateInput(0,roleRadio,"Vyberte, či ste profesor alebo expert.")
    }
    // Validate tab 2
    if(currentTab===1){
      if(!validateInput(1,subjectCheckbox,"Vyberte aspoň jeden predmet.")){
        return false;
      }
      else if(!validateInput(1,teachingCheckbox,"Vyberte aspoň jeden spôsob výučby.")){
        return false;
      }
      else if(!validateInput(1,cityCheckbox,"Vyberte aspoň jedno mesto.")){
        return false;
      }
      else{
        return true;
      }
    }
    // Validate tab 3
    if(currentTab===2){
        if(!validateInput(2,profileField,"Vyplňte všetky polia označené *")){
          return false;
        }  
        else{
          return true;
        }
    }
  }
  else{
    return true;
  }  
}

function validateInput(n,input,alert){
  let valid = ""
  for(let i=0;i<input.length;i++){
    if(n===2){
      if(input[i].value===""){
        valid = false;
        errorBox.classList.add("alert-danger")
        errorBox.innerHTML = alert
        break;
      }
      else{
        valid = true;
      }
    }
    else{
      if(input[i].checked){
        valid = true;
        break;
      }
      else{
        valid = false;
        errorBox.classList.add("alert-danger")
        errorBox.innerHTML = alert
      }
    }  
  }
  return valid;
}

 // Add or remove active class for a step in the progress bar
function activeInactive(n) {
  step[n].classList.add("active");
  step[n+1].classList.remove("active");
  step[n+2].classList.remove("active");
}

 function showLastStep(role){
  if(role === "profesor"){
    stepTwo.style.display = "none"  
    }
  step[0].classList.add("active");
  step[1].classList.add("active");
  step[2].classList.add("active");
  step[3].classList.add("active");
  navButton.style.display = "none";
  tab[0].style.display = "none";
  tab[1].style.display = "none";
  tab[2].style.display = "none";
  tab[3].style.display = "block"; 
}
} 







