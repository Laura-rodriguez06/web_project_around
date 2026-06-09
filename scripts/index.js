// ----------------------------------------
// DATOS
// ----------------------------------------

const initialCards = [
  { name: "Valle Yosemite", link: "./images/Valleyosemite.jpg" },
  { name: "Lago Louise", link: "./images/LagoLouise.jpg" },
  { name: "Montañas Calvas", link: "./images/MontañasCalvas.png" },
  { name: "Latemar", link: "./images/Latemar.png" },
  { name: "Vanois National", link: "./images/Vanois.png" },
  { name: "Lago di Braies", link: "./images/Lagodi.png" },
];

// ----------------------------------------
// SELECTORES
// ----------------------------------------

const template = document.querySelector("#card-template").content;
const list = document.querySelector(".cards__list");

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add-card");

// ----------------------------------------
// FUNCIONES POPUP
// ----------------------------------------

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

// cerrar con X
document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", () => {
    closePopup(button.closest(".popup"));
  });
});

// cerrar con overlay
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

// ----------------------------------------
// TARJETAS
// ----------------------------------------

function getCardElement(name, link) {
  const card = template.querySelector(".cards__item").cloneNode(true);

  const imageElement = card.querySelector(".cards__image");
  const titleElement = card.querySelector(".cards__title");
  const likeButton = card.querySelector(".cards__like-button");
  const deleteButton = card.querySelector(".cards__delete-button");

  titleElement.textContent = name;
  imageElement.src = link;
  imageElement.alt = name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    card.remove();
  });

  imageElement.addEventListener("click", () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    openPopup(imagePopup);
  });

  return card;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

// ----------------------------------------
// TARJETAS INICIALES
// ----------------------------------------

initialCards.forEach((item) => {
  renderCard(item.name, item.link, list);
});

// ----------------------------------------
// PERFIL (EDITAR)
// ----------------------------------------

const editForm = popupEdit.querySelector(".popup__form");

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    editForm.name.value = document.querySelector(".profile__name").textContent;

    editForm.about.value =
      document.querySelector(".profile__about").textContent;

    openPopup(popupEdit);
  });

editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  document.querySelector(".profile__name").textContent = editForm.name.value;

  document.querySelector(".profile__about").textContent = editForm.about.value;

  closePopup(popupEdit);
});

// ----------------------------------------
// AGREGAR TARJETA
// ----------------------------------------

const addForm = popupAdd.querySelector(".popup__form");

document.querySelector(".profile__add-button").addEventListener("click", () => {
  openPopup(popupAdd);
});

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const title = addForm.title.value;
  const link = addForm.image.value;

  renderCard(title, link, list);

  addForm.reset();

  closePopup(popupAdd);
});
