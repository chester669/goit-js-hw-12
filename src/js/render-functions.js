import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox;

export function renderImages(images) {
  const gallery = document.getElementById('gallery');
  const imageElements = images
    .map(image => {
      return `
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}">
          <div>
            <p>Likes: ${image.likes}</p>
            <p>Views: ${image.views}</p>
            <p>Comments: ${image.comments}</p>
            <p>Downloads: ${image.downloads}</p>
          </div>
        </a>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', imageElements);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a');
  }
}

export function showLoading() {
  document.getElementById('loading').style.display = 'block';
}

export function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

export function showNoResultsMessage() {
  iziToast.info({
    title: 'Info',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
}

export function showError(message) {
  iziToast.error({ title: 'Error', message });
}

export function showEndOfResultsMessage() {
  iziToast.info({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
  });
}

export function toggleLoadMoreButton(show) {
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.style.display = show ? 'block' : 'none';
}
