import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";
import { FcAbout, FcHome, FcMenu } from "react-icons/fc";
import type { NextPage } from "next";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi"

const Navbar: NextPage = () => {
  return (
    <Flex p="2" borderBottom="1px" borderColor="gray.100">
      <Box fontSize="3xl" color="blue.400" fontWeight="bold">
        <Link href="/">Realtor</Link>
      </Box>
      <Spacer />
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FcMenu />}
            variant="outlined"
            color="red.400"
          />
          <MenuList>
            <MenuItem icon={<FcHome />} as={Link} href="/">Home</MenuItem>
            <MenuItem icon={<BsSearch />} as={Link} href="/search">Search</MenuItem>
            <MenuItem icon={<FcAbout />} as={Link} href="/search?purpose=for-sale">Buy Property</MenuItem>
            <MenuItem icon={<FiKey />} as={Link} href="/search?purpose=for-rent">Rent Property</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
