export default {
    name: 'property',
    type: 'document',
    title: 'Real Estate Property',
    fields: [
        { name: 'title', type: 'string', title: 'Property Title' },
        { name: 'slug', type: 'slug', title: 'URL Slug', options: { source: 'title', maxLength: 96 } },
        { name: 'price', type: 'number', title: 'Price (AED)' },
        { name: 'rentFrequency', type: 'string', title: 'Rent Frequency', options: { list: ['yearly', 'monthly', 'weekly', 'daily'] } },
        { name: 'rooms', type: 'number', title: 'Number of Rooms' },
        { name: 'baths', type: 'number', title: 'Number of Bathrooms' },
        { name: 'area', type: 'number', title: 'Area (sqft)' },
        { name: 'isVerified', type: 'boolean', title: 'Is Verified?' },
        { name: 'externalID', type: 'string', title: 'External ID' },
        { name: 'coverPhoto', type: 'image', title: 'Cover Photo' },
        { name: 'photos', type: 'array', title: 'Gallery Photos', of: [{ type: 'image' }] },
        { name: 'description', type: 'array', title: 'Full Description', of: [{ type: 'block' }] },
        { name: 'purpose', type: 'string', title: 'Purpose', options: { list: ['for-rent', 'for-sale'] } },
        { name: 'type', type: 'string', title: 'Property Type', options: { list: ['apartment', 'villa', 'townhouse', 'penthouse', 'hotel-apartment', 'villa-compound', 'residential-plot', 'residential-floor', 'residential-building'] } },
        { name: 'furnishingStatus', type: 'string', title: 'Furnishing Status', options: { list: ['furnished', 'unfurnished'] } },
        {
            name: 'amenities',
            type: 'array',
            title: 'Amenities',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'text', type: 'string', title: 'Amenity Name' }
                    ]
                }
            ]
        },
        {
            name: 'agency',
            type: 'object',
            title: 'Agency',
            fields: [
                { name: 'name', type: 'string', title: 'Agency Name' },
                { name: 'logo', type: 'image', title: 'Agency Logo' }
            ]
        }
    ],
};
