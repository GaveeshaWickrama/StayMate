const Property = require("../models/propertyModel");
const path = require("path");

async function createProperty(req, res) {
  try {
    console.log('Decoded user:', req.user);
    console.log('User role:', req.user.role);
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Check if req.files is an object
    if (req.files && typeof req.files === 'object') {
      console.log('Request files:', Object.keys(req.files).map(key => {
        return req.files[key].map(file => ({
          originalname: file.originalname,
          filename: file.filename,
          mimetype: file.mimetype,
          size: file.size,
          path: file.path
        }));
      }));
    }

    const { 
      title, 
      description, 
      type, 
      total_unique_sections, 
      sections: sectionsString, 
      location, 
      amenities 
    } = req.body;

    const host_id = req.user.userId;

    if (!host_id || !title || !description || !type || !total_unique_sections || !sectionsString || !location || !amenities) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('Amenities:', amenities);

    let sections;
    try {
      sections = JSON.parse(sectionsString);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid sections format' });
    }

    // Log the file part of each image in sections, or 'empty' if the file is empty
    sections.forEach((section, sectionIndex) => {
      console.log(`Section ${sectionIndex}: ${JSON.stringify(section, null, 2)}`);
      if (section.images && section.images.length > 0) {
        section.images.forEach((image, imageIndex) => {
          console.log(`Section ${sectionIndex} Image ${imageIndex} File:`, image.file && Object.keys(image.file).length > 0 ? image.file : 'empty');
        });
      }
    });

    const images = req.files.images ? req.files.images.map(file => ({ url: path.join('uploads/properties', file.filename) })) : [];
    const sectionImages = req.files.section_images ? req.files.section_images.map(file => ({ url: path.join('uploads/properties', file.filename) })) : [];
    
    let imageIndex = 0;

    sections = sections.map((section) => {
      if (section.images && section.images.length > 0) {
        section.images = section.images.map(() => {
          const img = sectionImages[imageIndex];
          console.log(`Assigning image to section ${section.section_name}:`, img.url);
          imageIndex++;
          return { url: img.url };
        });
      } else {
        throw new Error(`Section ${section.section_name} is missing images.`);
      }
      return section;
    });

    const property = new Property({
      host_id,
      title,
      description,
      type,
      total_unique_sections,
      sections,
      location,
      images,
      amenities: Array.isArray(amenities) ? amenities : amenities.split(',').map(a => a.trim())
    });

    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
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

async function getPropertyById(req, res) {
  const propertyId = req.params.id;

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// async function getAllProperties(req, res) {
//   try {
//     const properties = await Property.find({});
//     if (!properties.length) {
//       return res.status(404).json({ message: 'No properties found.' });
//     }

//     console.log('All properties found:', properties); // Log all properties

//     res.status(200).json(properties);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }

async function getPropertyHostById(req, res) {
  const propertyId = req.params.id;

  try {
    // Find the property by its ID
    const property = await Property.findById(propertyId).populate('host_id', 'nicPassport phone gender firstName lastName createdOn');
    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    // Get the host details from the populated `host_id` field
    const host = property.host_id;
    if (!host) {
      return res.status(404).json({ message: 'Host not found for this property.' });
    }

    // Return the host details
    res.status(200).json(host);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getAllProperties(req, res) {
  const { latitude, longitude, radius, page = 1, limit = 1000 } = req.query;

  let query = {};
  if (latitude && longitude && radius) {
    query = {
      "location.coordinates": {
        $geoWithin: {
          $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], parseFloat(radius) / 3963.2] // Convert radius to radians
        }
      }
    };
  }

  try {
    const properties = await Property.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalProperties = await Property.countDocuments(query);

    if (!properties.length) {
      return res.status(404).json({ message: 'No properties found.' });
    }

    console.log('Properties found:', properties); // Log the properties

    res.status(200).json({
      properties,
      totalPages: Math.ceil(totalProperties / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createProperty,
  getPropertiesByHostId,
  getPropertyById,
  getAllProperties,
  getPropertyHostById, // Add this line
};
