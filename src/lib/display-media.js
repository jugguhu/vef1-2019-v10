// todo vísa í rétta hluti með import
import getRandomImage from './nasa-api';
import {load, save, clear} from './storage';
// import {empty, el} from './helpers';

let image; // object sem inniheldur núverandi mynd á forsíðu.

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */

function getNewImage() {
    const newImage = getRandomImage();
    newImage.then((data) => showData(data));
};

function showData(data){
    const apod = document.querySelector('.apod');
    const img = apod.querySelector('.apod__image');
    const h2 = apod.querySelector('.apod__title');
    const p = apod.querySelector('.apod__text');

    img.removeAttribute('src');
    h2.textContent ='';
    p.textContent ='';
    h2.appendChild(document.createTextNode(data.title));
    p.appendChild(document.createTextNode(data.explanation));
    img.setAttribute('src',data.hdurl);
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
    const apod = document.querySelector('.apod');
    const img = apod.querySelector('.apod__image');
    const h2 = apod.querySelector('.apod__title');
    const p = apod.querySelector('.apod__text');

    save(img.getAttribute('src'), p.textContent, h2.textContent);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
function clickHandler(e){
    if(e.target == document.getElementById('new-image-button')){
        getNewImage();
    }
    else if(e.target == document.getElementById('save-image-button')){
        saveCurrentImage();
    } else if(e.target == document.getElementById('clear-storage-button')){
        clear();
    }
    else return;
}
export default function init(apod) {
    getNewImage(document.getElementById('new-image-button'));
    apod.addEventListener('click', (e) => {
        clickHandler(e);
    });

}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
    const save = load();
    for(const i of save){
        const section = document.createElement('section');
        document.querySelector('main').appendChild(section);
        section.classList.add('apod');
        const img = document.createElement('img');
        section.appendChild(img);
        img.classList.add('apod__image');
        img.setAttribute('src', i.url);
        const h2 = document.createElement('h2');
        h2.appendChild(document.createTextNode(i.title));
        section.appendChild(h2);
        h2.classList.add('apod__title');
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(i.text));
        section.appendChild(p);
        p.classList.add('apod__text');
        }
    document.querySelector('header').addEventListener('click', (e) => {
        clickHandler(e);
    });
}
