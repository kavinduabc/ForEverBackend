import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function rejisterUser(req, res) {
    const data = req.body;
    data.password = bcrypt.hashSync(data.password, 10);
    const newUser = new User(data);

    newUser.save()
        .then(() => {
            res.json({ message: "User registration successful" });
        })
        .catch((error) => {
            res.status(500).json({ error: "User registration failed" });
        });
}

export function userLogin(req, res) {
    const data = req.body;

    User.findOne({ email: data.email }).then(user => {
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

        if (isPasswordCorrect) {
            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email
                },
                process.env.JWT_SECRET || "default_secret", // Make sure to define JWT_SECRET in .env
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                message: "Login successful",
                token
            });
        } else {
            return res.status(401).json({ message: "Incorrect password" });
        }
    }).catch(err => {
        return res.status(500).json({ message: "Server error", error: err });
    });
}
