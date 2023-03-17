import { Button, Input, Text, useToast, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { getStamp } from "./api";

export default function Home() {
  const { register, reset, handleSubmit } = useForm();
  const toast = useToast();
  const { data, mutate } = useMutation(getStamp, {
    onSuccess: () => {
      reset();
      toast({
        title: "인스타그램 URL",
        description: "성공적으로 전송하였습니다.",
        status: "success",
      });
    },
  });
  console.log(data);
  const onValid = ({ url }) => {
    mutate({ url });
  };
  const onInvalid = (error) => {
    console.log(error);
  };
  return (
    <VStack w="full" h="100vh" justifyContent={"center"}>
      <VStack
        as="div"
        w="xl"
        h="full"
        justifyContent="center"
        px="4"
        spacing={8}
      >
        <VStack
          w="full"
          alignItems="flex-start"
          bg="gray.100"
          p="4"
          rounded="lg"
        >
          <Text>
            해시태그 #스페이스에듀 #스탬프인증 을 입력해서 포스팅 해주세요
          </Text>
          <Text>인스타그램 URL을 입력해서 전송해주세요</Text>
        </VStack>

        {/* form */}
        <VStack
          as="form"
          onSubmit={handleSubmit(onValid, onInvalid)}
          w="full"
          alignItems="flex-start"
        >
          <Text fontWeight={600}>인스타그램 URL</Text>
          <Input
            {...register("url", {
              required: "인스타그램 URL을 입력해주세요.",
              minLength: {
                message: "최소 6자이상 작성해 주셔야 합니다.",
                value: 6,
              },
            })}
            type="text"
          />
          <Button w="full" colorScheme="red" type="submit">
            <Text>인스타그램 인증전송</Text>
          </Button>
        </VStack>
        {data?.stamp ? (
          <Text>인증되었습니다.</Text>
        ) : (
          <Text>해시태그가 인증되지 않았습니다.</Text>
        )}
      </VStack>
    </VStack>
  );
}
