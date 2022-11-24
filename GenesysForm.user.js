// ==UserScript==
// @name         Genesys Form Auto-fill
// @version      1.2
// @description  Autofill T2 / Dispatch forms on new chat client
// @author       Tom L
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js
// @match        https://genesys-internal-chat-dot-fiber-marketing-live.appspot.com/
// @updateURL    https://github.com/Gettz/GenesysAutoFill/raw/main/GenesysForm.user.js
// @downloadURL  https://github.com/Gettz/GenesysAutoFill/raw/main/GenesysForm.user.js
// ==/UserScript==

var org = "TNI"

var fillNode = document.createElement ('div');
fillNode.innerHTML = '<button id="myButton" type="button"> Set Name</button>';
fillNode.setAttribute ('id', 'myBContainer');
document.body.appendChild(fillNode);

var myModal = document.createElement ('div');
myModal.innerHTML = '                                                    \
<div id="myModal" class="modal">                                         \
  <div class="modal-content">                                            \
    <span class="close">&times;</span><label>Name: </label>              \
    <input type="mName" id="userName" value="">                          \
    <br><br><label>Email:  </label>                                      \
    <input type="mEmail" id="userEmail" value=""                         \
    <br><br><br>                                                         \
    <button type="button" class="submit" id="OKbutton"> OK </button>     \
  </div>                                                                 \
</div>                                                                   \
';
document.body.appendChild (myModal);

function fillForm() {
    document.getElementById("ibexTni-name").value = localStorage.getItem('name')
    document.getElementById("ibexTni-email").value = localStorage.getItem('email')
    document.getElementById("ibexTni-vendor").value = org
    document.getElementById("dispatch-name").value = localStorage.getItem('name')
    document.getElementById("dispatch-email").value = localStorage.getItem('email')
}

function saveStorage() {
    localStorage.setItem('name', document.getElementById('userName').value);
    localStorage.setItem('email', document.getElementById('userEmail').value);
}

function openModal() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var ok = document.getElementsByClassName("submit")[0];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
    ok.onclick = function() {
        saveStorage();
        modal.style.display = "none";
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    }
}

$("#myButton").click(function(event){
       openModal();
});

document.getElementById("dispatch").addEventListener("load", fillForm());

GM_addStyle ( `
    #myBContainer {
        position:               absolute;
        width:                  50%;
        padding:                15px;
        margin:                 0 auto;
        top:                    0%;
        right:                  -100px;
        font-size:              14px;
        z-index:                1200;
    }
    #myButton{
        display:                inline-block;
        width:                  114px;
        height:                 40px;
        border-radius:          100px;
        border:                 none;
        text-decoration:        none;
        font-weight:            300;
        color:                  #FFFFFF;
        background-color:       #0B80EF;
        text-align:             center;
        transition:             all 0.2s;
    }
    #myButton:hover{
        background-color:       #4095c6;
    }

.modal {
        display:                none; /* Hidden by default */
        position:               fixed; /* Stay in place */
        z-index:                9999;   /* Sit on top */
        padding-top:            50px; /* Location of the box */
        left:                   0;
        top:                    0;
        width:                  100%; /* Full width */
        height:                 100%; /* Full height */
        overflow:               auto; /* Enable scroll if needed */
        background-color:       rgb(0,0,0); /* Fallback color */
        background-color:       rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-content {
        background-color:       #fefefe;
        margin:                 auto;
        padding:                20px;
        border:                 1px solid #888;
        border-radius:          5px;
        width:                  400px;
}

.close {
        color:                  #aaaaaa;
        float:                  right;
        font-size:              28px;
        font-weight:            bold;
}

.close:hover,
.close:focus {
        color:                  #000;
        text-decoration:        none;
        cursor:                 pointer;
}
` );
