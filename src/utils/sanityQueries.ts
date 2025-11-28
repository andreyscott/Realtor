import { groq } from 'next-sanity';

export const propertiesQuery = groq`
  *[_type == "property"] {
    _id,
    title,
    price,
    rentFrequency,
    rooms,
    baths,
    area,
    isVerified,
    externalID,
    "coverPhoto": {
      "url": coverPhoto.asset->url
    },
    "agency": {
      "logo": {
        "url": agency.logo.asset->url
      }
    },
    "slug": slug.current
  }
`;

export const propertyPathsQuery = groq`
  *[_type == "property" && defined(externalID)][].externalID
`;

export const propertyQuery = groq`
  *[_type == "property" && externalID == $id][0] {
    _id,
    title,
    price,
    rentFrequency,
    rooms,
    baths,
    area,
    isVerified,
    externalID,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    "photos": photos[].asset->{
      "url": url,
      "id": _id
    },
    "coverPhoto": {
      "url": coverPhoto.asset->url
    },
    "agency": {
      "logo": {
        "url": agency.logo.asset->url
      }
    },
    "slug": slug.current
  }
`;
