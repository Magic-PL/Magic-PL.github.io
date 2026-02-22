const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsContainer = document.querySelector(".dots");

let index = 0;
let autoSlide;

/* створення dots */
slide.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if(i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
        index = i;
        updateSlider();
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateSlider(){
    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

/* кнопки */
nextBtn.onclick = () => {
    index++;
    if(index >= slide.length) index = 0;
    updateSlider();
}

prevBtn.onclick = () => {
    index--;
    if(index < 0) index = slide.length - 1;
    updateSlider();
}

/* авто */
function startAuto(){
    autoSlide = setInterval(() => {
        index++;
        if(index >= slide.length) index = 0;
        updateSlider();
    }, 4000);
}
startAuto();

/* пауза при наведенні */
document.querySelector(".slider").addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
});
document.querySelector(".slider").addEventListener("mouseleave", startAuto);


/* клавіатура */
document.addEventListener("keydown", e => {
    if(e.key === "ArrowRight") nextBtn.click();
    if(e.key === "ArrowLeft") prevBtn.click();
});


/* swipe (mobile) */
let startX = 0;
let endX = 0;

slides.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

slides.addEventListener("touchend", e => {
    endX = e.changedTouches[0].clientX;

    if(startX - endX > 50) nextBtn.click();
    if(endX - startX > 50) prevBtn.click();
});