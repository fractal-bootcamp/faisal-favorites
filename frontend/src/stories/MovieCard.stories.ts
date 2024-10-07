import type { Meta, StoryObj } from '@storybook/react';
import godFather from "./assets/godFather.png"

import MovieCard from "../components/MovieCard.js"

const meta: Meta<typeof MovieCard> = {
    title: 'Example/MovieCard',
    component: MovieCard,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        img: "./assets/godFather.png",
        title: "The Godfather",
        favorite: false,
        year: 1972,
        duration: 175,
        rating: 9.2,
        tags: ["Action", "Crime"]
    },
}
export default meta;

type Story = StoryObj<typeof MovieCard>;

export const WithMovieContent: Story = {
    args: {
        img: "./assets/godFather.png",
        title: "The Godfather",
        favorite: false,
        year: 1972,
        duration: 175,
        rating: 9.2,
        tags: ["Action", "Crime"]
    },
}