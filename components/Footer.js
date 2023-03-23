import { Container, Title, TextInput, Text, Button, Stack, Space } from "@mantine/core";


export default function EndFooter(props) {
    if (!props.create) {
        return (
            <Container 
                py="lg" px="md"
                sx={{borderTop: "1px solid white"}}>
                <Stack align="center">
                    <Text>{props.text}</Text>
                    <Space h="lg"/>
                    {props.children}
                    <Space h="lg"/> 
                </Stack>
            </Container>
        )
    } else {
        return (
            <>
                <Title align="Center">Footer</Title>
                <Space h="md"/>

                <TextInput 
                    align="center"
                    weight={"bold"}
                    placeholder={"Ending text"}
                    sx={{width: "50%"}}
                />
                                
                <Space h={"md"}/>

            </>
        )
    }
}