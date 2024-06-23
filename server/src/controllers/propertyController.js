const Property = require('../models/propertyModel');

// Create a new property
async function createProperty(req, res) {
    const { title, description, type, total_unique_sections, sections, location } = req.body;

    // Extract host_id from the token payload
    const host_id = req.user.userId;

    if (!host_id || !title || !description || !type || !total_unique_sections || !sections || !location) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const property = new Property({
            host_id,
            title,
            description,
            type,
            total_unique_sections,
            sections,
            location
        });

        const newProperty = await property.save();
        res.status(201).json(newProperty);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    createProperty,
};
