const router = require('express').Router();
const { Model } = require('sequelize');
const { User,Post,Comment } = require('../models');
const isAuth = require('../utils/auth');

router.get("/",async (req,res) => {
    try {
        const data = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"]
                }

            ]
        });

        const post = data.map((post) => post.get({ plain: true }));

        res.render("homepage",{
            post,
            logged_in: req.session.logged_in
        });
    } catch (err1) {
        res.status(500).json(err);
    }
});

router.get("/post/:id",async (req,res) => {
    try {
        const data = await Post.findByPk(req.params.id,{
            include: [
                {
                    model: User,
                    attributes: ["name"]
                }
            ]
        });

        const post = data.get({ plain: true });

        res.render("post",{
            ...post,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/profile",withAuth,async (req,res) => {
    try {
        const data = await User.findByPk(req.session.user_id,{
            attributes: { exclude: ["password"] },
            include: [{ model: Post }]
        });

        const user = data.get({ plain: true });

        res.render("profile",{
            ...user,
            logged_in: true
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login",(req,res) => {
    if (req.secure.logged_in) {
        res.redirect("/profile");
        return;
    }

    res.render("login");
});

module.exports = router;