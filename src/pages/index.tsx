import { Box, Button, Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Property from "../components/Property";
import { sanityClient } from "../lib/sanity";
import { groq } from "next-sanity";

import { SanityProperty } from "../interfaces/sanityProperty";

type BannerProps = {
  purpose: string;
  imageUrl: string;
  title1: string;
  title2: string;
  desc1: string;
  desc2: string;
  linkName: string;
  buttonText: string;
};

type Props = {
  propertiesForSale: SanityProperty[];
  propertiesForRent: SanityProperty[];
};

const Banner: NextPage<BannerProps> = ({
  purpose,
  imageUrl,
  title1,
  title2,
  desc1,
  desc2,
  linkName,
  buttonText,
}) => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
      <Image src={imageUrl} width={500} height={300} alt="banner" />
      <Box p={5}>
        <Text color="gray.500" fontSize="sm" fontWeight="medium">
          {purpose}
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          {title1} <br /> {title2}
        </Text>
        <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
          {desc1}
          <br />
          {desc2}
        </Text>
        <Button fontSize="xl" as={Link} href={linkName}>
          {buttonText}
        </Button>
      </Box>
    </Flex>
  );
};

const Home: NextPage<Props> = ({ propertiesForSale, propertiesForRent }) => {
  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartment, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />

      <Flex flexWrap="wrap" justifyContent="center">
        {propertiesForRent?.map((property) => (
          <Property key={property._id} property={property} />
        ))}
      </Flex>

      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore Apartment, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />

      <Flex flexWrap="wrap" justifyContent="center">
        {propertiesForSale?.map((property) => (
          <Property key={property._id} property={property} />
        ))}
      </Flex>
    </Box>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const query = groq`
    *[_type == "property" && purpose == $purpose][0...6] {
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

  const propertiesForSale = await sanityClient.fetch(query, { purpose: 'for-sale' });
  const propertiesForRent = await sanityClient.fetch(query, { purpose: 'for-rent' });

  return {
    props: {
      propertiesForSale,
      propertiesForRent,
    },
  };
};
