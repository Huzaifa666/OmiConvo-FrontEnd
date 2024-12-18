import { Carousel } from '@mantine/carousel';
import React from 'react';
import classes from '@assets/css/Carousel.module.css';
import { SlideOne } from '@pages/instagram/slideOne.jsx';
import { SlideTwo } from '@pages/instagram/slideTwo.jsx';
import { SlideThree } from '@pages/instagram/slideThree.jsx';
import { useSetState } from '@mantine/hooks';

export default function CustomCarousel() {
  const [state, setState] = useSetState({
    assistantName: '',
    imageURL: '',
    caption: '',
  });
  return (
    <Carousel withIndicators height={670} classNames={classes}>
      <Carousel.Slide>
        <SlideOne setParentState={setState} />
      </Carousel.Slide>

      <Carousel.Slide>
        <SlideTwo
          assistantName={state.assistantName}
          setParentState={setState}
        />
      </Carousel.Slide>
      <Carousel.Slide>
        <SlideThree parentState={state} />
      </Carousel.Slide>
    </Carousel>
  );
}
