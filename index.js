import{a as S,S as b,i}from"./assets/vendor-DvfmeZXB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const q="54240480-a4799bfc66af4dde196d1db7d",P="https://pixabay.com/api/";async function f(s,t=1){return(await S.get(P,{params:{key:q,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}const m=document.querySelector(".gallery"),p=document.querySelector(".loader"),B=new b(".gallery a",{captionsData:"alt",captionDelay:250});function g(s){const t=s.map(({webformatURL:a,largeImageURL:r,tags:e,likes:o,views:n,comments:L,downloads:w})=>`
      <li class="gallery-item">
        <a href="${r}">
          <img src="${a}" alt="${e}" />
        </a>
        <div class="info">
  <div class="info-item">
    <span class="info-title">Likes</span>
    <span class="info-value">${o}</span>
  </div>
  <div class="info-item">
    <span class="info-title">Views</span>
    <span class="info-value">${n}</span>
  </div>
  <div class="info-item">
    <span class="info-title">Comments</span>
    <span class="info-value">${L}</span>
  </div>
  <div class="info-item">
    <span class="info-title">Downloads</span>
    <span class="info-value">${w}</span>
  </div>
</div>
      </li>
    `).join("");m.insertAdjacentHTML("beforeend",t),B.refresh()}function E(){m.innerHTML=""}function h(){p.classList.remove("is-hidden")}function y(){p.classList.add("is-hidden")}const v=document.querySelector(".load-more");function M(){v.classList.remove("is-hidden")}function u(){v.classList.add("is-hidden")}const $=document.querySelector(".form"),R=document.querySelector(".load-more");let l="",c=1,d=0;u();$.addEventListener("submit",I);R.addEventListener("click",O);async function I(s){if(s.preventDefault(),l=s.target.elements["search-text"].value.trim(),!l){i.warning({message:"Please enter a search query!",position:"topRight"});return}c=1,d=0,E(),u(),h();try{const t=await f(l,c);if(d=t.totalHits,t.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(t.hits),t.hits.length===15&&M()}catch{i.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{y()}}async function O(){c+=1,h();try{const s=await f(l,c);g(s.hits);const t=document.querySelector(".gallery-item");if(t){const{height:r}=t.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}document.querySelectorAll(".gallery-item").length>=d&&(u(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{i.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{y()}}
//# sourceMappingURL=index.js.map
