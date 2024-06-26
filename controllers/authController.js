import JWT from "jsonwebtoken";
import { comparePswrd, hashPswrd } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import contactModel from '../models/contactModel.js'; // Import your Contact model

export const regController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        if (!name) {
            return res.send({ message: "Name Required!" })
        }
        if (!email) {
            return res.send({ message: "Email Required!" })
        }
        if (!password) {
            return res.send({ message: "Password Required!" })
        }
        if (!phone) {
            return res.send({ message: "Phone Required!" })
        }
        if (!address) {
            return res.send({ message: "Address Required!" })
        }
        if (!answer) {
            return res.send({ message: "Answer Required!" })
        }

        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(200).send({
                success: false,
                message: "User already registered, Please Login!",
            });
        }

        const hashedPswrd = await hashPswrd(password);

        const user = await new userModel({
            name, email, password: hashedPswrd, phone, address, answer
        }).save();

        res.status(201).send({
            success: true,
            message: "User Registered Successfully!", user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration!", error,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password!",
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found, please register!",
            });
        }

        const match = await comparePswrd(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password!",
            });
        }

        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "365 days" },);
        res.status(200).send({
            success: true,
            message: "Login successfully!",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            }, token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Login Error!", error,
        });
    }
};

//forgotpasswordcontroller
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: 'Email required' })
        }
        if (!answer) {
            res.status(400).send({ message: 'Question required' })
        }
        if (!newPassword) {
            res.status(400).send({ message: 'New Password is required' })
        }
        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Question",
            });
        }
        const hashed = await hashPswrd(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        });
    }
};

export const testController = async (req, res) => {
    try {
        res.send("Protected Route");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};

//orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Getting Orders",
            error,
        });
    }
};

//all orders
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: "-1" });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//order status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};

//update prfole
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPswrd(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};

export const getUserQueriesController = async (req, res) => {
    const userId = req.user._id; // Assuming the authenticated user's ID is available in req.user

    try {
        const queries = await contactModel.find({ user: userId }).select('message status'); // Fetch only the message and status fields
        res.status(200).json(queries);
    } catch (error) {
        console.error("Error fetching user queries:", error);
        res.status(500).json({ error: "Error fetching user queries." });
    }
};