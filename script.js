function toggleMenu() {
    const nav = document.getElementById('sideNav');
    nav.classList.toggle('active');
}
const typingTarget = document.getElementById("typed-text");
const phrases = [
    "Falling in love.",
    "One story at a time.",
    "One picture at a time.",
    "One page at a time.",
    
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Remove characters
        typingTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; 
    } else {
       
        typingTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    // Logic for switching states
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at the end of a string
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; 
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", type);
