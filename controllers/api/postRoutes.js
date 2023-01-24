const router = require("express").Router();
const { Post } = require("../../models");
const isAuth = require(".../.../utils/auth");

router.post("/",async (req,res) => {
    try {
        const data = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete("/:id",isAuth,async (roq,res) => {
    try {
        const data = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!data) {
            res.status(400).json({ message: "Post Not Found!" });
        }

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete;