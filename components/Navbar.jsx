import { Flex, Image, Spacer, Link } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      bg={"#FFF"}
      boxShadow={"0px 0px 10px #ccc"}
      p={2}
      justifyContent={"space-between"}
      alignItems={"center"}
      w="100%"
      h="60px"
      position={"fixed"}
      top={0}
      zIndex={1}
    >
      <Flex
        _hover={{
          bg: "gray.100",
        }}
        p={"15px"}
        m={"10px"}
        borderRadius={"10px"}
        fontWeight={"bold"}
        fontSize={"16px"}
        color={"#464646"}
        cursor={"pointer"}
      >
        <Link href="/"> Nuevo servicio</Link>
      </Flex>
      <Flex
        _hover={{
          bg: "gray.100",
        }}
        p={"15px"}
        m={"10px"}
        borderRadius={"10px"}
        fontWeight={"bold"}
        fontSize={"16px"}
        color={"#464646"}
        cursor={"pointer"}
      >
        <Link href="/servicios">Servicios</Link>
      </Flex>
      <Flex
        bg={"gray.100"}
        alignItems={"center"}
        justifyContent={"space-around"}
        h={"100%"}
        p={"15px"}
      >
        <Flex
          _hover={{
            bg: "#fff",
          }}
          p={"5px"}
          m={"10px"}
          borderRadius={"10px"}
          fontWeight={"bold"}
          fontSize={"16px"}
          color={"#464646"}
          cursor={"pointer"}
        >
          <Link href="/telgecs">Telgecs</Link>
        </Flex>
        <Flex
          _hover={{
            bg: "#fff",
          }}
          p={"5px"}
          m={"10px"}
          borderRadius={"10px"}
          fontWeight={"bold"}
          fontSize={"16px"}
          color={"#464646"}
          cursor={"pointer"}
        >
          <Link href="/seccionador">Seccionadores</Link>
        </Flex>
        <Flex
          _hover={{
            bg: "#fff",
          }}
          p={"5px"}
          m={"10px"}
          borderRadius={"10px"}
          fontWeight={"bold"}
          fontSize={"16px"}
          color={"#464646"}
          cursor={"pointer"}
        >
          <Link href="/camaras">Camaras</Link>
        </Flex>
        <Flex
          _hover={{
            bg: "#fff",
          }}
          p={"5px"}
          m={"10px"}
          borderRadius={"10px"}
          fontWeight={"bold"}
          fontSize={"16px"}
          color={"#464646"}
          cursor={"pointer"}
        >
          <Link href="/reconectador">Reconectador</Link>
        </Flex>
        <Flex
          _hover={{
            bg: "#fff",
          }}
          p={"5px"}
          m={"10px"}
          borderRadius={"10px"}
          fontWeight={"bold"}
          fontSize={"16px"}
          color={"#464646"}
          cursor={"pointer"}
        >
          <Link href="/rebaje">Rebaje</Link>
        </Flex>
        <Flex
          _hover={{
            bg: "#fff",
          }}
          p={"5px"}
          m={"10px"}
          borderRadius={"10px"}
          fontWeight={"bold"}
          fontSize={"16px"}
          color={"#464646"}
          cursor={"pointer"}
        >
          <Link href="/cmm">CMM</Link>
        </Flex>
      </Flex>

      <Spacer></Spacer>
      <Flex p={"50px"}>
        <Image
          width="209"
          height="55"
          src="/images/logo.png"
          className="custom-logo"
          alt=""
          loading="lazy"
          itemProp="logo"
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
