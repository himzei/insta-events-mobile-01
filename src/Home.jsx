import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Input,
  Text,
  useToast,
  VStack,
  keyframes,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { getKeywords, getStamp } from "./api";
import Insta from "./assets/svg/instagram.svg";
import { AiFillCopy } from "react-icons/ai";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Method1 from "./assets/png/method1.png";
import Method2 from "./assets/png/method2.png";
import Howto1 from "./assets/png/howto1.png";
import Howto2 from "./assets/png/howto2.png";
import { motion } from "framer-motion";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { ADM_EVENTS_NAME } from "./lib/settings";

const animationKeyframes = keyframes`
  0% { transform: scale(1); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1.4); opacity: 0; }
`;

const animation = `${animationKeyframes} 2s ease-in-out infinite`;

export default function Home() {
  const url = window.location.href || "";
  const pattern = /returnUrl=(.*)/;
  const match = url.match(pattern);
  const returnUrl = match[1];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const { data: getKeywordsDAta } = useQuery(
    ["keywords-get", ADM_EVENTS_NAME, returnUrl],
    getKeywords
  );

  const keywords_string = getKeywordsDAta?.hashtag;

  const keywordsArr = (keywords_string || "").split(",");

  // 공백없애기
  const removeWhitespace = (arr) => {
    return arr.map((element) => element.replace(/\s+/g, ""));
  };
  const keywords = removeWhitespace(keywordsArr);

  // copy to clipboard
  const [copied, setCopied] = useState(false);
  const addHashToElements = (arr) => {
    return arr.map((element) => "#" + element);
  };
  const keywordsHash = addHashToElements(keywords)
    .toString()
    .replace(/,+/g, " ");

  const { mutate, isError } = useMutation(getStamp, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      toast({
        title: "인스타그램 URL",
        description: "성공적으로 전송하였습니다.",
        status: "success",
      });
      console.log(encodeURI(returnUrl));

      window.location.href = `${encodeURI(returnUrl)}`;
    },
  });

  const onValid = ({ urlInsta }) => {
    // console.log(urlInsta);
    mutate({ urlInsta });
  };

  const onInvalid = (error) => {
    console.log(error);
  };
  return (
    <VStack w="full" justifyContent={"center"}>
      <VStack
        as="div"
        w={"360px"}
        h="full"
        px="4"
        position="relative"
        spacing={8}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundImage="url('https://images.unsplash.com/photo-1611162618758-2a29a995354b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80')"
      >
        <Box
          position="absolute"
          w="full"
          h="full"
          top="0"
          left="0"
          bgGradient="linear(to-br, rgba(0, 0, 0, 0.8), rgba(0,0, 0, 0.9), rgba(0, 0, 0, 0.7))"
        />
        <VStack spacing="10" zIndex={99} w="full">
          {/* 타이틀 */}
          <VStack
            w="full"
            alignItems="center"
            p="4"
            rounded="lg"
            zIndex="99"
            color="white"
            spacing="0"
          >
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="32"
              fontWeight={900}
              lineHeight={"48px"}
            >
              인스타그램
            </Text>
            <Text
              color="white"
              fontSize="40"
              fontWeight={900}
              lineHeight={"48px"}
            >
              인증 이벤트
            </Text>
          </VStack>

          {/* 행사정보 */}
          <VStack
            spacing="0"
            fontSize="16"
            borderTop="1px"
            borderBottom="1px"
            borderColor="gray.100"
            color="gray.100"
            py="1"
          >
            <Text fontWeight={400}>{getKeywordsDAta?.data?.events_date}</Text>
            <Text fontWeight={900}>{getKeywordsDAta?.data?.events_name}</Text>
          </VStack>

          <>
            {/* 참여방법 */}
            <VStack
              w="full"
              px="4"
              py="6"
              bg="white"
              rounded="xl"
              spacing={8}
              position="relative"
            >
              <Box
                position="absolute"
                top="-5"
                bg="white"
                px="8"
                rounded="2xl"
                py="2"
              >
                <Text fontSize="16" color="red.900" fontWeight={900}>
                  이벤트 참여방법
                </Text>
              </Box>
              {/* step1 */}

              {/* 해시태그 복사 */}
              <VStack
                w="full"
                overflow="hidden"
                spacing="0"
                rounded="md"
                border="1px"
                borderColor="gray.300"
              >
                <HStack
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  w="full"
                  justifyContent="space-between"
                  color="white"
                >
                  <Text fontWeight="900" fontSize="16" py="2" px="4">
                    1. 해시태그 복사
                  </Text>

                  <Button variant="ghost" _hover={{ bg: "none" }}>
                    <CopyToClipboard
                      text={keywordsHash}
                      onCopy={() => setCopied(true)}
                    >
                      {copied === true ? (
                        <>
                          <Text fontSize="13">복사됨</Text>
                        </>
                      ) : (
                        <Box
                          as={motion.div}
                          animation={animation}
                          transition="0.2s linear"
                        >
                          <AiFillCopy size="16" />
                        </Box>
                      )}
                    </CopyToClipboard>
                  </Button>
                </HStack>
                <HStack
                  bg="white"
                  fontSize="16"
                  color="green.600"
                  w="full"
                  px="2"
                  py="4"
                  gap="1"
                  wrap="wrap"
                >
                  {keywords?.map((item, i) => (
                    <Text
                      key={i}
                      cursor="pointer"
                      bg="gray.900"
                      color="white"
                      px="4"
                      py="1"
                      rounded="2xl"
                    >
                      {item.includes("#") ? item.trim() : `#${item.trim()}`}
                    </Text>
                  ))}
                </HStack>
              </VStack>

              {/* step2 */}

              <VStack
                w="full"
                overflow="hidden"
                spacing="0"
                rounded="md"
                border="1px"
                borderColor="gray.300"
              >
                <HStack
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  w="full"
                  justifyContent="space-between"
                  color="white"
                >
                  <Text fontWeight="900" fontSize="16" py="2" px="4">
                    2. 해시태그 붙여넣기
                  </Text>
                </HStack>
                <VStack spacing="4" py="3">
                  <Text as="span" align="center">
                    인스타 이동 후 <br />
                    <Text as="span" color="red.500" fontWeight={600}>
                      복사 한 해시태그{" "}
                    </Text>
                    붙여넣기
                  </Text>
                  <HStack justifyContent="space-around" px="4">
                    <VStack w="40%">
                      <Box>
                        <Image src={Howto1} />
                      </Box>
                      <Box>
                        <Image src={Howto2} />
                      </Box>
                    </VStack>
                    <MdOutlineDoubleArrow color="red" />
                    <VStack
                      cursor="pointer"
                      spacing={0}
                      onClick={() => window.open("https://www.instagram.com/")}
                    >
                      <Box w="12">
                        <Image src={Insta} />
                      </Box>

                      <VStack spacing={0}>
                        <Text fontSize="10" fontWeight={600}>
                          인스타로 이동
                        </Text>
                        <Text
                          color="red.500"
                          fontSize="12"
                          fontWeight={600}
                          as={motion.div}
                          animation={animation}
                          transition="0.2s linear"
                        >
                          CLICK
                        </Text>
                      </VStack>
                    </VStack>
                  </HStack>
                </VStack>
              </VStack>

              {/* step3 */}

              <VStack
                w="full"
                overflow="hidden"
                spacing="0"
                rounded="md"
                border="1px"
                borderColor="gray.300"
              >
                <HStack
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  w="full"
                  justifyContent="space-between"
                  color="white"
                >
                  <Text fontWeight="900" fontSize="16" py="2" px="4">
                    3. 입력폼에 URL 붙여넣기
                  </Text>
                </HStack>
                <VStack spacing="4" py="3">
                  <Text as="span" align="center">
                    인스타 '링크복사' 후
                    <br />
                    아래 입력폼에서 붙여넣기 후{" "}
                    <Text as="span" color="red.500" fontWeight={600}>
                      전송!!
                    </Text>
                  </Text>
                  <Grid
                    templateColumns={"4fr 1fr 4fr"}
                    px="2"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box>
                      <Image src={Method1} />
                    </Box>

                    <Box w="full" align="center">
                      <MdOutlineDoubleArrow color="red" />
                    </Box>
                    <Box>
                      <Image src={Method2} />
                    </Box>
                  </Grid>
                </VStack>
              </VStack>
            </VStack>

            {/* form */}
            <VStack
              bg="white"
              as="form"
              overflow="hidden"
              rounded="md"
              onSubmit={handleSubmit(onValid, onInvalid)}
              w="full"
            >
              <HStack
                bgGradient="linear(to-r, #7928CA, #FF0080)"
                w="full"
                justifyContent="space-between"
                color="white"
              >
                <Text fontWeight="900" fontSize="16" py="2" px="4">
                  인스타그램 URL 전송
                </Text>
              </HStack>
              <Box w="full" px="2">
                <Input
                  placeholder="여기에 URL을 입력해 주세요"
                  bg="gray.100"
                  {...register("urlInsta", {
                    required: "인스타그램 URL을 입력해주세요.",
                    minLength: {
                      message: "올바른 인스타 URL을 입력해 주세요.",
                      value: 6,
                    },
                  })}
                  type="text"
                />
              </Box>
              <Text fontSize="14" color="red.500" w="full" px="4">
                {errors?.url?.message ||
                  (isError &&
                    "올바른 인스타 URL 또는 지정된 해시태그를 모두 입력해 주셔야 합니다.")}
              </Text>

              <Box w="full" px="2" pb="2" align="right">
                <Button py="0" colorScheme="red" type="submit" size="sm">
                  <Text fontSize="14">전송</Text>
                </Button>
              </Box>
            </VStack>
          </>

          {/* 빈박스 */}
          <Box />
        </VStack>
      </VStack>
    </VStack>
  );
}
