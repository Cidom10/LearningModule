import { useRouter } from "next/router";
import axios from "axios";
import ViewLesson from "../../components/viewLesson";
import { 
  Stepper,
  Center,
  Space,
  ScrollArea,
  Group,
  Button,
  Image
} from '@mantine/core';
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from 'react';
import Header from "../../components/Header";
import Section from "../../components/Section";
import EndFooter from "../../components/Footer";
import BlockQuote from "../../components/Blockquote";
import Media from '../../components/Media';
import ImgCarousel from '../../components/Carousel';
import { Carousel } from "@mantine/carousel";
import useApi from "../../useApi";
import cap1 from "../../public/img/carousel1.jpeg";
import cap2 from "../../public/img/carousel2.jpeg";
import cap3 from "../../public/img/carousel3.jpeg";


let images = [cap1, cap2, cap3];

export default function showLesson() {
    const api = useApi();
    const router = useRouter();
    const {lessonId} = router.query;
    //Set which navbar step we are currently on (numerical)
    const [navActive, setNavActive] = useState(0);
    const [steps, setSteps] = useState([]);
    
    const {width, height} = useViewportSize(); 
    
    const slides = images.map((url) => (
      <Carousel.Slide key={url}>
        <Image src={url} />
      </Carousel.Slide>
    ));

    useEffect(() => {
      if (lessonId) {
        api.getLessonSteps(lessonId)
        .then(data => {
          console.log(data);
          setSteps(data);
        })
      }}, [lessonId])

      return (
        <Group spacing={0}>
    
            {/* Navbar Content */}
            <Center sx={(theme) => ({
              width: "12vw",
              alignSelf: "center",
              padding: "5px"
            })}>
    
              <Stepper
                active={navActive}
                onStepClick={setNavActive}
                orientation="vertical"
              >
                {steps.map((item, key) => {
                  return <Stepper.Step key={key} label={item.stepTitle}/>   
                })}
    
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
                title={`Lesson ${lessonId}`}
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
  
              <ImgCarousel slides={slides}/>
  
              <BlockQuote
                cite={"Patrick Star"}
              >
                The inner machinations of my mind are an enigma
              </BlockQuote>
    
              <EndFooter text={"Eyy ".repeat(30)}>
                <Button radius="lg" size="md">
                  Continue
                </Button>
              </EndFooter>
              
            </ScrollArea>
        </Group>
      )
}
