const editButton = document.querySelector(".profile__edit-button");

const popupEdit = document.querySelector(".popup_type_edit");

const popupEditForm = popupEdit.querySelector(".popup__form");

const profileName = document.querySelector(".profile__name");

const profileAbout = document.querySelector(".profile__about");

const nameInput = popupEdit.querySelector("input[name='name']");

const aboutInput = popupEdit.querySelector("input[name='about']");

// Abrir popup editar perfil

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;

  aboutInput.value = profileAbout.textContent;

  popupEdit.classList.add("popup_opened");
});

// Guardar cambios

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

const addForm = popupAdd.querySelector(".popup__form_type_add-card");

const titleInput = addForm.querySelector("input[name='title']");

const imageInput = addForm.querySelector("input[name='image']");

addButton.addEventListener("click", () => {
  popupAdd.classList.add("popup_opened");
});

// Crear tarjeta

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCard = document.createElement("li");

  newCard.classList.add("cards__item");

  newCard.innerHTML = `

    <img src="${imageInput.value}" alt="${titleInput.value}" class="cards__image" />



    <div class="cards__title-group">

      <h2 class="cards__title">${titleInput.value}</h2>

      <button class="cards__like-button">

        <img src="./images/coradesactivado.svg" class="cards__like-icon" data-active="false" />

      </button>

    </div>

  `;

  document.querySelector(".cards__list").prepend(newCard);

  popupAdd.classList.remove("popup_opened");

  addForm.reset();
});

// ----------------------------------------

// CERRAR POPUPS

// ----------------------------------------

document.querySelectorAll(".popup__close").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".popup").classList.remove("popup_opened");
  });
});

// ----------------------------------------

// LIKE (3 ESTADOS)

// ----------------------------------------

const LIKE_ICONS = {
  inactive: "./images/coradesactivado.svg",

  hover: "./images/coragris.svg",

  active: "./images/union.svg",
};

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".cards__like-button");

  if (!btn) return;

  const icon = btn.querySelector(".cards__like-icon");

  const active = icon.dataset.active === "true";

  icon.dataset.active = (!active).toString();

  icon.src = active ? LIKE_ICONS.inactive : LIKE_ICONS.active;
});

document.addEventListener("mouseover", (e) => {
  const icon = e.target.closest(".cards__like-icon");

  if (!icon) return;

  if (icon.dataset.active === "false") icon.src = LIKE_ICONS.hover;
});

document.addEventListener("mouseout", (e) => {
  const icon = e.target.closest(".cards__like-icon");

  if (!icon) return;

  if (icon.dataset.active === "false") icon.src = LIKE_ICONS.inactive;
});

// ----------------------------------------

// POPUP IMAGEN GRANDE

// ----------------------------------------

const imagePopup = document.querySelector(".popup_type_image");

const popupImage = imagePopup.querySelector(".popup__image");

const popupCaption = imagePopup.querySelector(".popup__caption");

const popupImageClose = imagePopup.querySelector(".popup__close");

// Abrir imagen

document.addEventListener("click", (e) => {
  const img = e.target.closest(".cards__image");

  if (!img) return;

  const card = img.closest(".cards__item");

  const title = card.querySelector(".cards__title").textContent;

  popupImage.src = img.src;

  popupImage.alt = title;

  popupCaption.textContent = title;

  imagePopup.classList.add("popup_opened");
});

// Cerrar con X

popupImageClose.addEventListener("click", () => {
  imagePopup.classList.remove("popup_opened");
});

// Cerrar al hacer clic fuera

imagePopup.addEventListener("click", (e) => {
  if (e.target === imagePopup) {
    imagePopup.classList.remove("popup_opened");
  }
});
