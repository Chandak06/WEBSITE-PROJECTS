const containerEl = document.querySelector(".container");

const career = ["YouTuber", "Web Developer", "Freelancer", "Instructor"];
let careerIndex = 0;
let characterIndex = 0;

function updateText() {
    const currentCareer = career[careerIndex];
    const article = currentCareer[0].toLowerCase() === "i" ? "an" : "a";

    containerEl.innerHTML = `
        <h1>I am ${article} ${currentCareer.slice(0, characterIndex)}</h1>
    `;

    characterIndex++;

    if (characterIndex > currentCareer.length) {
        careerIndex++;
        characterIndex = 0;

        // Reset to 0 if we reach the end
        if (careerIndex >= career.length) {
            careerIndex = 0;
        }
    }

    setTimeout(updateText, 400); // Delay between each character
}

updateText();
