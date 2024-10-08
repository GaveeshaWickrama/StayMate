const Property = require("../models/propertyModel");
const PropertyVerified = require("../models/propertyverifiedModel");
const path = require("path");

async function createProperty(req, res) {
  try {
    const { 
      title, 
      description, 
      type, 
      total_unique_sections, 
      sections: sectionsString, 
      location, 
      amenities: amenitiesString,
      additionalDetails
    } = req.body;

    const host_id = req.user.userId;

    if (!host_id || !title || !description || !type || !total_unique_sections || !sectionsString || !location || !amenitiesString) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let sections;
    let amenities;
    try {
      sections = JSON.parse(sectionsString);
      amenities = JSON.parse(amenitiesString);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid JSON format' });
    }

    const images = req.files.images ? req.files.images.map(file => ({ url: path.join('uploads/properties', file.filename) })) : [];
    const sectionImages = req.files.section_images ? req.files.section_images.map(file => ({ url: path.join('uploads/properties', file.filename) })) : [];
    const amenityImages = req.files.amenity_images ? req.files.amenity_images.map(file => ({ url: path.join('uploads/properties', file.filename) })) : [];
    
    let imageIndex = 0;
    let amenityImageIndex = 0;

    // Handle sections and their images
    sections = sections.map((section) => {
      if (section.images && section.images.length > 0) {
        section.images = section.images.map(() => {
          const img = sectionImages[imageIndex];
          imageIndex++;
          return { url: img.url };
        });
      } else {
        section.images = images;
      }

      // Process section-level amenities and assign images
      section.amenities = section.amenities.map((amenity) => {
        if (amenityImages[amenityImageIndex]) {
          amenity.image = { url: amenityImages[amenityImageIndex].url };
          amenityImageIndex++;
        }
        return amenity;
      });

      return section;
    });

    // Handle property-level amenities and their images
    let propertyAmenityImageIndex = 0;
    amenities = amenities.map((amenity) => {
      if (amenityImages[propertyAmenityImageIndex]) {
        amenity.image = { url: amenityImages[propertyAmenityImageIndex].url };
        propertyAmenityImageIndex++;
      }
      return amenity;
    });

    const deed = req.files.deed ? req.files.deed[0].path : null;

    // Create the property document
    const property = new Property({
      host_id,
      title,
      description,
      type,
      total_unique_sections,
      sections,
      location,
      images,
      amenities, // Now includes property-level amenities with images
    });

    const newProperty = await property.save();

    // Optionally save additional verification data
    const propertyVerified = new PropertyVerified({
      propertyID: newProperty._id,
      deed,
      additionalDetails,
      status: 'pending'
    });

    await propertyVerified.save();

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

    // console.log('Properties found:', properties); 

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
    const property = await Property.findById(propertyId).populate('host_id', 'nicPassport phone gender firstName lastName createdOn picture');
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

  console.log('Search parameters:');
  console.log('Latitude:', latitude);
  console.log('Longitude:', longitude);
  console.log('Radius:', radius);

  let query = {
    visibility: 'visible',
    status: 'verified'
  };

  if (latitude && longitude && radius && !isNaN(latitude) && !isNaN(longitude) && !isNaN(radius)) {
    query['location.coordinates'] = {
      $geoWithin: {
        $centerSphere: [
          [parseFloat(longitude), parseFloat(latitude)],
          parseFloat(radius) / 3963.2 // Radius in radians, assuming radius in miles
        ]
      }
    };
  }

  console.log('Constructed query:', JSON.stringify(query, null, 2));

  try {
    const properties = await Property.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    if (!properties.length) {
      console.log('No properties found.');
      return res.status(200).json([]); // Returns an empty array directly
    }

    console.log('Properties found:', properties);
    res.status(200).json(properties); // Simplified response without pagination
  } catch (error) {
    console.error('Server error fetching properties:', error);
    res.status(500).json({ message: 'Server error' });
  }
}



module.exports = {
  createProperty,
  getPropertiesByHostId,
  getPropertyById,
  getAllProperties,
  getPropertyHostById, 
};