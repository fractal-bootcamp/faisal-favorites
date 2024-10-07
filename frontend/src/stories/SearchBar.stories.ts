import type { Meta, StoryObj } from '@storybook/react';

import SearchBar from '../components/SearchBar.js';

const meta: Meta<typeof SearchBar> = {
    title: 'Example/SearchBar',
    component: SearchBar,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        searchContent: ""
    },
}
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const WithSearchContent: Story = {
    args: {
        searchContent: ""
    },
}
