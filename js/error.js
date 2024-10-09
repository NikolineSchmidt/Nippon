"use strict";

const image = document.getElementById("jumpingImage");

    // Function to make the image jump
    function makeImageJump() {
        image.style.transition = "transform 0.3s ease";
        image.style.transform = "translateY(-50px)";  // Move the image upwards

        // Return the image to its original position after the jump
        setTimeout(() => {
            image.style.transform = "translateY(0)";
        }, 300); // The time here should match the transition duration (0.3s)
    }

    // Add a click event listener to the image
    window.onload=function(){
        image.addEventListener("click", makeImageJump);
      }
    
      image.addEventListener("mouseover", makeImageJump);