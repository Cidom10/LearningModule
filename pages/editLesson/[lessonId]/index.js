import Router, { useRouter } from "next/router";
import { AiFillCaretRight } from "react-icons/ai"
import { Center, Space, Stack, Title, Box, Button, Modal, Link, Group, TextInput, CloseButton, Text, ActionIcon } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import useApi from "../../../useApi"; 


export default function editLesson() {
    const api = useApi();
    const router = useRouter();
    const {lessonId} = router.query;
    const {width, height} = useViewportSize();

    //For use with API information
    const [steps, setSteps] = useState([]);
    const [title, setTitle] = useState("");

    //Modal states

    //State for add step modal
    const [addOpened, setAddOpened] = useState(false);
    //State for deleting a step
    const [delOpened, setDelOpened] = useState(false);
    const [delId, setDelId] = useState("");
    const [delLessonId, setDelLessonId] = useState("");
    const [delName, setDelName] = useState("");

    //Used for creating new step
    const [newTitle, setNewTitle] = useState("")

    useEffect(() => {
        if (lessonId) {
            api.getLessonSteps(lessonId)
                .then(data => {
                    console.log(data);
                    setSteps(data);
                })
            api.getLesson(lessonId)
                .then(data => {
                    console.log("Lesson data:");
                    console.log();
                    console.log(`Lesson title: ${data.title}`);
                    setTitle(data.title)
                })
        }

    }, [lessonId])

    //Handler function for creating a new step  
    let addNewStep = () => {
        console.log(`Title: ${newTitle} / Lesson: ${lessonId}`);
        api.createStep(lessonId, {
            "stepTitle": newTitle,
            "lesson": lessonId
        })
        .then(data => {
            console.log("New step data: " + data);
            setNewTitle("");
            Router.push(`/editLesson/${lessonId}/${data.id}`)
        })
    }

    //Handler function for modal given when deleting a step
    let deleteStep = () => {
        api.deleteStep(delLessonId, delId);
        setDelOpened(false);
        router.reload(window.location.pathname);
    }

    //Handler function for editing an existing step 
    let navigateEditStep = (stepId) => {
        Router.push(`/editLesson/${lessonId}/${stepId}`)
    }

    return (
        <>
        <Center style={{width: width, height: height}}>
            <Stack>
                <Title>{title}</Title>
                <Space h={"lg"}/>
                {steps.map((item, key) => {
                    return (
                        <Box 
                        key={key} 
                        sx={{
                            width: "30vw",
                            display: "flex",
                            justifyContent: "space-between",
                            border: "2px solid #188AC3",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer"                
                        }}>
                            <Text>{item.stepTitle}</Text>
                            <Group>
                                <Box
                                    sx={{
                                        padding: "1px 2px",
                                        border: "2px solid #188AC3",
                                        borderRadius: "5px",
                                        "&:hover": {
                                            backgroundColor:"lightred"
                                        }
                                    }}
                                    onClick={() => {
                                        setDelId(item.id);
                                        setDelLessonId(item.lesson);
                                        setDelName(item.stepTitle);
                                        setDelOpened(true);
                                    }}
                                ><CloseButton/></Box>
                                <Box 
                                    onClick={() => navigateEditStep(item.id)}
                                    sx={{
                                        padding: "1px 2px",
                                        border: "2px solid #188AC3",
                                        borderRadius: "5px",
                                        "&:hover": {
                                            backgroundColor:"lightred"
                                        }
                                    }}
                                >
                                    <ActionIcon><AiFillCaretRight size={18}/></ActionIcon>
                                </Box>
                            </Group>
                            
                        </Box>
                    )
                })}
                {/* Make sure to make function here to post new step and redirect */}
                    <Button color={"#188AC3"} onClick={() => setAddOpened(true)}> 
                        Add Step
                    </Button>
            </Stack>
        </Center>

        <Modal
            opened={addOpened}
            onClose={() => setAddOpened(false)}
            title="New Step"
        >
            <Stack>    
                <TextInput
                    placeholder="New Step"
                    label="Step Title"
                    withAsterisk
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                />
                <Button style={{width: "30%"}} onClick={addNewStep}>
                    Create Step
                </Button>
            </Stack>
        </Modal>

        <Modal
            opened={delOpened}
            onClose={() => setDelOpened(false)}
            title="Delete Step"
        >
            <Center>
                <Stack>
                    <Text>Are you sure you want to delete {delName}?</Text>
                    <Button
                        color={"red"}
                        onClick={deleteStep}
                    >Delete Component</Button>
                </Stack>
            </Center>
        </Modal>
        </>
    )
}