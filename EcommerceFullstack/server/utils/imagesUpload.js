const multer = require('multer');
const cloudinaryUpload = require('./cloudinaryUpload');
const uploads = multer({ dest: 'uploads/' })

const imagesUpload = async (req, res, next) => {

    if (req.user.role !== 'admin') {
        return res.status(400).json({ message: 'You are Not Authorised for this Operation' })
    }

    try {

        uploads.array('images')(req, res, (err) => {

            if (err) {
                return res.status(500).json({ message: 'File upload failed', error: err });
            }

            Promise.all(
                req.files.map(file => cloudinaryUpload(file))
            ).then(arr => {
                req.imagestosave = [...arr]
                next();
            }).catch(err => {
                console.log(err.message)
                return res.status(500).json({ message: 'File upload failed', error: err });
            })

        });


    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'File upload failed', error: err });
    }

}

module.exports = imagesUpload