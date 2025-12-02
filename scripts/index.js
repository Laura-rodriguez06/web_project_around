// ----------------------------------------
// POPUP EDITAR PERFIL
// ----------------------------------------

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditForm = popupEdit.querySelector(".popup__form");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const nameInput = popupEdit.querySelector("input[name='name']");
const aboutInput = popupEdit.querySelector("input[name='about']");

// Abrir popup de editar perfil
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  popupEdit.classList.add("popup_opened");
});

// Guardar cambios del perfil
popupEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  popupEdit.classList.remove("popup_opened");
});

// ----------------------------------------
// POPUP AGREGAR TARJETA
// ----------------------------------------

const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_add-card");
const addForm = document.querySelector(".popup__form-add");

const titleInput = addForm.querySelector("input[name='title']");
const imageInput = addForm.querySelector("input[name='image']");

// Abrir popup agregar tarjeta
addButton.addEventListener("click", () => {
  popupAdd.classList.add("popup_opened");
});

// Crear nueva tarjeta
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCard = document.createElement("li");
  newCard.classList.add("cards__item");

  newCard.innerHTML = `
    <img src="${imageInput.value}" class="cards__image" alt="${titleInput.value}" />

    <div class="card__title-group">
      <h2 class="card__title">${titleInput.value}</h2>
      <button class="cards__like-button">
        <img src="./images/coradesactivado.svg" 
             class="cards__like-icon" 
             alt="like" 
             data-active="false" />
      </button>
    </div>
  `;

  document.querySelector(".cards__list").prepend(newCard);

  popupAdd.classList.remove("popup_opened");
  addForm.reset();
});

// ----------------------------------------
// BOTONES DE CERRAR POPUPS
// ----------------------------------------

document.querySelectorAll(".popup__close").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".popup").classList.remove("popup_opened");
  });
});

// ----------------------------------------
// SISTEMA DE LIKES (3 ESTADOS)
// ----------------------------------------

const LIKE_ICONS = {
  inactive: "./images/coradesactivado.svg", // negro vacío
  hover: "./images/coragris.svg", // gris al pasar
  active: "./images/union.svg", // negro relleno
};

// CLICK → activar/desactivar like
document.addEventListener("click", (e) => {
  const likeBtn = e.target.closest(".cards__like-button");
  if (!likeBtn) return;

  const icon = likeBtn.querySelector(".cards__like-icon");
  const isActive = icon.dataset.active === "true";

  icon.dataset.active = (!isActive).toString();
  icon.src = isActive ? LIKE_ICONS.inactive : LIKE_ICONS.active;
});

// HOVER → solo si no está activo
document.addEventListener("mouseover", (e) => {
  const icon = e.target.closest(".cards__like-icon");
  if (!icon) return;
  if (icon.dataset.active !== "true") icon.src = LIKE_ICONS.hover;
});

document.addEventListener("mouseout", (e) => {
  const icon = e.target.closest(".cards__like-icon");
  if (!icon) return;
  if (icon.dataset.active !== "true") icon.src = LIKE_ICONS.inactive;
});

// -----------------------------
// POPUP DE IMAGEN GRANDE
// -----------------------------

const popupImage = document.querySelector(".popup_type_image");
const popupImg = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const popupImageClose = popupImage.querySelector(".popup__close");

// Abrir popup cuando se hace click en una imagen
document.addEventListener("click", (e) => {
  const clickedImage = e.target.closest(".cards__image");
  if (!clickedImage) return;

  popupImg.src = clickedImage.src;
  popupImg.alt = clickedImage.alt;
  popupCaption.textContent = clickedImage.alt;

  popupImage.classList.add("popup_opened");
});

// Cerrar popup
popupImageClose.addEventListener("click", () => {
  popupImage.classList.remove("popup_opened");
});
