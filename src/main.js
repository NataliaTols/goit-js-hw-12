import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions.js";

const formEl = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let currentQuery = "";
let currentPage = 1;
let totalHits = 0;

hideLoadMoreButton();

formEl.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  currentQuery = event.target.elements["search-text"].value.trim();

  if (!currentQuery) {
    iziToast.warning({
      message: "Please enter a search query!",
      position: "topRight",
    });
    return;
  }

    currentPage = 1;
    totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
      const data = await getImagesByQuery(currentQuery, currentPage);
        totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      return;
    }

      createGallery(data.hits);
        if (data.hits.length === 15) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
      createGallery(data.hits);
       const galleryItem = document.querySelector(".gallery-item");
    if (galleryItem) {
      const { height } = galleryItem.getBoundingClientRect();

      window.scrollBy({
        top: height * 2,
        behavior: "smooth",
      });
    }
       const totalLoadedImages =
      document.querySelectorAll(".gallery-item").length;

    if (totalLoadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }
  } catch (error) {
    iziToast.error({
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
  } finally {
    hideLoader();
  }
}
