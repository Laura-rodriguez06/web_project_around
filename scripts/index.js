import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

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
// CONFIGURACIÓN VALIDACIÓN
// ----------------------------------------

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// ----------------------------------------
// SELECTORES
// ----------------------------------------

const cardsContainer = document.querySelector(".cards__list");

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add-card");

const editForm = popupEdit.querySelector(".popup__form");
const addForm = popupAdd.querySelector(".popup__form");

// ----------------------------------------
// VALIDACIÓN
// ----------------------------------------

const editFormValidator = new FormValidator(validationConfig, editForm);

const addFormValidator = new FormValidator(validationConfig, addForm);

editFormValidator.setEventListeners();
addFormValidator.setEventListeners();

// ----------------------------------------
// POPUPS
// ----------------------------------------

document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", () => {
    closePopup(button.closest(".popup"));
  });
});

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

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openPopup(imagePopup);
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleCardClick);

  return card.generateCard();
}

initialCards.forEach((item) => {
  cardsContainer.prepend(createCard(item));
});

// ----------------------------------------
// EDITAR PERFIL
// ----------------------------------------

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

document.querySelector(".profile__add-button").addEventListener("click", () => {
  openPopup(popupAdd);
});

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const cardData = {
    name: addForm.title.value,
    link: addForm.image.value,
  };

  cardsContainer.prepend(createCard(cardData));

  addForm.reset();

  closePopup(popupAdd);
});
