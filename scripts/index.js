import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editForm = document.querySelector(".popup_type_edit .popup__form");
const addForm = document.querySelector(".popup_type_add-card .popup__form");

// ----------------------------------------
// USER INFO
// ----------------------------------------

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
});

// ----------------------------------------
// POPUP DE IMAGEN
// ----------------------------------------

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// ----------------------------------------
// TARJETAS / SECTION
// ----------------------------------------

function createCard(data) {
  const card = new Card(data, "#card-template", handleCardClick);

  return card.generateCard();
}

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    },
  },
  ".cards__list",
);

cardsSection.renderItems();

// ----------------------------------------
// POPUP EDITAR PERFIL
// ----------------------------------------

const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.setEventListeners();

const popupEditProfile = new PopupWithForm(
  ".popup_type_edit",
  (inputValues) => {
    userInfo.setUserInfo({ name: inputValues.name, about: inputValues.about });
    popupEditProfile.close();
  },
);
popupEditProfile.setEventListeners();

editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  editForm.name.value = currentUserInfo.name;
  editForm.about.value = currentUserInfo.about;

  editFormValidator.resetValidation();

  popupEditProfile.open();
});

// ----------------------------------------
// POPUP AGREGAR TARJETA
// ----------------------------------------

const addFormValidator = new FormValidator(validationConfig, addForm);
addFormValidator.setEventListeners();

const popupAddCard = new PopupWithForm(
  ".popup_type_add-card",
  (inputValues) => {
    const cardData = {
      name: inputValues.title,
      link: inputValues.image,
    };

    cardsSection.addItem(createCard(cardData));

    popupAddCard.close();
  },
);
popupAddCard.setEventListeners();

addButton.addEventListener("click", () => {
  addForm.reset();
  addFormValidator.resetValidation();

  popupAddCard.open();
});
