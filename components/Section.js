import { Title, Text, Container, TextInput, Space } from "@mantine/core";
import { useState } from "react";
// import RichTextEditor from "../components/RichText";

export default function Section(props) {
    let initial="Body of the section";
    const [value, changeValue] = useState(initial);

    if (!props.create) {
         return (
            <Container>

                <Title 
                    align="center"
                    weight={"bold"}
                >{props.title}</Title>
    
                <Space h={"md"}/>

                <Text 
                    size="md" weight={200}
                    sx={{marginTop: "10px"}}   
                >{props.text}</Text>

                <Space h={"xl"}/>
                <Space h={"md"}/>
            </Container>
         )
    } else {
        return (
            <>
                <Title align="center">Section</Title>
                <TextInput 
                    align="left"
                    weight={"bold"}
                    placeholder={"Section Title (Optional)"}
                    sx={{width: "50%"}}
                />
                {/* <RichTextEditor
                    value={value}
                    onChange={changeValue}
                    controls={[
                        ['bold', 'italic', 'underline', 'link'],
                        ['h1', 'h2', 'h3'],
                        ['unorderedList', 'orderedList'],
                        ['alignLeft', 'alignCenter', 'alignRight'],
                        ['sup', 'sub']
                    ]}
                    /> */}
            </>
        );

        
        
    }

}

function Editor() {
    return (
        <RichTextEditor 
            value={value}
            onChange={changeValue}
            id="rte"
        />
    )
}