// const searchControls = document.querySelector('.search-controls');
// const searchInput = document.querySelector('.search-input');


// function customHttp(url) {

//     // console.log(url);

//     return {
//         get(url, cb) {
//             console.log(url);
//             const xhr = new XMLHttpRequest()
//             xhr.open('GET', url);
//             xhr.send();

//             xhr.addEventListener('load', () => {
//                 const response = JSON.parse(xhr.responseText);
//                 cb(response);
//                 // console.log(response);

//             });
//         }
//     }
// }



// function myHttpRequest({ method, url } = {}, cb) {

//     try {
//         const xhr = new XMLHttpRequest()
//         xhr.open(method, url);
//         xhr.addEventListener('load', () => {
//             if (Math.floor(xhr.status / 100) !== 2) {
//                 cb(`Помилка. status code: ${xhr.status} `, xhr)
//                 return
//             }
//             const response = JSON.parse(xhr.responseText);
//             cb(null, response)
//         })
//         xhr.addEventListener('error', () => {
//             console.log('error');
//         })
//     } catch (error) {
//         cb(error)
//     }

//     xhr.send()

// }


// myHttpRequest(
//     {
//         method: 'GET',
//         url: 'https://jsonplaceholder.typicode.com/posts',
//     },
//     (err, res) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(res);
//     }
// )


// function http() {
//     return {
//         get(url, cb) {
//             try {
//                 const xhr = new XMLHttpRequest()
//                 xhr.open("GET", url);
//                 xhr.addEventListener('load', () => {
//                     if (Math.floor(xhr.status / 100) !== 2) {
//                         cb(`Помилка. status code: ${xhr.status} `, xhr)
//                         return
//                     }
//                     const response = JSON.parse(xhr.responseText);
//                     cb(null, response)
//                 })
//                 xhr.addEventListener('error', () => {
//                     console.log('error');
//                 })
//                 xhr.send()
//             } catch (error) {
//                 cb(error)
//             }


//         },


//     }
// }


// const myHttp = http();

// // console.log(myHttp.get());
// myHttp.get('https://jsonplaceholder.typicode.com/posts', (error, resp) => {
//     console.log(resp);
// });

// const http = customHttp();





const searchControls = document.querySelector('.search-controls');
const searchInput = document.querySelector('.search-input');

// const searchForm = document.querySelector('#search-form')

// const form = document.forms['search-form']
// const countrySelect = form.elements('')

function customHttp() {
    return {
        get(url, cb) {
            try {
                const xhr = new XMLHttpRequest()
                xhr.open("GET", url);
                xhr.addEventListener('load', () => {
                    if (Math.floor(xhr.status / 100) !== 2) {
                        cb(`Помилка. status code: ${xhr.status} `, xhr)
                        return
                    }
                    const response = JSON.parse(xhr.responseText);
                    cb(null, response)
                })
                xhr.addEventListener('error', () => {
                    console.log('error');
                })
                xhr.send()
            } catch (error) {
                cb(error)
            }


        },


    }
}



const http = customHttp();



const newService = (function () {
    const apiKey = 'a6f51aabf284424693830e0e5b01af0a';
    const apiUrl = 'https://newsapi.org/v2';



    return {
        topHeadlines(country = 'ua', cb) {
            http.get(`${apiUrl}/top-headlines?country=${country}&category=technology&apiKey=${apiKey}`, cb);
        },
        everything(query, cb) {

            http.get(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`, cb);
        }
    }

})();


// base news function


function loadNews() {
    newService.topHeadlines('ua', onGetResponse)
}

// get response function

function onGetResponse(err, res) {
    // console.log(res);
    // console.log(err);

    console.log('sdfsdf');
    renderNews(res)
}


//  dom loaded

document.addEventListener('DOMContentLoaded', function () {
    loadNews();
})


// render new function

function renderNews(news) {
    const newsContainer = document.querySelector('.news-section__container');
    console.log(news);
    let fragment = '';
    news.articles.forEach(newsItem => {
        const el = newsTemplate(newsItem)
        fragment += el
    });

    newsContainer.insertAdjacentHTML('afterbegin', fragment)
}


function newsTemplate({ urlToImage, title, url, description }) {

    return `
    <div class="card-news">
    <div class="card-news__img">
        <img src="${urlToImage}" alt="">
    </div>
    <div class="card-news__content">
    <div class="card-news__title">${title || ''}</div>
    <div class="cards-news__desc">
        ${description || ''}
    </div>
    <a href="${url}" class="card-news__btn">Переглянути</a>
</div>
</div>
    `
}