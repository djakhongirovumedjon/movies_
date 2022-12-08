import { movies } from '../modules/data.js'

let ul = document.querySelector('.promo__interactive-list')
let searchInp = document.querySelector('#search')
let poster = document.querySelector('.promo__bg')

searchInp.oninput = () => {
    let searchkey = searchInp.value.trim().toLowerCase()

    let filtered = movies.filter(item => {
        let title = item.Title.trim().toLowerCase()

        if (title.includes(searchkey)) {
            return item
        }
    })

    reload(filtered, searchkey)
}

reload(movies)
function reload(arr, val = "") {
    ul.innerHTML = ""
    showPoster(arr[0])
    let re = new RegExp(val, 'g')

    for (let item of arr) {
        let title = item.Title.toLowerCase().replace(re, `<b>${val}</b>`)

        let li = document.createElement('li')
        let del = document.createElement('div')

        li.classList.add('promo__interactive-item')
        del.classList.add('delete')

        li.innerHTML = title
        li.id = item.imdbRating

        li.append(del)
        ul.append(li)

        li.onclick = () => {
            modal.style.display = "block"
            modal_bg.style.display = "block"
            modal_img.src = item.Poster
            hh1.innerHTML = item.Title
            information.innerHTML = item.Plot

            rating_film.innerHTML = item.imdbRating

            body.style.overflow = "hidden"
            setTimeout(() => {
                modal_bg.style.opacity = "1"
                modal.style.opacity = "1"
            }, 200)
            document.querySelector('.rating').setAttribute('data-total-value', Math.round(li.id))
        }

    }
}
let modal_bg = document.querySelector('.modal_bg')
let modal = document.querySelector('.modal')
let modal_img = document.querySelector('.modal_img')
let body = document.body
let hh1 = document.querySelector('.hh1')
let information = document.querySelector('.information')

function showPoster(data) {
    poster.style.backgroundImage = `url(${data.Poster})`
}


modal_bg.onclick = () => {
    modal.style.display = "none"
    modal_bg.style.display = "none"
    modal_bg.style.opacity = "0"
    modal.style.opacity = "0"
    body.style.overflow = ""
}


let rating_film = document.querySelector('.rating_film')
let data_total = document.querySelector('[data-total-value]')
let data_item = document.querySelectorAll('[data-item-value]')
let rating = document.querySelector('.rating')
let rating_item = document.querySelectorAll('.rating_item[data-item-value]')

console.log(rating_item);


rating_item.forEach(li => {
    li.addEventListener('click', () => {
        rating.setAttribute('data-total-value', li.getAttribute('data-item-value'))
    })
});


data_item.forEach(btn => {
    btn.onclick = () => {
        btn === data_total

    }
});

let promo__menu = document.querySelectorAll('.promo__menu-item')


let genre = []
promo__menu.forEach(btn => {
    btn.onclick = (e) => {
        genre = []
        for (let item of movies) {
            if (item.Genre.includes(btn.innerHTML)) {
                genre.push(item)
                reload(genre)
            }else if (btn.innerHTML === "Фильмы"){
            reload(movies)}
        }
        promo__menu.forEach(m => m.classList.remove('promo__menu-item_active'))

        btn.classList.add('promo__menu-item_active')
        
        
        
    }

});





