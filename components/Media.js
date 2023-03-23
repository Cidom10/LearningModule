import { FileInput, Title, Space, Text, Image, Center } from "@mantine/core"


export default function Media(props) {
    
    if (!props.create) {
        return (
            <Center>
                <Image
                    src={props.src}
                    width={props.width ? props.width : "30vw"}
                    height={props.height ? props.height : "30vw"}
                    alt="A couple of cuties"
                    withPlaceholder
                    caption="A couple of cuties :)"
                />
            </Center>
        )
    } else {
        return (
            <>
                <Title align="Center">Media</Title>
                <Space h="md"/>
                
                <FileInput
                    placeholder="Pick File"
                    label="Image/Video"
                    accept="image/*, video/*"
                />
                <Text>(Accepts most image and video file extensions)</Text>
                
                <Space h={"md"}/>
            </>
        )
    }
}


/*
PLAN FOR MEDIA COMPONENT


- Take file input (creation component)
- Find type of file (2 options)
    - See if file input gives ending
    - Button/Select that user can use
- Based on file type, display image/video format

*/