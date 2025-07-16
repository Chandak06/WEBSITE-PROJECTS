const textareaEl = document.querySelector("textarea");
const totalcharacterEl = document.querySelector(".total-character");
const remainingcharacterEl = document.querySelector(".remaining-character");

textareaEl.addEventListener("keyup", () => {
    updateCounter();
})
updateCounter();
function updateCounter() {
    totalcharacterEl.innerText = textareaEl.value.length;
    remainingcharacterEl.innerText = textareaEl.getAttribute("maxlength") - textareaEl.value.length;
}