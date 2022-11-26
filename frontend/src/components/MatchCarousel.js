import React from "react";
import styled from 'styled-components';
import { Carousel, Container } from 'react-bootstrap';
import { MatchScoreRow } from "./MatchScoreRow";

const Styles = styled.div`
    .carousel-control-next-icon {
        border-style: solid;
        right: -75px;
        position: relative;
    }

    .carousel-control-prev-icon {
        bordr-style: solid;
        left: -75px;
        position: relative;
    }

    .carousel {
        background-color: #FFD100;
        opacity: 0.8;
        z-index: -1;
    }

    .carousel-container {
        padding: 0;
        height: auto;
    }


`;

export const MatchCarousel = () => (
    <Styles>
        <Container fluid className="carousel-container">
            <Container fluid className="carousel h-100"></Container>
            <Carousel fluid variant="dark" interval={3000} controls={false} indicators={false} className="w-100 h-100 position-relative top-50">
                <Carousel.Item>
                    <MatchScoreRow></MatchScoreRow>
                </Carousel.Item>
                <Carousel.Item>
                    <MatchScoreRow></MatchScoreRow>
                </Carousel.Item>
                <Carousel.Item>
                    <MatchScoreRow></MatchScoreRow>
                </Carousel.Item>
            </Carousel>
        </Container>
    </Styles>
)