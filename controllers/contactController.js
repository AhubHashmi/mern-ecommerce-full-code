import Contact from '../models/contactModel.js'; // Import your Contact model

export const submitQuery = async (req, res) => {
    const { name, email, query } = req.body;

    try {
        // Save the user's query to your database using the Contact model
        const newQuery = new Contact({ name, email, message: query });
        await newQuery.save();

        res.status(200).json({ success: true, message: "Query submitted successfully!" });
    } catch (error) {
        console.error("Error saving query:", error);
        res.status(500).json({ success: false, message: "Error saving query." });
    }
};

export const getQueries = async (req, res) => {
    try {
        const queries = await Contact.find(); // Fetch all queries from the database
        res.status(200).json({ success: true, data: queries });
    } catch (error) {
        console.error("Error fetching queries:", error);
        res.status(500).json({ success: false, message: "Error fetching queries." });
    }
};

export const getUserQueries = async (req, res) => {
    const userId = req.user._id; // Assuming the authenticated user's ID is available in req.user

    try {
        const queries = await Contact.find({ user: userId }, 'message status'); // Fetch queries for the authenticated user
        res.status(200).json({ success: true, data: queries });
    } catch (error) {
        console.error("Error fetching user queries:", error);
        res.status(500).json({ success: false, message: "Error fetching user queries." });
    }
};

export const markQueryResolved = async (req, res) => {
    const { id } = req.params;

    try {
        const query = await Contact.findByIdAndUpdate(id, { status: 'resolved' }, { new: true });
        if (!query) {
            return res.status(404).json({ success: false, message: "Query not found." });
        }
        res.status(200).json({ success: true, data: query });
    } catch (error) {
        console.error("Error marking query as resolved:", error);
        res.status(500).json({ success: false, message: "Error marking query as resolved." });
    }
};