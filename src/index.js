import './sass/main.scss';
import './js/apiService';

import 'material-icons/iconfont/material-icons.css';

import imagesTpl from './tamplates/imagesTpl.hbs';
import ImagesApiService from './js/apiService';

const refs = {
  searchForm: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};
const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.query.value;
  imagesApiService.resetPage();
  imagesApiService
    .fetchImages()
    .then(images => {
      clearGalleryMarkup();
      appendImagesMarkup(images);
    })
    .catch(error => {
      console.log('errors:' + error);
    });
}

function appendImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function clearGalleryMarkup() {
  refs.gallery.innerHTML = '';
}
