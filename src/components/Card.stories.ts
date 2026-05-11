import type { Meta, StoryObj } from 'storybook/internal/types';
import Card from './Card.astro';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Card heading' },
    description: { control: 'text', description: 'Supporting text below the title' },
    href: { control: 'text', description: 'Makes the card a link when provided' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'A short description that provides context for the card content.',
  },
};

export const WithLink: Story = {
  args: {
    title: 'Clickable Card',
    description: 'This card navigates to a URL when clicked.',
    href: 'https://astro.build',
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Title Only Card',
  },
};
