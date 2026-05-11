import type { Meta, StoryObj } from 'storybook/internal/types';
import Badge from './Badge.astro';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Text displayed inside the badge' },
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
      description: 'Color variant',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: { label: 'Info', variant: 'info' },
};

export const Success: Story = {
  args: { label: 'Success', variant: 'success' },
};

export const Warning: Story = {
  args: { label: 'Warning', variant: 'warning' },
};

export const Danger: Story = {
  args: { label: 'Danger', variant: 'danger' },
};
