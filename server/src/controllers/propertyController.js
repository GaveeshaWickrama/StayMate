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
    images: section.images.map(img => ({
      url: images[index]?.url || img.url,
    }))
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

module.exports = {
  createProperty,
};




