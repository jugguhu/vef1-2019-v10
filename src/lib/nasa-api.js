
/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = 'V2Gm93GuZ7G4fQysJ9YRDwe3VZqjaPNJQtCRUFsm';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod';


/* 
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage() {
  let newDate = randomDate(new Date(1995,6,16), new Date());
  let date = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`;
  console.log(date);
  const result = await fetch(`${URL}?api_key=${API_KEY}&date=${date}`)
  const data = await result.json();
  return data;
}

function randomDate(start, end) {
  let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  if(date.getMonth === 1 && date.getMonth === 0 && date.getDate === 29 && date.getFullYear%100 !== 0){
    if(date.getFullYear%400 !== 0){
    randomDate(start, end);
    }
  }
  return date;
}

