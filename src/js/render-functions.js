import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector(".gallery");
const loaderEl = document.querySelector(".loader");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info">
  <div class="info-item">
    <span class="info-title">Likes</span>
    <span class="info-value">${likes}</span>
  </div>
  <div class="info-item">
    <span class="info-title">Views</span>
    <span class="info-value">${views}</span>
  </div>
  <div class="info-item">
    <span class="info-title">Comments</span>
    <span class="info-value">${comments}</span>
  </div>
  <div class="info-item">
    <span class="info-title">Downloads</span>
    <span class="info-value">${downloads}</span>
  </div>
</div>
      </li>
    `
    )
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = "";
}

export function showLoader() {
  loaderEl.classList.remove("is-hidden");
}

export function hideLoader() {
  loaderEl.classList.add("is-hidden");
}

const loadMoreBtn = document.querySelector(".load-more");

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove("is-hidden");
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add("is-hidden");
}
