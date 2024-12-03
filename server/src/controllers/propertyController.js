const Property = require("../models/propertyModel");
const User = require("../models/userModel")
const PropertyVerified = require("../models/propertyverifiedModel");
const path = require("path");
const Notification = require('../models/bellNotificationModel')//to send the moderator that he is assigned
const { getRecieverSocketId, io } = require('../socket/socket');

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
        if (amenity.name === 'WiFi') {
          // Set WiFi image to default path
          amenity.image = { url: 'uploads/default/Wifi.webp' };
        } else if (amenityImages[amenityImageIndex]) {
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
      if (amenity.name === 'WiFi') {
        // Set WiFi image to default path
        amenity.image = { url: 'uploads/properties/wifi' };
      } else if (amenityImages[propertyAmenityImageIndex]) {
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

    console.log("Came herrrrrrrrr charith");
    const propertyId = newProperty._id; // to get the ID of the saved property

    //added by Gaveeesha

    // Fetch only the _id of each user where the role is 'moderator' and save in an array
    const moderatorIds = await User.find({ role: 'moderator' }).select('_id').exec();
    if (moderatorIds.length === 0) {
      return res.status(500).json({ message: 'No moderators available' });
    }

    // Convert the array of objects to an array of _id values
    const moderatorIdsArray = moderatorIds.map(moderator => moderator._id);

    // Assign the property to a moderator based on auto_id % moderator_count
    const modValue = newProperty.auto_id % moderatorIdsArray.length;

    //take the id of the moderator in the moderator array based on mod value
    newProperty.moderator_id = moderatorIdsArray[modValue];
    console.log("Thi is the moderator id");
    console.log(moderatorIdsArray[modValue]);
    await newProperty.save();


    //for sending the notification to moderator
    const recieverSocketId = getRecieverSocketId(moderatorIdsArray[modValue]);

    const newNotification = new Notification({
      userId : moderatorIdsArray[modValue],
      notificationMessage: `You have been assigned to validate a newly listed property.`,
      notificationType : "new_listing",
      complaintId : propertyId,
    });
    console.log("New Notification :- ",newNotification);

    await newNotification.save(); 

    if(recieverSocketId) {
      io.to(recieverSocketId).emit('newNotification',newNotification);
    }
    //until here
    console.log("Noto came hhhhhhhhhhhhhhhhhere");
    














































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

const axios = require('axios');

async function getAllProperties(req, res) {
  const { latitude, longitude, radius, page = 1, limit = 1000 } = req.query;

  console.log('Search parameters:', { latitude, longitude, radius });

  try {
    let properties;

    // Check if latitude, longitude, and radius are provided
    if (latitude && longitude && radius) {
      // Fetch properties within the approximate radius
      properties = await Property.find({
        visibility: 'visible',
        status: 'verified',
        'location.coordinates': {
          $geoWithin: {
            $centerSphere: [
              [parseFloat(longitude), parseFloat(latitude)],
              parseFloat(radius) / 3963.2, // Convert radius from miles to radians
            ],
          },
        },
      })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      console.log(`Found ${properties.length} properties within radius.`);
    } else {
      // Fetch all properties if no latitude, longitude, or radius is provided
      properties = await Property.find({
        visibility: 'visible',
        status: 'verified',
      })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      console.log(`Found ${properties.length} properties (no radius).`);
    }

    if (!properties.length) {
      console.log('No properties found.');
      return res.status(200).json([]);
    }

    // If latitude, longitude, and radius are provided, calculate distances
    if (latitude && longitude && radius) {
      const origins = `${latitude},${longitude}`;
      const destinations = properties
        .map((property) => {
          const coordinates = property.location?.coordinates?.coordinates;
          if (coordinates && coordinates.length === 2) {
            return `${coordinates[1]},${coordinates[0]}`; // latitude,longitude
          }
          console.warn('Invalid coordinates for property:', property._id);
          return null; // Skip invalid properties
        })
        .filter(Boolean); // Remove invalid destinations

      if (destinations.length) {
        try {
          const googleResponse = await axios.get(
            'https://maps.googleapis.com/maps/api/distancematrix/json',
            {
              params: {
                origins,
                destinations: destinations.join('|'),
                key: process.env.GOOGLE_API_KEY,
              },
            }
          );

          const distances = googleResponse.data.rows[0].elements.map((element) => ({
            distance: element.distance?.value / 1000, // Convert meters to kilometers
            duration: element.duration?.text, // Human-readable travel time
          }));

          properties = properties.map((property, index) => ({
            ...property.toObject(),
            distance: distances[index]?.distance || null,
            duration: distances[index]?.duration || null,
          }));

          // Filter properties within the specified radius
          properties = properties.filter(
            (property) => property.distance !== null && property.distance <= parseFloat(radius)
          );

          console.log(`Filtered ${properties.length} properties within the radius.`);
        } catch (googleError) {
          console.error('Google Distance Matrix API failed:', googleError.message);
          // If Google API fails, include properties without distances
          properties = properties.map((property) => ({
            ...property.toObject(),
            distance: null,
            duration: null,
          }));
        }
      }
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error.message);
    res.status(500).json({ message: 'Server error fetching properties.' });
  }
}

module.exports = {
  getAllProperties,
};



module.exports = {
  createProperty,
  getPropertiesByHostId,
  getPropertyById,
  getAllProperties,
  getPropertyHostById, 
};