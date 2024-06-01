



// Global Variables 

var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkUrl");
var popup = document.getElementById("popup");
var inputslist = [];




if(localStorage.getItem("inputsContainer") != null){
    inputslist = JSON.parse( localStorage.getItem("inputsContainer") );
    displayData();
}


// buttons-click-- 

var closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener(  'click' , closepopup )

var btnSubmit = document.getElementById('btnSubmit')
btnSubmit.addEventListener( 'click' , btnAdd )


// Button submit-- 

function btnAdd(){

    if( validationName()== true && validationurl()==true){
        var inputs ={

            name: bookmarkNameInput.value ,
            urlSite: bookmarkUrlInput.value
    
        }
        inputslist.push(inputs);
        localStorage.setItem("inputsContainer" , JSON.stringify( inputslist ) )
        displayData()
        clearinputs();
    }

    else{
        popup.classList.remove('d-none');
    }
}



// delete page--
function closepopup(){
    popup.classList.add('d-none');
}



// Clear inputs-- 

function clearinputs(){
    bookmarkNameInput.value = null;
    bookmarkUrlInput.value = null;
    bookmarkNameInput.classList.remove('is-valid');
    bookmarkUrlInput.classList.remove('is-valid');
}


// Add-- 

function displayData(){

    var cartona = "";

    for( var i = 0 ; i < inputslist.length ; i++ ){
        cartona += `<tr>
        <td>${i+1}</td>
        <td>${inputslist[i].name}</td>
        <td><button class="btn btn-success btn-visit" onclick ="visitItem(${i})" ><i class="fa-solid fa-eye"></i> visit</button></td>
        <td><button onclick="deleteItem( ${i} )" class="btn btn-danger btn-delete" ><i class="fa-solid fa-trash-can"></i> Delete</button></td>
   </tr>`
    }

    document.getElementById("tableBody").innerHTML = cartona;

}


// visit button--
function visitItem(urlIndex){
    var Regex = /^https?:\/\//;
    if( Regex.test(inputslist[urlIndex].urlSite)){
        window.open(inputslist[urlIndex].urlSite);
    }
    else{
        window.open(`https://${inputslist[urlIndex].urlSite}`)
    }
}


// Delete button--
function deleteItem( indexItem ){
    inputslist.splice( indexItem , 1 );
    localStorage.setItem("inputsContainer" , JSON.stringify( inputslist ) );
    displayData();
}




 //Validation-- 

  function validationName(){
    var text = bookmarkNameInput.value;
    var pattern = /^\w{3,}(\s+\w+)*$/;

    if( pattern.test( text ) == true){

        bookmarkNameInput.classList.add('is-valid');
        bookmarkNameInput.classList.remove('is-invalid');

        return true;
    }

    else{
        bookmarkNameInput.classList.add('is-invalid');
        bookmarkNameInput.classList.remove('is-valid');
        return false;
    }
  }

function validationurl(){
    var text = bookmarkUrlInput.value;
    var pattern = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

    if( pattern.test( text ) == true){

        bookmarkUrlInput.classList.add('is-valid');
        bookmarkUrlInput.classList.remove('is-invalid');
        return true;
    }

    else{
        bookmarkUrlInput.classList.add('is-invalid');
        bookmarkUrlInput.classList.remove('is-valid');
        return false;
    }
}



