import getImagesNames from './getImagesNames';
import generateImage from './generateImage';

let images = document.querySelector("#images");
let imagesNames = getImagesNames();
console.log(imagesNames);

imagesNames.forEach(name => generateImage(images, name));