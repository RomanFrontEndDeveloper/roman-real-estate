import multer from 'multer';
import path from 'path';

// 📂 куди зберігати
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},

	// 📝 унікальне імʼя файлу
	filename: (req, file, cb) => {
		const uniqueName = Date.now() + '-' + file.originalname;

		cb(null, uniqueName);
	},
});

export const upload = multer({ storage });
