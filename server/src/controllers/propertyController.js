const Property = require('../models/propertyModel');
const path = require('path');

async function createProperty(req, res) {
  console.log('Decoded user:', req.user); // Log decoded user
  console.log('User role:', req.user.role); // Log user role
  console.log('Request body:', req.body); // Log request body
  console.log('Request files:', req.files); // Log request files

  const { title, description, type, total_unique_sections, sections: sectionsString, location } = req.body;

  // Extract host_id from the token payload
  const host_id = req.user.userId;

  if (!host_id || !title || !description || !type || !total_unique_sections || !sectionsString || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Parse sections string back into an object
  let sections;
  try {
    sections = JSON.parse(sectionsString);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid sections format' });
  }

  // Handle file uploads
  const images = req.files ? req.files.map(file => ({ url: path.join('uploads', file.filename) })) : [];

  // Associate images with their respective sections
  sections = sections.map((section, index) => ({
    ...section,
    images: section.images ? section.images.map((img, imgIndex) => ({
      url: images[imgIndex]?.url || img.url,
    })) : []
  }));

  try {
    const property = new Property({
      host_id,
      title,
      description,
      type,
      total_unique_sections,
      sections,
      location,
      images
    });

    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  
}

async function getPropertiesByHostId(req, res) {
  const hostId = req.user.userId;

  try {
    const properties = await Property.find({ host_id: hostId });
    if (!properties.length) {
      return res.status(404).json({ message: 'No properties found for this host.' });
    }

    console.log('Properties found:', properties); // Log the properties

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}



module.exports = {
  createProperty,
  getPropertiesByHostId,
};




