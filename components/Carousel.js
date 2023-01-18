import { Carousel } from "@mantine/carousel";

export default function ImgCarousel(props) {
    return (
        <Carousel sx={{ maxWidth: 500 }} mx="auto" withIndicators height={200}>
          {props.slides}
        </Carousel>
    );
}