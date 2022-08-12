const $imageContainer = document.querySelector('.image-container');
const $favoritesLink = document.querySelector('.favorites-link');
$favoritesLink.addEventListener('click', viewFavorites);
const $button = document.querySelector('BUTTON');
$button.addEventListener('click', handleClick);
const $icon = document.querySelector('.icon');
$icon.addEventListener('click', iconClick);
const $favorites = document.querySelector('.favorites');
const $favoritesViewText = document.querySelector('.favorites-view-text');
const notes = document.createElement('textarea');
notes.setAttribute('id', 'notes');
notes.textContent = notes.value;
let currentImage;
const noteDate = Date(Date.now());

function handleClick(event) {
  data.view = 'home-page';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://random.dog/woof.json');
  xhr.responseType = ('json');
  xhr.addEventListener('load', function () {
    data.view = 'home-page';
    const img = document.querySelector('.image');
    img.setAttribute('src', xhr.response.url);
    currentImage = xhr.response.url;
  });
  xhr.send();
}
let favoriteObject;
function iconClick(event) {
  data.view = 'home-page';
  $icon.classList.toggle('clicked');
  favoriteObject = {
    id: data.nextEntryId,
    photoUrl: currentImage,
    FavoriteDate: 'Favorite created: ' + noteDate.toString()
  };
  data.nextEntryId++;
  data.favorites.push(favoriteObject);
  // $favorites.prepend(renderImages(favoriteObject));

}

function viewHomePage() {
  data.view = 'home-page';
  // stayOnSamePageAfterRefresh();
}
function stayOnSamePageAfterRefresh() {
  if (data.view === 'favorites') {
    viewFavorites();
  }
  viewHomePage();
}
function renderImages(favorites) {
  const saveBtn = document.createElement('button');
  saveBtn.addEventListener('click', handleSubmit);
  saveBtn.className = ('save-btn');
  saveBtn.textContent = 'SAVE';
  saveBtn.setAttribute('data-id', favorites.id);
  const colHalfdiv = document.createElement('div');
  colHalfdiv.setAttribute('class', 'column');
  colHalfdiv.setAttribute('data-id', favorites.id);
  const image = document.createElement('img');
  image.className = 'dom-image';
  image.setAttribute('src', favorites.photoUrl);
  const h6 = document.createElement('h2');
  h6.textContent = 'Notes:';
  const textarea = document.createElement('textarea');
  textarea.setAttribute('id', `notes-${favorites.id}`);
  textarea.setAttribute('data-id', favorites.id);
  const trashIcon = document.createElement('i');
  trashIcon.className = 'fa-solid fa-trash-can';
  trashIcon.setAttribute('id', `trash-${favorites.id}`);
  trashIcon.setAttribute('data-id', favorites.id);
  trashIcon.addEventListener('click', showModal);
  const paragrpah = document.createElement('p');
  paragrpah.setAttribute('id', 'date');
  paragrpah.textContent = favorites.FavoriteDate;
  const notesCreated = document.createElement('p');
  notesCreated.setAttribute('id', 'notes-date');
  notesCreated.textContent = favorites.Notesdate;

  // pre fill text content
  textarea.textContent = favorites.notes;
  const editIcon = document.createElement('i');
  editIcon.className = 'fas fa-pen';
  colHalfdiv.appendChild(image);
  colHalfdiv.appendChild(h6);
  colHalfdiv.appendChild(textarea);
  colHalfdiv.appendChild(saveBtn);
  colHalfdiv.appendChild(trashIcon);
  h6.appendChild(paragrpah);
  paragrpah.appendChild(notesCreated);
  return colHalfdiv;
}
window.addEventListener('DOMContentLoaded', domContentLoaded);
function domContentLoaded(event) {
  for (let i = 0; i < data.favorites.length; i++) {
    if (data.favorites[i] !== null) {
      const entry = renderImages(data.favorites[i]);
      $favorites.appendChild(entry);
    }
  }
}

function viewFavorites(event) {
  data.view = 'favorites';
  $imageContainer.classList.add('hidden');
  $button.classList.add('hidden');
  $button.textContent = 'Favorites';
  $favorites.classList.remove('hidden');
  $favoritesViewText.classList.remove('hidden');
  // if (data.favorites.length === 0) {
  //   $favoritesViewText = 'Nothing has been favorited';
  // }
}
stayOnSamePageAfterRefresh();

var newFavoriteObject;

function handleSubmit(event) {
  event.preventDefault();
  const dataId = event.target.getAttribute('data-id');
  const notes = document.getElementById(`notes-${dataId}`).value;
  const datasetId = Number(document.getElementById(`notes-${dataId}`).dataset.id);
  const dateNumber = Date(Date.now());
  newFavoriteObject = {
    id: datasetId,
    photoUrl: data.favorites[Number(dataId)].photoUrl,
    notes,
    FavoriteDate: 'Favorite created: ' + dateNumber.toString(),
    Notesdate: 'Created Notes: ' + noteDate.toString()
  };

  data.nextEntryId++;
  data.favorites[datasetId] = newFavoriteObject;

}

function deleteEntry(event) {
  const dataId = event.target.getAttribute('data-id');
  const datasetId = Number(document.getElementById(`trash-${dataId}`));
  const favorites = document.querySelectorAll('.column');
  for (let i = 0; i < data.favorites.length; i++) {
    var favoritesIdValue = favorites[i].getAttribute('data-id');
    var parsedValue = parseInt(favoritesIdValue);
    if (datasetId === parsedValue) {
      data.favorites.splice(i, 1);
      favorites[i].remove();
      viewFavorites();
    }
  }
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
const modal = document.querySelector('#modal');
const overlay = document.querySelector('#overlay');
const confirmModal = document.querySelector('#confirm-modal');
confirmModal.addEventListener('click', deleteEntry);
const cancelBtn = document.querySelector('#close-modal-btn');
cancelBtn.addEventListener('click', removeEntry);
$favorites.addEventListener('click', showModal);

function showModal(event) {
  if (event.target.tagName === 'I') {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }
}

function removeEntry(event) {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');

}

const homeText = document.querySelector('.home');
homeText.addEventListener('click', clickHome);
function clickHome(event) {
  data.view = 'home-page';
  $favorites.classList.add('hidden');
  $favoritesViewText.className = 'hidden';
  $imageContainer.classList.remove('hidden');
  $button.classList.remove('hidden');
  $button.textContent = 'Get Random Dog Image';
}
