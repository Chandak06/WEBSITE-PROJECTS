const nextEl = document.getElementById("next");
const prevEl = document.getElementById("prev");
const progressEl = document.querySelector(".progress-bar-front");
const stepsEls = document.querySelectorAll(".step");

let currentChecked = 1;

nextEl.addEventListener("click", () => {
  currentChecked++;
  if (currentChecked > stepsEls.length) {
    currentChecked = stepsEls.length;
  }
  updateProgress();
});

prevEl.addEventListener("click", () => {
  currentChecked--;
  if (currentChecked < 1) {
    currentChecked = 1;
  }
  updateProgress();
});
function updateProgress() {
    stepsEls.forEach((stepsEl, idx) => {
      const label = idx === 0 ? "Start" : idx ==  = stepsEls.length - 1 ? "Final" : "Step " + idx;
  
      if (idx < currentChecked) {
        stepsEl.classList.add("checked");
        stepsEl.innerHTML = `
          <i class="fa-solid fa-check"></i>
          <small>${label}</small>
        `;
      } else {
        stepsEl.classList.remove("checked");
        stepsEl.innerHTML = `
          <i class="fa-solid fa-xmark"></i>
        `;
      }
    });
  
    const checkedNumber = document.querySelectorAll(".checked");
    progressEl.style.width =
      ((checkedNumber.length - 1) / (stepsEls.length - 1)) * 100 + "%";
  
    prevEl.disabled = currentChecked === 1;
    nextEl.disabled = currentChecked === stepsEls.length;
  }
  