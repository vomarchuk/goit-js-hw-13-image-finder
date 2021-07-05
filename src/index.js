import './sass/main.scss';
import './js/apiService';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'material-icons/iconfont/material-icons.css';
// import * as basicLightbox from 'basiclightbox';

import { refs } from './js/refs';
import imagesTpl from './tamplates/imagesTpl.hbs';
import ImagesApiService from './js/apiService';

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);
refs.btnLoadMore.classList.add('is-hidden');

async function onSearch(e) {
  e.preventDefault();
  const query = e.currentTarget.elements.query.value;

  if (checkInput(query)) {
    imagesApiService.query = query;
    imagesApiService.resetPage();
    console.log(imagesApiService);
    imagesApiService
      .fetchImages()
      .then(images => {
        clearGalleryMarkup();
        appendImagesMarkup(images);
      })
      .catch(error => {
        console.log('errors:' + error);
      });

    refs.btnLoadMore.classList.remove('is-hidden');
  }
}

function onLoadMore() {
  imagesApiService.incrementPage();
  imagesApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
    handleButtonClick();
  });
}

function appendImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesTpl(images));
}
function clearGalleryMarkup() {
  refs.gallery.innerHTML = '';
}

const hiddenElement = document.getElementById('my-element-selector');
function handleButtonClick() {
  hiddenElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

function checkInput(value) {
  return /[^\s]/gim.test(value);
}
