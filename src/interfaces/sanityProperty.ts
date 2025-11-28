export interface SanityProperty {
    _id: string;
    title: string;
    price: number;
    rentFrequency?: string;
    rooms: number;
    baths: number;
    area: number;
    isVerified: boolean;
    externalID: string;
    slug: string;
    coverPhoto: {
        url: string;
    };
    agency: {
        logo: {
            url: string;
        };
    };
    description?: any; // PortableText
    type?: string;
    purpose?: string;
    furnishingStatus?: string;
    amenities?: any[];
    photos?: any[];
}
