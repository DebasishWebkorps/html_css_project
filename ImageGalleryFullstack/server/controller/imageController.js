const { default: mongoose } = require('mongoose')
const Images = require('../models/images')
const User = require('../models/user')

exports.getAllImages = async (req, res, next) => {
    try {
        if (!req.userId) {
            return res.status(404).json({ message: 'Invalid Token' })
        }


        const images = await Images.find()

        const result = images.map(image => ({
            _id: image._id,
            url: image.url,
            uid: image.uid,
            likedCount: image.liked.length,
            isLiked: image.liked.includes(req.userId),
            // role
        }));

        return res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'some error occured' })
    }
}

exports.getMyImages = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(404).json({ message: 'Invalid Token' })
        }

        const id = req.userId

        const myImage = await Images.find({ uid: id })


        const result = myImage.map(image => ({
            _id: image._id,
            url: image.url,
            uid: image.uid,
            likedCount: image.liked.length,
            isLiked: image.liked.includes(req.userId),
        }));



        return res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'some error occured' })
    }
}


exports.getLikedImages = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(404).json({ message: 'Invalid Token' })
        }

        const id = req.userId
        const user = await User.findById(id, { password: 0 })


        const likedImage = await Promise.all(
            user.likes.map(async (like) => {
                const image = await Images.findById(like);
                return image
            })
        );



        const result = likedImage?.filter(img => img !== null)
            .map(image => ({
                _id: image._id,
                url: image.url,
                uid: image.uid,
                likedCount: image.liked.length,
                isLiked: image.liked.includes(req.userId),
            }));

        return res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'some error occured' })
    }
}


exports.putLike = async (req, res) => {

    try {

        const { userId } = req
        const { imgId } = req.body

        const user = await User.findById(userId)

        const image = await Images.findById({ _id: imgId })
        const existingLiked = [...image.liked]
        const objIdUserId = new mongoose.Types.ObjectId(userId)

        const exists = existingLiked.some(id => id.equals(objIdUserId));


        if (!exists) {
            existingLiked.push(userId)
            await image.updateOne({ liked: existingLiked })
        } else {
            const updatedLiked = existingLiked.filter(like => !like.equals(userId));
            await image.updateOne({ liked: updatedLiked })
        }


        const isLikedByUser = user.likes.includes(imgId)

        if (isLikedByUser) {
            const updatedLikes = user.likes.filter(like => like !== imgId)
            await user.updateOne({ likes: updatedLikes })
        } else {
            await user.updateOne({ likes: [...user.likes, imgId] })
        }

        return res.status(200).json({ message: 'process successfull' })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Some error occured' })
    }


}

exports.deleteImage = async (req, res) => {


    const { imgId } = req.params
    const id = req.userId
    try {
        const { role } = await User.findById(id, { role: 1 })

        if (role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to delete' })
        }

        const deletedImage = await Images.findByIdAndDelete({ _id: imgId })
        if (!deletedImage) {
            return res.status(404).json({ message: 'Some Error Occured' });
        }
        return res.status(200).json({ message: 'Image Deleted Successfully', deletedImage })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Some Error Occured' });
    }


}