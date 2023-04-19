import { useState } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import SettingsIcon from "@mui/icons-material/Settings";
import ViewConfig from "../components/ViewConfig";

export default function Home() {
  const [viewConfig, setViewConfig] = useState(false);

  const handleChangeViewConfig = () => setViewConfig((state) => !state);

  return (
    <Flex
      w={"100vw"}
      h="100vh"
      justifyContent={"center"}
      alignItems="center"
      flexDir={"column"}
    >
      {viewConfig && (
        <ViewConfig handleChangeViewConfig={handleChangeViewConfig} />
      )}
      <Image
        width="209"
        height="55"
        src="https://digicom.net.ar/web/wp-content/uploads/2021/03/cropped-digicom-tucuman.fw_-1.png"
        className="custom-logo"
        alt=""
        loading="lazy"
        itemprop="logo"
      />

      <Flex
        border="none"
        w={"90%"}
        h="90%"
        position="relative"
        flexDir={"column"}
      >
        <Flex
          w={"100%"}
          h="30px"
          justifyContent={"end"}
          alignItems="center"
          bg={"#fff"}
          border="none"
        >
          <Text
            _hover={{ bg: "#acacac" }}
            borderRadius={"35%"}
            p={"5px"}
            onClick={handleChangeViewConfig}
            cursor={"pointer"}
          >
            <SettingsIcon />
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
