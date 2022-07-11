// https://stackoverflow.com/a/37826698

const chunk = (array, perChunk) => {
	return array.reduce((acc, item, index) => {
		const chunkIndex = Math.floor(index / perChunk);

		if (!acc[chunkIndex]) acc[chunkIndex] = [];
		acc[chunkIndex].push(item);

		return acc;
	}, []);
};

export default chunk;
