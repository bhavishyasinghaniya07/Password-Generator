const slider = document.querySelector("[data-lengthSlider]");
const copyImg = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const length = document.querySelector("[data-lengthNumber]");
const generateButton = document.querySelector('.generateButton');
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');
const allCheckboxes = document.querySelectorAll("input[type=checkbox]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const indicator = document.querySelector("[data-indicator]");
const symbol = '~!@#$%^&{*()_"-}];:?/>[.<,|`';


let password = "";
let checkCount = 0;
let passwordLength = 10;
handleSlider();

function handleSlider(){
   slider.value = passwordLength;
  length.innerText = passwordLength;
}

function setIndicator(color){
  indicator.style.backgroundColor = color ;
}


function generateRndNumber(min,max){
  return Math.floor(Math.random() * (max-min) + min);
}

function generateNumber(){
 return generateRndNumber(0,9);
}

function generateUppercase(){
  return String.fromCharCode(generateRndNumber(65,91));
}

 function generateLowercase(){
  return String.fromCharCode(generateRndNumber(97,123));
}

 function generateSymbol(){
  const randomNum = generateRndNumber(0,symbol.length);
  return symbol.charAt(randomNum);
}

function calculateStrength(){
  let uppercaseX = false;
  let lowercaseX = false;
  let numbersX = false;
  let symbolsX = false;

  if(uppercase.checked) uppercaseX = true;
  if(lowercase.checked) lowercaseX = true;
  if(numbers.checked) numbersX = true;
  if(symbols.checked) symbolsX = true;

  if(uppercaseX && lowercaseX && (numbersX || symbolsX) && passwordLength >= 8){
    setIndicator('green');
  }
  else if((uppercaseX || lowercaseX) && (numbersX || symbolsX) && passwordLength>=6)
    setIndicator('yellow');
  else{
    setIndicator('red');
  }
}

async function copyContent(){
  try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied";
  }
  catch(e){
    copyMsg.innerText = "Failed";
  }

  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  },2000);

}

function shufflePassword(array){
  for(let i = array.length-1 ; i> 0;i--){
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str ="";
  array.forEach((el) => (str += el));
  return str;
}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckboxes.forEach( (c) => {
      if(c.checked)
      checkCount++;
    });

    if(passwordLength < checkCount) {
      passwordLength = checkCount;
      handleSlider();
    }
}

allCheckboxes.forEach( (checkbox) => {
  checkbox.addEventListener('change', handleCheckBoxChange);
})

slider.addEventListener('input', (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

copyImg.addEventListener('click' , () => {
  if(passwordDisplay.value)
   copyContent();
});

generateButton.addEventListener('click' , () =>{

  if(checkCount==0) 
    return;

  if(passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  password = "";

let funcArr = [];

if(uppercase.checked){
 funcArr.push(generateUppercase);
}
if(lowercase.checked){
 funcArr.push(generateLowercase);
}
if(numbers.checked){
 funcArr.push(generateNumber);
}
if(symbols.checked){
 funcArr.push(generateSymbol);

}

for(let i=0;i<funcArr.length;i++){
  password += funcArr[i]();
}

for(let i = 0; i< passwordLength-funcArr.length;i++){
  let randIndex = generateRndNumber(0,funcArr.length);
  password += funcArr[randIndex]();
}

password = shufflePassword(Array.from(password));

passwordDisplay.value = password;
calculateStrength();


});



