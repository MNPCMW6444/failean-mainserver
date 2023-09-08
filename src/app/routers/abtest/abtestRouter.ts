import express from "express";
import bodyParser from "body-parser";
import {getEmailModel} from "../../mongo-models/abtest/emailModel";

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.post('/email', async (req, res) => {
    try {
        const email = req.body.email;
        const product = req.body.product;
        if (!email || !product) {
            return res.status(400).send('Missing email or product');
        }
        const emailModel = getEmailModel();
        const doc = new emailModel({email, product});
        await doc.save();
        return res.status(200).send('Successfully received data');
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
