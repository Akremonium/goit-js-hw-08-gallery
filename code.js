import images from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  modalImg: document.querySelector(".lightbox__image"),
  closeBtn: document.querySelector(".lightbox__button"),
  overlay: document.querySelector(".lightbox__overlay"),
};

const galleryEl = images
  .map((img) => {
    return `
    <li class="gallery__item">
        <a class="gallery__link" href="${img.original}">
            <img
                class="gallery__image"
                src="${img.preview}"
                data-source="${img.original}"
                alt="${img.description}"
                data-index="${images.indexOf(img)}"
            />
        </a>
    </li>`;
  })
  .join("");

refs.gallery.insertAdjacentHTML("afterbegin", galleryEl);

const collection = document.querySelectorAll(".gallery__image");

const onImgClick = (evt) => {
  evt.preventDefault();
  const target = evt.target;

  if (!target.classList.contains("gallery__image")) {
    return;
  }

  let currentPosition = Number(target.dataset.index);

  const attributesSwap = () => {
    refs.modalImg.src = collection[currentPosition].dataset.source;
    refs.modalImg.alt = collection[currentPosition].alt;
  };

  console.log(refs.modalImg);
  attributesSwap(target);
  refs.modal.classList.add("is-open");

  const showPrevImg = () => {
    if (currentPosition > 0) {
      currentPosition -= 1;
      attributesSwap();
    } else {
      currentPosition = collection.length - 1;
      attributesSwap();
    }
  };

  const showNextImg = () => {
    if (currentPosition < collection.length - 1) {
      currentPosition += 1;
      attributesSwap();
    } else {
      currentPosition = 0;
      attributesSwap();
    }
  };

  const changeModalImg = (evt) => {
    if (evt.code === "ArrowLeft") {
      showPrevImg();
    }
    if (evt.code === "ArrowRight") {
      showNextImg();
    }
  };

  window.addEventListener("keydown", changeModalImg);
};

const onModalClose = () => {
  refs.modal.classList.remove("is-open");
  refs.modalImg.src = "";
};

const onEscPress = (evt) => {
  if (evt.code === "Escape") {
    onModalClose();
  }
};

refs.gallery.addEventListener("click", onImgClick);
refs.closeBtn.addEventListener("click", onModalClose);
refs.overlay.addEventListener("click", onModalClose);
window.addEventListener("keydown", onEscPress);
