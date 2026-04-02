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

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

// cerrar con X
document.querySelectorAll(".popup__close").forEach((btn) => {
  btn.addEventListener("click", () => {
    closePopup(btn.closest(".popup"));
  });
});

// ----------------------------------------
// TARJETAS
// ----------------------------------------

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const card = template.querySelector(".cards__item").cloneNode(true);

  const img = card.querySelector(".cards__image");
  const title = card.querySelector(".cards__title");
  const likeBtn = card.querySelector(".cards__like-button");
  const deleteBtn = card.querySelector(".cards__delete-button");

  title.textContent = name;
  img.src = link;
  img.alt = name;

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("cards__like-button_active");
  });

  deleteBtn.addEventListener("click", () => {
    card.remove();
  });

  img.addEventListener("click", () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(imagePopup);
  });

  return card;
}

function renderCard(name, link, container) {
  const card = getCardElement(name, link);
  container.prepend(card);
}

// tarjetas iniciales
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

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

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

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = addForm.title.value;
  const link = addForm.image.value;

  renderCard(title, link, list);

  addForm.reset();
  closePopup(popupAdd);
});
