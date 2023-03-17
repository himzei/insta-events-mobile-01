import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack w="full" h="100vh" justifyContent={"center"}>
      <Heading>Page Not Found</Heading>
      <Text>It seems that you're lost</Text>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </VStack>
  );
}
