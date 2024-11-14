import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api';
import {
  renderImages,
  showLoading,
  hideLoading,
  showNoResultsMessage,
  showError,
  showEndOfResultsMessage,
  toggleLoadMoreButton,
} from './js/render-functions';

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

document
  .getElementById('search-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();
    currentQuery = document.getElementById('search-input').value.trim();
    currentPage = 1;
    totalHits = 0;

    if (!currentQuery) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search query.',
      });
      return;
    }

    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    toggleLoadMoreButton(false);

    try {
      showLoading();
      const data = await fetchImages(currentQuery, currentPage);
      hideLoading();

      totalHits = data.totalHits;

      if (data.hits.length === 0) {
        showNoResultsMessage();
      } else {
        renderImages(data.hits);
        toggleLoadMoreButton(data.hits.length >= 15);
      }
    } catch (error) {
      showError('Something went wrong. Please try again later.');
      console.error('Error fetching images:', error);
      hideLoading();
    }
  });

document
  .getElementById('load-more')
  .addEventListener('click', async function () {
    currentPage += 1;

    try {
      showLoading();
      const data = await fetchImages(currentQuery, currentPage);
      hideLoading();

      if (data.hits.length === 0) {
        showEndOfResultsMessage();
        toggleLoadMoreButton(false);
      } else {
        renderImages(data.hits);

        const galleryItems = document.querySelectorAll('.gallery a');
        const lastItem = galleryItems[galleryItems.length - 1];
        const { height: cardHeight } = lastItem.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });

        if (data.hits.length < 15 || currentPage * 15 >= totalHits) {
          showEndOfResultsMessage();
          toggleLoadMoreButton(false);
        }
      }
    } catch (error) {
      showError('Something went wrong. Please try again later.');
      console.error('Error fetching images:', error);
      hideLoading();
    }
  });
