function getImagesNames() {
	let imgs = require.context("../../assets/cards/dishes/", false, /\.png/);

	let importAll = imgs => imgs.keys().map(file => file.match(/[^\/]+$/)[0]);

	return importAll(imgs);
}

export default getImagesNames;