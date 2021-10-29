import lazyLoadImage from './lazyLoadImage';

function generateImage(container, imageName) {
	let img = document.createElement("img");
	document.body.appendChild(img);

	lazyLoadImage(imageName, img);
}

export default generateImage;