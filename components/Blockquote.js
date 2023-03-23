import { Blockquote, Container, Title, Space, TextInput } from "@mantine/core";

export default function BlockQuote(props) {

    if (!props.create) {
        return (
            <Container sx={{
                paddingLeft: "40px",
                marginBottom: "20px",
            }}>
                <Blockquote
                    cite={"- " + props.cite}
                    icon={null}
                    sx={{
                        fontSize: "20px"
                    }}
                >{props.children}</Blockquote>
            </Container>
        )
    } else {
        return (
            <>
                <Title align="Center">Blockquote</Title>
                <Space h="md"/>
                <TextInput 
                    align="center"
                    weight={"bold"}
                    placeholder={"Quote"}
                    sx={{width: "50%"}}
                />
    
                <TextInput 
                    sx={{marginTop: "10px", width: "50%"}}   
                    placeholder={"Signature"}
                />
                
                <Space h={"md"}/>
            </>
        )
    }
}