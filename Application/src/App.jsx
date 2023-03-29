import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Image,
  Box,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState();
  const [image, setImage] = useState();
  // const [loading, setLoading] = useState();

  const gen = async (prompt) => {
    // setLoading(true);
    const getresult = axios.get(``); // Link TO BE ADDED
    setImage(getresult.data());
    // setLoading(false);
  };

  return (
    <ChakraProvider>
      <Box
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        minH="100vh"
        d="flex"
        alignItems="center"
        justifyContent="fill"
      >
        <Container>
          <Box
            p={4}
            maxW="md"
            mx="auto"
            bg="rgba(255,255,255,0.3)"
            boxShadow="dark-lg"
            rounded="lg"
            backdropFilter="blur(10px)"
          >
            <Heading>Hello There 🤖</Heading>

            <Text marginBottom={"12px"}>Explore the endless possiblities</Text>

            <Wrap
              marginBottom="10px"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Input
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                width={"360px"}
                placeholder="Enter your prompt here"
                bg="rgba(255,255,255,0.3)"
                boxShadow="lg"
                rounded="lg"
                backdropFilter="blur(30px)"
                border="black"
              ></Input>
              <Button
                onClick={(event) => gen(prompt)}
                justifyContent={"center"}
                alignItems={"center"}
                colorScheme={"yellow"}
                rounded={"2xl"}
              >
                Let's Go
              </Button>
            </Wrap>

            {image ? (
              <Image
                src={`data:image/png;base64,${image}`}
                boxShadow="dark-lg"
              />
            ) : null}
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
