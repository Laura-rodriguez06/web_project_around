// ----------------------------------------
// VALIDACIÓN
// ----------------------------------------

function showInputError(input) {
  const error = input.nextElementSibling;
  input.classList.add("popup__input_type_error");
  error.textContent = input.validationMessage;
  error.classList.add("popup__error_visible");
}

function hideInputError(input) {
  const error = input.nextElementSibling;
  input.classList.remove("popup__input_type_error");
  error.textContent = "";
  error.classList.remove("popup__error_visible");
}

function checkInputValidity(input) {
  input.validity.valid ? hideInputError(input) : showInputError(input);
}

function toggleButtonState(inputs, button) {
  button.disabled = inputs.some((i) => !i.validity.valid);
}

function setEventListeners(form) {
  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__submit");

  toggleButtonState(inputs, button);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input);
      toggleButtonState(inputs, button);
    });
  });
}

document.querySelectorAll(".popup__form").forEach(setEventListeners);

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
// POPUPS
// ----------------------------------------

function openPopup(p) {
  p.classList.add("popup_is-opened");
}

function closePopup(p) {
  p.classList.remove("popup_is-opened");
}

// ----------------------------------------
// TARJETAS
// ----------------------------------------

const template = document.querySelector("#card-template").content;
const list = document.querySelector(".cards__list");

function createCard(name, link) {
  const card = template.querySelector(".cards__item").cloneNode(true);

  const img = card.querySelector(".cards__image");
  const title = card.querySelector(".cards__title");

  img.src = link;
  img.alt = name;
  title.textContent = name;

  return card;
}

initialCards.forEach((c) => list.append(createCard(c.name, c.link)));

// ----------------------------------------
// PERFIL (ETAPA 2 CORRECTA)
// ----------------------------------------

const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const closeButton = editModal.querySelector(".popup__close");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const nameInput = editModal.querySelector(".popup__input_type_name");
const aboutInput = editModal.querySelector(".popup__input_type_description");

const formElement = editModal.querySelector(".popup__form");

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openPopup(editModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closePopup(editModal);
}

editButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener("click", () => closePopup(editModal));

formElement.addEventListener("submit", handleProfileFormSubmit);

// ----------------------------------------
// AGREGAR TARJETA
// ----------------------------------------

const popupAdd = document.querySelector(".popup_type_add-card");

document
  .querySelector(".profile__add-button")
  .addEventListener("click", () => openPopup(popupAdd));

popupAdd.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = popupAdd.querySelector("[name='title']").value;
  const link = popupAdd.querySelector("[name='image']").value;

  list.prepend(createCard(title, link));

  e.target.reset();
  closePopup(popupAdd);
});

// ----------------------------------------
// CERRAR POPUPS
// ----------------------------------------

document
  .querySelectorAll(".popup__close")
  .forEach((btn) =>
    btn.addEventListener("click", () => closePopup(btn.closest(".popup"))),
  );

// ----------------------------------------
// LIKE
// ----------------------------------------

document.addEventListener("click", (e) => {
  const likeBtn = e.target.closest(".cards__like-button");
  if (!likeBtn) return;
  likeBtn.classList.toggle("cards__like-button_active");
});

// ----------------------------------------
// POPUP IMAGEN
// ----------------------------------------

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

document.addEventListener("click", (e) => {
  const img = e.target.closest(".cards__image");
  if (!img) return;

  const card = img.closest(".cards__item");
  const title = card.querySelector(".cards__title").textContent;

  popupImage.src = img.src;
  popupImage.alt = title;
  popupCaption.textContent = title;

  openPopup(imagePopup);
});

// cerrar con overlay
imagePopup.addEventListener("click", (e) => {
  if (e.target === imagePopup) closePopup(imagePopup);
});

// cerrar con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) closePopup(openedPopup);
  }
});
