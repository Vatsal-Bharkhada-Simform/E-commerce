export function getImageString(file: FileList): Promise<string> {
	return new Promise((resolve, reject) => {
		if (file.length === 0) {
			reject(new Error("Invalid file object"));
			return;
		}

		const image = file[0];

		if (!image) {
			reject(new Error("Image file not found!"));
			return;
		}

		const reader = new FileReader();

		reader.onload = () => {
			if (typeof reader.result !== "string") {
				reject(new Error("Failed to load image"));
				return;
			}

			resolve(reader.result);
		};

		reader.onerror = () => {
			reject(
				new Error("Failed to read the image file. Please try again.")
			);
		};

		reader.readAsDataURL(image);
	});
}
