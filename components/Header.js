import { Title, Text, Container, TextInput, Space } from "@mantine/core";

export default function Header(props) {

    //Two states:
    //  - False: Component is used for viewing already-made Header
    //  - True: Component is used to create a new Header

    if (!props.create) {
        return (
            <Container>
                <Title 
                    align="center"
                    weight={"bold"}
                >{props.title}</Title>
    
                <Text 
                    size="md" weight={200}
                    sx={{marginTop: "10px"}}   
                >{props.subText}</Text>
                <Space h={"xl"}/>
                <Space h={"md"}/>
            </Container>
        )
    } else {
        return (
            <>
                <Title align="Center">Header</Title>
                <Space h="md"/>
                <TextInput 
                    align="center"
                    weight={"bold"}
                    placeholder={"Title"}
                    sx={{width: "50%"}}
                />
    
                <TextInput 
                    sx={{marginTop: "10px", width: "50%"}}   
                    placeholder={"Sub title/text"}
                />
                
                <Space h={"md"}/>
            </>
        )
    }
}