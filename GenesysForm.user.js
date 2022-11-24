// ==UserScript==
// @name         Genesys Form Auto-fill
// @version      0.5
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
fillNode.innerHTML = '<button id="myButton" type="button"> Fill out </button>';
fillNode.setAttribute ('id', 'myBContainer');
document.body.appendChild(fillNode);


var myModal = document.createElement ('div');
myModal.innerHTML = '                                                    \
<div id="myModal" class="modal">                                         \
  <div class="modal-content">                                            \
    <span class="close">&times;</span>                                   \
    <input type="mName" id="userName" placeholder="Name" value="">        \
    <br><br>                                                             \
    <input type="mEmail" id="userEmail" placeholder="Email" value=""     \
    <br><br><br>                                                         \
    <button type="button" class="submit" id="OKbutton"> OK </button> \
  </div>                                                                 \
</div>                                                                   \
';
document.body.appendChild (myModal);

$("#myButton").click(function(event){
    if(event.shiftKey) {
       openModal();
   }
   else {
       fillForm();
   }
});

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

GM_addStyle ( `
    #myContainer {
        position:               absolute;
        top:                    .5%;
        right:                  .1%;
        font-size:              14.5px;
        background:             aliceblue;
        border:                 1px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                1100;
        padding:                5px 5px;
    }
    #myBContainer {
        position:               absolute;
        top:                    .1%;
        right:                  5%;
        font-size:              16px;
        padding:                5px 5px;
        z-index:                1200;
    }

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 9999; /* Sit on top */
  padding-top: 50px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 500px;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
` );
