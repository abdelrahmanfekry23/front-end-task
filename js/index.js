
var newUser = document.getElementById("newUser")

var btnSubmit = document.getElementById("submit")



var idSearch = document.getElementById("idSearch")

var btnIdSubmit = document.getElementById("idSubmit")

var btnTrans = document.getElementById("transSubmit");

var amount = document.getElementById("amount")

var btnAmount = document.getElementById("amountSubmit")



var nameRegx = /^[a-zA-Z]{1,20} {0,1}[a-zA-Z]{0,20}$/;

var idRegx = /^[0-9]{1,4}$/

var amountRegex = /^[0-9]{1,7}$/

var dateRegex = /^[0-9]{1,2}[-]{1}[0-9]{1,2}[-]{1}[0-9]{4}$/

custemerArr =[];

trasArr =[];

var  invalidName = document.getElementById("invalidName");




/************************* custmer *********************************** */


async function getCustmers(){
    var response = await fetch('http://localhost:3000/custmers');
    var data = await response.json();
    custemerArr = data;
    console.log(custemerArr.length)
}

async function displayCustemers(){

 await   getCustmers()

   
    var cartona = ``;
    for(var i = 0 ; i < custemerArr.length ; i++)
    {
        cartona += `<tr>
            <th scope="row">${i}</th>
            <td>${custemerArr[i].id}</td>
            <td>${custemerArr[i].name}</td>
            </tr>`
    }

    document.getElementById("custumerTable").innerHTML = cartona;
}




btnSubmit.addEventListener("click",function(){
  
 

  if(nameRegx.test(newUser.value)&&(idRegx.test(newId.value))){

    invalidName.classList.add("d-none");
    

    newUser.classList.replace("is-invalid","is-valid")

    newId.classList.replace("is-invalid","is-valid")
   

    var addNewUser ={
      "id":newId.value,
      "name":newUser.value
    }
 // console.log(addNewUser)

  //custemerArr.push(addNewUser);

  //console.log(custemerArr)

async function postNewUser(){

  await fetch('http://localhost:3000/custmers',{
    method:'post',
  
    headers:{
      'content-type': "application/json"},
      body: JSON.stringify(addNewUser),}
    
  ).then(response => response.json())

  await displayCustemers();

  displayDetals()
  
}

postNewUser()



 /* var cartona = ``;
  for(var i = 0 ; i < custemerArr.length ; i++)
  {
      cartona += `<tr>
          <th scope="row">${i}</th>
          <td>${custemerArr[i].id}</td>
          <td>${custemerArr[i].name}</td>
          </tr>`
  }

  document.getElementById("custumerTable").innerHTML = cartona;


  cartonaOne =``;
    for(var i = 0 ; i< custemerArr.length ; i++)
    {
        cartonaOne +=`      <table class="table w-50 table-success table-striped">
        <thead class="table-dark">
          <tr>
            <th scope="col" colspan="1">name</th>
            <th scope="col" colspan="2">${custemerArr[i].name}</th>            
          </tr>
          <tr>
            <th scope="col" colspan="1">custumer ID</th>
            <th scope="col" colspan="2">${custemerArr[i].id}</th>            
          </tr>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">date</th>    
            <th scope="col">Amount</th>        
          </tr>
        </thead>
        <tbody >`;

        for(var j =0 ; j < trasArr.length ; j++)
        {
            if(custemerArr[i].id == trasArr[j].custmerId )
            {
                cartona += `   <tr>
            <th scope="row">${trasArr[j].id}</th>
            <td>${trasArr[j].date}</td>
            <td>${trasArr[j].amount}</td>
            </tr>`
            }
        }
      
    }
      cartona+=`</tbody>
      </table>`
    document.getElementById("table").innerHTML = cartonaOne;

  */

  }
  else{
    //console.log("in-valid")
    invalidName.classList.remove("d-none");
    newUser.classList.add("is-invalid");
  }
})



/*********************** transuction ********************************************** */


async function getTransuction(){

  var response = await fetch('http://localhost:3000/transuction');
  var data = await response.json();
  console.log(data);
  trasArr = data;
}

async function displayTransuction(){

    await   getTransuction();
   
      
       var cartona = ``;
       for(var i = 0 ; i < trasArr.length ; i++)
       {
           cartona += `<tr>
               <th scope="row">${i}</th>
               <td>${trasArr[i].id}</td>
               <td>${trasArr[i].custmerId}</td>
               <td>${trasArr[i].date}</td>
               <td>${trasArr[i].amount}</td>
               </tr>`
       }
   
       document.getElementById("transuctionTable").innerHTML = cartona;
   }

   btnTrans.addEventListener("click",function(){
    
    if((idRegx.test(transId.value))&&(idRegx.test(custId.value))&&(dateRegex.test(transDate.value))&&(amountRegex.test(transAmount.value))){

      document.getElementById("transId").classList.replace("is-invalid","is-valid");

      document.getElementById("custId").classList.replace("is-invalid","is-valid");

      document.getElementById("transDate").classList.replace("is-invalid","is-valid");

      document.getElementById("transAmount").classList.replace("is-invalid","is-valid");

      document.getElementById("invalidTrans").classList.add("d-none");

      var newTransuction = {
        "id": transId.value,
        "custmerId": custId.value,
        "date": transDate.value,
        "amount": transAmount.value
      }

      async function postNewTransuuction(){

        await fetch('http://localhost:3000/transuction',{
          method:'post',
        
          headers:{
            'content-type': "application/json"},
            body: JSON.stringify(newTransuction),}
          
        ).then(response => response.json())
      
        await displayTransuction();
      
        displayDetals();
        
      }
      
      postNewTransuuction();

    }
    else{
      document.getElementById("transId").classList.add("is-invalid");

      document.getElementById("custId").classList.add("is-invalid");

      document.getElementById("transDate").classList.add("is-invalid");

      document.getElementById("transAmount").classList.add("is-invalid");

      document.getElementById("invalidTrans").classList.remove("d-none");
    }

   })

/*********************************************************************************************** */


async function displayDetals(){
  await  displayCustemers();
      
   await     displayTransuction();
    cartona =``;
    for(var i = 0 ; i< custemerArr.length ; i++)
    {
        cartona +=`   
           <table class="table w-100 table-success table-striped ">
        <thead class="table-dark">
          <tr>
            <th scope="col" colspan="1">name</th>
            <th scope="col" colspan="2">${custemerArr[i].name}</th>            
          </tr>
          <tr>
            <th scope="col" colspan="1">custumer ID</th>
            <th scope="col" colspan="2">${custemerArr[i].id}</th>            
          </tr>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">date</th>    
            <th scope="col">Amount</th>        
          </tr>
        </thead>
        <tbody >`;

        for(var j =0 ; j < trasArr.length ; j++)
        {
            if(custemerArr[i].id == trasArr[j].custmerId )
            {
                cartona += `   <tr>
            <th scope="row">${trasArr[j].id}</th>
            <td>${trasArr[j].date}</td>
            <td>${trasArr[j].amount}</td>
            </tr>`
            }
        }
      
    }
      cartona+=`</tbody>
      </table>
      
      `
      
    
    document.getElementById("table").innerHTML = cartona;
}

/******************************************************************************************** */

var invalidId = document.getElementById("idSearch");

var idAlert = document.getElementById("idAlert");

btnIdSubmit.addEventListener("click",function(){

  var cartona = ``;

 

  if(idRegx.test(idSearch.value)){

    invalidId.classList.replace("is-invalid","is-valid");

    idAlert.classList.add("d-none");

    for(var i =0 ; i<custemerArr.length ; i++){
      if(idSearch.value == custemerArr[i].id){
        
        cartona+=`<table class="table w-50 table-success table-striped">
        <thead class="table-dark">
          <tr>
            <th scope="col" colspan="1">name</th>
            <th scope="col" colspan="2">${custemerArr[i].name}</th>            
          </tr>
          <tr>
            <th scope="col" colspan="1">custumer ID</th>
            <th scope="col" colspan="2">${custemerArr[i].id}</th>            
          </tr>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">date</th>    
            <th scope="col">Amount</th>        
          </tr>
        </thead>
        <tbody>
      }`
      for(var j =0 ; j < trasArr.length ; j++)
        {
            if(custemerArr[i].id == trasArr[j].custmerId )
            {
              
                cartona += `   <tr>
            <th scope="row">${trasArr[j].id}</th>
            <td>${trasArr[j].date}</td>
            <td>${trasArr[j].amount}</td>
            </tr>`
            }
        }
        cartona+=` </tbody>
      </table>`
      
      document.getElementById("idTable").innerHTML = cartona

      
  }


}}

else{
  console.log("in-valid id")
  invalidId.classList.add("is-invalid");

  idAlert.classList.add("d-none");
}

if(cartona == ``){
  console.log("not-found")
  invalidId.classList.replace("is-valid","is-invalid");

  idAlert.classList.remove("d-none");
}
  

})





var amountInput = document.getElementById("amount");

var amountAlert = document.getElementById("amountAlert");




btnAmount.addEventListener("click",function(){
  var cartonaOne = ``;

  

 var flagOne = false;

 var flagTwo = false;

  if(amountRegex.test(amount.value)){
    flagOne = true

  }

  for(var i = 0 ; i< trasArr.length ; i++)
  {
    if(amount.value == trasArr[i].amount){
      flagTwo =true;
    }
  }

  if(flagOne&&flagTwo){

    
    amountInput.classList.replace("is-invalid","is-valid");

    amountAlert.classList.add("d-none");
    
    for(var i = 0 ; i< trasArr.length ; i++)
      {
        if(amount.value == trasArr[i].amount){

          {
            cartonaOne += `<tr>
            
            <td>${trasArr[i].id}</td>
            <td>${trasArr[i].custmerId}</td>
            <td>${trasArr[i].date}</td>
            <td>${trasArr[i].amount}</td>
            </tr>`
        }

        }
      }
    }
    else{
          console.log("in-valid")
         

          amountInput.classList.replace("is-valid","is-invalid");

          amountAlert.classList.remove("d-none");
        }
        

      
    
    document.getElementById("amountSearch").innerHTML = cartonaOne;
})


/********************************************************************************************* */
displayCustemers();
displayTransuction();
displayDetals()