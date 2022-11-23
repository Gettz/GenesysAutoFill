// ==UserScript==
// @name         Genesys Form Auto-fill
// @version      0.2
// @description  Autofill T2 / Dispatch forms on new chat client
// @author       Tom L
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js
// @match        https://genesys-internal-chat-dot-fiber-marketing-live.appspot.com/
// ==/UserScript==

var name = "~NAME HERE"
var email = "~EMAIL HERE~"
var org = "TNI"


var fillNode = document.createElement ('div');
fillNode.innerHTML = '<button id="myButton" type="button"> Fill out </button>';
fillNode.setAttribute ('id', 'myBContainer');
document.body.appendChild(fillNode);

$("#myButton").click(function(event){
    fillForm();
});

function fillForm() {
    document.getElementById("ibexTni-name").value = name
    document.getElementById("ibexTni-email").value = email
    document.getElementById("ibexTni-vendor").value = org
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
` );
