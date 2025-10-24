document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(callback, options);

    if (window.getComputedStyle(document.querySelector(".cards-container")).flexDirection == "column") {
        let cards = document.querySelectorAll(".card-static");
        for (let card of cards) {
            observer.observe(card);
        }
        try{
            let cards_after = document.querySelector(".texto-select");
            observer.observe(cards_after);
        } catch {
            cards_after = document.querySelector(".teste-conteudo");
            observer.observe(cards_after);
        } 
    }
});
const options = {
    root: null,
    rootMargin: "-5% 0% -5% 0%", // top, right, bottom, left
    threshold: 1.0,
};

const callback = (entries, observer) => {
    entries.forEach((entry) => {
        try {
            entry.target.querySelector(".card").style.transform = "rotateY(180deg)";
        } catch {
            void(0);
        }
        let cards = document.querySelectorAll(".card-static");
        for (let card of cards) {
            if (card != entry.target) {
                card.querySelector(".card").style.transform = "rotateY(0deg)";
            }
        }
    });
};