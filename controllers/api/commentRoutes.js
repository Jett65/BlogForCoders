const router = require("express").Router();
const { Comment } = require("../../models");
const isAuth = require("../../utils/auth");

router.post("/",async (req,res) => {
    try {
        const data = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json("Not Finessed yet");
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;