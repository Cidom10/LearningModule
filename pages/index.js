import { Box, Button, Card, Center, Group, Modal, Stack, Title, Text, SimpleGrid, Space, Footer, Grid } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import Link from "next/link";
import{ useRouter } from "next/router";
import { useEffect, useState } from "react";
import useApi from "../useApi";

export default function Home() {

  let router = useRouter();
  let api = useApi();
  const {width, height} = useViewportSize();
  const [lessons, setLessons] = useState([]);
  const [opened, setOpened] = useState(false);
  //State used to determine what lesson to delete
  const [delId, setDelId] = useState(0);

  //Get info from backend and save into state
  useEffect(() => {
    api.getAllLessons()
       .then(data => {
        console.log("Lessons:");
          console.log(data)
          setLessons(data)
       })
  }, []);

  let deleteLesson = (lessonId) => {
    api.deleteLesson(lessonId)
    .then(data => {
      console.log(data);
      // router.reload(window.location.pathname);
      setOpened(false);
    })
    .catch(err => {
      console.error(err);
      alert("Error deleting lesson")
    })
  }

  return (
    <>
    <Center> 
        <Stack mt={20} sx={{width:width, height:(height-20)}}>
          <Center>
            <Link
              passHref
              href={"/createLesson/"}
            >
              <Button>Create Lesson</Button>
            </Link>
          </Center>
          <SimpleGrid cols={3} px={60}>
            {lessons.map((item, key) => {
              return (
                <Card
                  key={key}
                  radius={"md"}
                >
                  <Card.Section>
                    <Box
                      sx={(theme) => ({ 
                        padding: "10px",
                        background: "rgb(131,58,180)",
                        background: "linear-gradient(0deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
                        height: 150
                      })}
                    >
                    </Box>
                  </Card.Section>
                  <Center>
                    <Title order={3}>{item.title}</Title>
                  </Center>
                  <Space h={"sm"}/>
                  <Group position="center">
                    {/* Opens dialogue for deleting a lesson */}
                    <Button color={"red"}
                      onClick={() => {
                        setDelId(item.id);
                        setOpened(true)
                      }}
                      >
                      Delete
                    </Button>
                    <Link
                      passHref
                      href={`/editLesson/${item.id}`}
                    >
                      <Button color={"blue"}>
                        Edit
                      </Button>
                    </Link>
                    <Link
                      passHref
                      href={`/lesson/${item.id}`}
                    >
                      <Button color={"green"}>
                        View
                      </Button>
                    </Link>
                  </Group>
                </Card>
              )
            })}
          </SimpleGrid>
      </Stack>
    </Center>


    <Modal
      size={550}
      opened={opened}
      onClose={() => setOpened(false)}
    >
      <Stack>
        <Title align="center">Are you sure you want to delete this lesson?</Title>
        <Text align="center">This will delete all steps associated with this lesson.</Text>
        <Button color={"red"} onClick={() => {deleteLesson(delId)}}>
          Delete Component
        </Button>
      </Stack>
    </Modal>
    </>
  )
}