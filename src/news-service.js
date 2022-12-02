import { Notify } from "notiflix";
import axios from 'axios';
export default class NewsAptService {

    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchArticles() {
        
        const url = `https://pixabay.com/api/?key=31729330-76a93a375c4da5def12e352a3&q=${this.searchQuery}&page=${this.page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`;

         try {
    const response = await axios.get(url);
        //  console.log(response.data);
        this.incrementPage();
        return response
  } catch (error) {
    return Notify.failure("Oops, there is no country with that name");
  }
         
            // .then(r => r.json())
            // .then(data => {
            //     // console.log(data.hits.length);
                
            //     this.incrementPage();
            // //     // console.log(data.totalHits);
            // //     return data;
            // }).catch(err => {});
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}



// export default function newsApiService {
 
// }
//    constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//     }

//     fetchArticles() {
        

// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// export default function fetchCountries(searchСountry) {
// const options = {
//             headers: {
//                 Authorization: '31729330-76a93a375c4da5def12e352a3',
//             },
//         };
//         const url = `https://pixabay.com/api/?q=${}&per_page=${}`;

//         fetch(url, options).then(r => r.json()).then(data => {
//             this.incrementPage();
//         });
//     }
    // return fetch(`https://restcountries.com/v3.1/name/${searchСountry}?fields=name,capital,population,flags,languages`)
// .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })

//     .catch(err => {return Notify.failure("Oops, there is no country with that name")});
// }
