const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createUploader = (folderName, allowedType = /jpeg|jpg|png|gif/, maxMb = 5) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join(__dirname, `..\..\${folderName}`);
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }

            cb(null, destination);
        },

        filename: (req, file, cb) => {
            const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const extension = path.extname(file.originalname).toLocaleLowerCase();
            cb(null, uniqueName + extension);
        }
    });

    const fileFilter = (req, file, cb) => {
        const isExtValid = allowedType.test(path.extname(file.originalname).toLocaleLowerCase());
        const isMimeValid = allowedType.test(file.mimetype);

        if (isExtValid && isMimeValid) {
            cb(null, true);
        }

        cb(new Error("File type not supported!"));
    }

    return multer({
        storage,
        limits: { fileSize: maxMb * 1024 * 1024},
        fileFilter
    });
};

module.exports = createUploader;