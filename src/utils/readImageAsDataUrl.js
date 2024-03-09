const readImageAsDataURL = (file, cb = null) => {
	const reader = new FileReader()

	reader.readAsDataURL(file)
	reader.onload = () => {
		if (cb !== null) {
			cb(reader.result)
		}

		return reader.result
	}
}

export default readImageAsDataURL
