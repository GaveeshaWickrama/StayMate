const Property = require('../models/propertyModel');

// Create a new property
async function createProperty(req, res) {
    const { host_id, title, description, type, total_unique_sections, sections, location } = req.body;

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

// Get all properties
async function getAllProperties(req, res) {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get a single property by ID
async function getProperty(req, res) {
    const { id } = req.params;

    try {
        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Update a property by ID
async function updateProperty(req, res) {
    const { id } = req.params;
    const { host_id, title, description, type, total_unique_sections, sections, location } = req.body;

    try {
        const updatedProperty = await Property.findByIdAndUpdate(
            id,
            {
                host_id,
                title,
                description,
                type,
                total_unique_sections,
                sections,
                location
            },
            { new: true }
        );

        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(updatedProperty);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Delete a property by ID
async function deleteProperty(req, res) {
    const { id } = req.params;

    try {
        const deletedProperty = await Property.findByIdAndDelete(id);
        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json({ message: 'Property deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get properties by coordinates
async function getPropertiesByCoordinates(req, res) {
    const { longitude, latitude, maxDistance } = req.query;

    if (!longitude || !latitude || !maxDistance) {
        return res.status(400).json({ message: 'Longitude, latitude, and maxDistance are required' });
    }

    try {
        const properties = await Property.find({
            'location.coordinates': {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: parseFloat(maxDistance) // Distance in meters
                }
            }
        });

        res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    createProperty,
    getAllProperties,
    getProperty,
    updateProperty,
    deleteProperty,
    getPropertiesByCoordinates
};
