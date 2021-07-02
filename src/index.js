import './sass/main.scss';
import './js/apiService';
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
  imagesApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
  });
}

function appendImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesTpl(images));
}
