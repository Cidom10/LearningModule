import { useRouter } from "next/router";
import { Group, Button, Stack, Text, Title, Space, Modal, Center, SegmentedControl, Box, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import BlockQuote from "../../../components/Blockquote";
import EndFooter from "../../../components/Footer";
import Header from "../../../components/Header";
import Media from "../../../components/Media";
import Section from "../../../components/Section";
import useApi from "../../../useApi";

export default function StepEdit(props) {
    //Used to deal with modal
    const [opened, setOpened] = useState(false);
    const [tab, setTab] = useState("header");

    //Used to deal with step information
    const [stepTitle, setStepTitle]         = useState("");
    const [steps, setSteps]                 = useState("");

    //State for different components in Modal (inefficient?)
    const [headerTitle, setHeaderTitle]     = useState("");
    const [headerSub, setHeaderSub]         = useState("");
    const [sectionTitle, setSectionTitle]   = useState("");
    const [sectionBody, setSectionBody]     = useState("");

    const router = useRouter();
    const api = useApi();
    const {lessonId, stepId} = router.query;

    let addHeader = () => {
        let compData = {
            "info": {
                "title": headerTitle,
                "subTitle": headerSub
            }
        }
        api.createComp(lessonId, stepId, "header", compData)
        .then(data => {
            console.log("After creating header:");
            console.log(data);
        })
    }

    useEffect(() => {
        if (stepId) {
            console.log("Step id: ", stepId);
            api.getStep(lessonId, stepId)
            .then(data => {
                console.log(data);
                setStepTitle(data.stepTitle);
            })
            api.getAllStepComps(lessonId, stepId)
            .then(data => {
                console.log("Components: ");
                console.log(data)

            })
        }
    }, [stepId])

    return (
        <>
        <Stack align={"center"} py="lg">

            <Title order={1}>{stepTitle}</Title>
            <Space h={"md"}/>


            <Button variant="outline" onClick={() => setOpened(true)}>
                <Group noWrap position="center">
                    <Text>Add New Component</Text>
                    <AiFillCaretRight/>
                </Group>
            </Button>

            {/* Room where components list will go */}

        </Stack>

           {/* Modal to make new component */}
            <Modal
                size={800}
                opened={opened}
                onClose={() => setOpened(false)}
                title="New Component"
            >
                <Stack align={"center"}>
                    <SegmentedControl 
                        value={tab}
                        onChange={setTab}
                        color={"blue"}
                        data={[
                            { label: "Header",      value: "header"},
                            { label: "Section",     value: "section"},
                            { label: "Media",       value: "media"},
                            { label: "Quote",       value: "blockquote"},
                            { label: "Carousel",    value: "carousel"},
                            { label: "Footer",      value: "footer"}
                    ]}/>
                    
                    {tab == "header" && (
                        <>
                            {/* <Header create lessonId={lessonId} stepId={stepId}/> */}
                            <Stack align={"center"}>
                                <Title>Header</Title>
                                <TextInput
                                    sx={{"width": "375px"}}
                                    placeholder="Header Title"
                                    value={headerTitle}
                                    onChange={(e) => setHeaderTitle(e.target.value)}
                                />
                                <TextInput
                                    sx={{"width": "375px"}}
                                    placeholder="Header Subtitle"
                                    value={headerSub}
                                    onChange={(e) => setHeaderSub(e.target.value)}
                                />
                                <Button 
                                    variant="outline"
                                    rightIcon={<AiFillCaretRight/>}
                                    onClick={() => {
                                        addHeader();
                                        setOpened(false);
                                    }}
                                >
                                    Add New Component
                                </Button>
                            </Stack>
                        </>
                    )}

                    {tab == "section" ? (
                        <>
                            <Section create lessonId={lessonId} stepId={stepId}/>
                            <Button 
                                variant="outline"
                                rightIcon={<AiFillCaretRight/>}
                            >
                                Add New Component
                            </Button>
                        </>
                    ) : null}   

                    {tab == "blockquote" ? (
                        <>
                            <BlockQuote create lessonId={lessonId} stepId={stepId}/>
                            <Button variant="outline">
                                <Group noWrap position="center">
                                    <Text>Add New Component</Text>
                                    <AiFillCaretRight/>
                                </Group>
                            </Button>
                        </>
                    ) : null}

                    {tab == "media" ? (
                        <>
                            <Media create lessonId={lessonId} stepId={stepId}/>
                            <Button variant="outline">
                                <Group noWrap position="center">
                                    <Text>Add New Component</Text>
                                    <AiFillCaretRight/>
                                </Group>
                            </Button>
                        </>
                    ) : null}       

                    {tab == "footer" ? (
                        <>
                            <EndFooter create lessonId={lessonId} stepId={stepId}/>
                            <Button variant="outline">
                                <Group noWrap position="center">
                                    <Text>Add New Component</Text>
                                    <AiFillCaretRight/>
                                </Group>
                            </Button>
                        </>
                    ) : null}  
                
                </Stack>

            </Modal>
        </>
    )
}
