import type { Meta, StoryObj } from '@storybook/react';
import godFather from "./assets/godFather.png"

import MovieCardExpanded from "../components/MovieCardExpanded.js"

const meta: Meta<typeof MovieCardExpanded> = {
    title: 'Example/MovieCardExpanded',
    component: MovieCardExpanded,
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
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        tags: ["Action", "Crime"]
    },
}
export default meta;

type Story = StoryObj<typeof MovieCardExpanded>;

export const WithMovieContent: Story = {
    args: {
        img: "./assets/godFather.png",
        title: "The Godfather",
        favorite: false,
        year: 1972,
        duration: 175,
        rating: 9.2,
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        tags: ["Action", "Crime"]
    },
}