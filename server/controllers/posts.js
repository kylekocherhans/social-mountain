const { User } = require('../models/user');
const { Post } = require('../models/post');

module.exports = {
    getAllPosts: async (req, res) => {
        console.log("GET ALL POSTS");
        try {
            const posts = await Post.findAll({
                where: {privateStatus: false},
                include: [{
                    model: User,
                    required: true,
                    attributes: ['username']
                }]
            });

            res.status(200).send(posts);
        } catch (err) {
            console.log('ERROR IN getAllPosts');
            console.log(err);
            res.sendStatus(400);
        }
    },

    getCurrentUserPosts: async (req, res) => {
        console.log("GET CURRENT USER POSTS");
        try {
            const { userId } = req.params;
            const posts = await Post.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: ['username']
                }]
            });

            res.status(200).send(posts);
        } catch (err) {
            console.log('ERROR IN getCurrentUserPosts');
            console.log(err);
            res.sendStatus(400);
        }
    },

    addPost: async (req, res) => {
        console.log("ADD POST");
        try {
            const { title, content, status, userId } = req.body;

            await Post.create({
                title: title,
                content: content,
                privateStatus: status,
                userId: userId
            });

            res.sendStatus(200);
        } catch (err) {
            console.log('ERROR IN addPost');
            console.log(err);
            res.sendStatus(400);
        }
    },

    editPost: async (req, res) => {
        console.log("EDIT POST");
        try {
            const { id } = req.params;
            const { status } = req.body;

            await Post.update({privateStatus: status}, {where: {id: +id}});

            res.sendStatus(200);
        } catch (err) {
            console.log('ERROR IN editPost');
            console.log(err);
            res.sendStatus(400);
        }
    },

    deletePost: async (req, res) => {
        console.log("DELETE POST");
        try {
            const { id } = req.params;

            await Post.destroy({where: {id: +id}});

            res.sendStatus(200);
        } catch (err) {
            console.log('ERROR IN deletePost');
            console.log(err);
            res.sendStatus(400);
        }
    }
};