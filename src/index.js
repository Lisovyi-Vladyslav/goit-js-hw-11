
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewsAptService from './news-service';

const refs = {

    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),

};

const newsApiService = new NewsAptService();
let totalHits = 0;
// console.log(newsApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
e.preventDefault();
const {
    elements: { searchQuery }
  } = e.currentTarget;
    newsApiService.query = searchQuery.value;
    newsApiService.resetPage();


    if (searchQuery.value === '') {
        Notify.info('What exactly do we search?');
        hideLoadBtn();
        return
    }

    newsApiService.fetchArticles()
        .then(articles => {    
            refs.gallery.innerHTML = '';
            if (articles.hits.length === 0) {
                    return Notify.failure("Oops, there is no country with that name")
            } 
            totalHits = 0;
            totalHits += articles.hits.length;
            renderCountryInfo(articles.hits);
           
            showLoadBtn();
        });

}

function onLoadMore() {
    newsApiService.fetchArticles()
        .then(articles => {
            totalHits += articles.hits.length;
             console.log(totalHits);
            if (totalHits === articles.totalHits) {
                hideLoadBtn();
                return Notify.failure("We're sorry, but you've reached the end of search results.");
            }
            renderCountryInfo(articles.hits);
            console.log(articles.hits);
})
           

}

function renderCountryInfo(articles) {
    const markup = articles.map(({webformatURL, tags, likes, views, comments, downloads}) => {
        return `
      <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" height="150"/>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>
                `;
    }).join('');
    
   refs.gallery.insertAdjacentHTML("beforeend", markup);
}

    
    
    
    
    
    
  function showLoadBtn() {
    refs.loadMoreBtn.classList.remove("visually-hidden")
    };

function hideLoadBtn() {
    refs.loadMoreBtn.classList.add("visually-hidden");
    }
