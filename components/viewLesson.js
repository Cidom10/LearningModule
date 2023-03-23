import { 
  Stepper,
  Center,
  Space,
  ScrollArea,
  Group,
} from '@mantine/core';
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from 'react';
import Header from "./Header";
import Section from "./Section";
import EndFooter from "./Footer";
import BlockQuote from "./Blockquote";
import Media from './Media';
import ImgCarousel from './Carousel';
  
  export default function ViewLesson(props) {
    //Set which navbar step we are currently on (numerical)
    const [navActive, setNavActive] = useState(0);
    const [steps, setSteps] = useState([]);
  
    const {width, height} = useViewportSize();  

    useEffect(() => {
      let lesson = props?.lessonId;
      console.log(lesson);
      fetch(`http://127.0.0.1:8000/api/lessons/${lesson}/steps/`)
      .then(res => res.json())
      .then(data => {
        setSteps(data);
        console.group();
        console.log("Steps:");
        console.log(data);
        console.groupEnd();
      })
    }, [])
  
    return (
      <Group spacing={0}>
  
          {/* Navbar Content */}
          <Center sx={(theme) => ({
            width: "12vw",
            alignSelf: "center",
          })}>
  
            <Stepper
              active={navActive}
              onStepClick={setNavActive}
              orientation="vertical"
            >
              <Stepper.Step label="Step 1"/>
              <Stepper.Step label="Step 2"/>
              <Stepper.Step label="Step 3"/>
  
            </Stepper>
          </Center>
  
          {/* Main Section */}
          <ScrollArea 
  
            sx={(theme) => ({
              width: width*0.85,
              height: height,
              borderLeft: "1px solid" + theme.colors.gray[7]
            })}>
            <Space h="xl"/>
            <Space h="xl"/>
  
            <Header
              title={`Lesson ${props.lessonId}`}
              subText={"Yep its a pretty cool header. ".repeat(20)}
            />
    
            <Section 
              title="Section Title"
              text={"Just a section, that's all. ".repeat(50)}
            />
  
            <Media 
              src={"/img/capybara.png"}
              width={600}
              height={300}
            />

            <ImgCarousel/>

            <BlockQuote
              cite={"Patrick Star"}
            >
              The inner machinations of my mind are an enigma
            </BlockQuote>
  
            <EndFooter text={"Eyy ".repeat(30)}/>
            
          </ScrollArea>
      </Group>
    )
  }
  