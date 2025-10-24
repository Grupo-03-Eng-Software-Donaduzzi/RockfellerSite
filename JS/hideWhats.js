const callbackHideWhats = (entries) => {
    let fixedWhats = document.querySelector(".whatsapp-button");
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            fixedWhats.style.display = "none";
        } else {
            fixedWhats.style.display = "flex";
        }
    });
};
const optionsHideWhats = {
    root: null,
    rootMargin: "0% 0% 0% 0%",
    threshold: 0,
};

document.addEventListener("DOMContentLoaded", () => {
    const observerHideWhats = new IntersectionObserver(callbackHideWhats, optionsHideWhats);
    let footer = document.querySelector(".footer");
    observerHideWhats.observe(footer);
});