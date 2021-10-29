function lazyLoadImage(imageName, img) {
	import(
		/* webpackMode: "lazy-once" */
		`../../assets/cards/dishes/${imageName}`
	)
		.then(src => (img.src = src.default))
		.catch(err => console.error(err));
}

export default lazyLoadImage;