const modalArea = document.querySelector(".modal_back");
const modalClose = document.querySelector("#modalClose");

modalClose.addEventListener(
    'click',
    (e) => {
        modalArea.style.display = 'none';
    }
)