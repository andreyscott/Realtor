import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";
import Property from "../components/Property";
import SearchFilters from "../components/SearchFilters";
import { SanityProperty } from "../interfaces/sanityProperty";
import { sanityClient } from "../lib/sanity";
import { groq } from "next-sanity";

type Props = {
  properties: SanityProperty[];
};

const Search: NextPage<Props> = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState<boolean>(false);
  const router = useRouter();

  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prev) => !prev)}
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter}></Icon>
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap">
        {properties?.map((property) => (
          <Property property={property} key={property._id} />
        ))}
      </Flex>
      {properties?.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image
            src="/noresults.svg"
            alt="no result"
            width={200}
            height={200}
          />
          <Text fontSize="2xl" marginTop="3">
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";

  let order = "price desc";
  if (sort === "price-asc") order = "price asc";
  if (sort === "price-desc") order = "price desc";
  if (sort === "date-asc") order = "_createdAt asc";
  if (sort === "date-desc") order = "_createdAt desc";

  // Construct GROQ query
  const groqQuery = groq`
    *[_type == "property" 
      && purpose == $purpose 
      && price >= $minPrice 
      && price <= $maxPrice 
      && rooms >= $roomsMin 
      && baths >= $bathsMin
      && area <= $areaMax
    ] | order(${order}) {
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

  const params = {
    purpose,
    minPrice: Number(minPrice),
    maxPrice: Number(maxPrice),
    roomsMin: Number(roomsMin),
    bathsMin: Number(bathsMin),
    areaMax: Number(areaMax),
  };

  const properties = await sanityClient.fetch(groqQuery, params);

  return {
    props: {
      properties,
    },
  };
};
