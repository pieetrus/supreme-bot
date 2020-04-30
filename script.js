main()

function alertBox(){
  setTimeout(function() {
    getProducts(); 
  }, 300);

}


function getProducts() {
  var matches = document.querySelectorAll("article a");
  for (let i = 0; i < matches.length; i=i+3) {
    if(matches[i].textContent.toLowerCase().includes("sold")){
      continue;
    }
    //pod i+2 jest kolor jak co ;]]
    if(matches[i+1].textContent.toLowerCase().includes("my")){
      if(matches[i+1].textContent.toLowerCase().includes("bloody")){
        if(matches[i+2].textContent.toLowerCase().includes("grey")){
          matches[i+1].click();
          break;
        }
      }
    }
    
  }
  setTimeout(function() {
    setSize("large", "medium"); 
  }, 1500);
}

function setSize(sizeName, sizeName2) {  
  let getSizeValue = function (name, name2){
      let sizes = document.querySelectorAll('select option');
      for (var i = sizes.length - 1; i >= 0; i--) {
        if (sizes[i].textContent.toLowerCase() === name.toLowerCase()) {
            return sizes[i].value;
        }
      }

      for (var i = sizes.length - 1; i >= 0; i--) {
        if (sizes[i].textContent.toLowerCase() === name2.toLowerCase()) {
            return sizes[i].value;
        }
      }

  } 
  document.getElementsByName('size')[0].value = getSizeValue(sizeName,sizeName2);

  document.getElementsByName('commit')[0].click();
  setTimeout(function() {
    goToCheckout();
  }, 300);
}

function goToCheckout(){
  document.getElementsByClassName('checkout')[0].click();
  setTimeout(function() {
    fillInForm();
  }, 300);
}

function fillInForm() {
  let inputs = document.querySelectorAll('input');
  let selects = document.querySelectorAll('select');
  let policy = document.querySelectorAll('p label')[0];
  inputs[2].value = "Ziomek Kozak"; //Full Name
  inputs[3].value = "kotekkkkd@gmail.com"; //Email
  inputs[4].value = 999999999; //PhoneNumber
  inputs[5].value = "addres"; //Addres1
  inputs[6].value = "addres2"; //Addres2
  inputs[7].value = "addres3"; //Addres3
  inputs[8].value = "city"; //City
  inputs[9].value = "46-852"; //PostCode
  selects[0].value = "PL"; //Billing Country
  inputs[8].value = "city"; //City
  inputs[14].value = "4596 5480 0643 0680"; //CardNumber
  inputs[15].value = 324; //CVV
  selects[2].value = "03"; //CardMonth
  selects[3].value = "2021"; //CardYear
  policy.click(); // Policy checked
  //document.getElementsByName('commit')[0].click();
}


function main(){
  let category = document.querySelectorAll("a[href$='t-shirts']")[0];
  var help = 1;

  if(help==1){
    if(category!=undefined){
      category.click();
    }
    else{
      fillInForm();
    }
    setTimeout(function() {
      alertBox();  // You used `el`, not `element`?
    }, 300);
    help=help+1
  }

}

