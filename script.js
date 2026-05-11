function toggleMenu() {
    const nav = document.getElementById('sideNav');
    nav.classList.toggle('active');
}
class TypeWriter {
    constructor(element, phrases, waitTime = 2000) {
        this.element = element;
        this.phrases = phrases;
        this.waitTime = waitTime;
        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentPhrase = this.phrases[this.phraseIndex];
       
        let typeSpeed = this.isDeleting ? 50 : 100;

        if (this.isDeleting) {
            this.element.textContent = currentPhrase.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentPhrase.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        
        if (!this.isDeleting && this.charIndex === currentPhrase.length) {
            this.isDeleting = true;
            typeSpeed = this.waitTime; // Pause at the end
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
            typeSpeed = 500; // Small pause before starting new word
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialization Logic
document.addEventListener("DOMContentLoaded", () => {
    const typewriters = document.querySelectorAll(".typewriter");
    typewriters.forEach(el => {
      
        const phrases = JSON.parse(el.getAttribute("data-phrases"));
        new TypeWriter(el, phrases);
    });
});
