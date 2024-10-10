"use strict";

const image = document.getElementById("jumpingImage");

    // en funktion som, lader 404-billedet hopper op, hvor efter 0,3s kommer tilbage til sin start position.
    function makeImageJump() {
        image.style.transition = "transform 0.3s ease";
        image.style.transform = "translateY(-50px)";  

        
        setTimeout(() => {
            image.style.transform = "translateY(0)";
        }, 300);
    }

    // Window.onload som gør at når man enten klikker eller holder musen over gør at man får billedet til at hoppen.
    window.onload=function(){
        image.addEventListener("click", makeImageJump);
      }
    
      image.addEventListener("mouseover", makeImageJump);