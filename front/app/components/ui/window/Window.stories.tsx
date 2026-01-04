import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Window from './Window';

import { expect, within, userEvent, fn } from "storybook/test"

const meta: Meta<typeof Window> = {
  title: 'Components/ui/Window',
  component: Window,
  args: {
    title: 'ウインドウのタイトル',
    children: <div>WindowContent</div>,
    onClose: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof Window> = {
};

export const MinimizeTest: StoryObj<typeof Window> = {
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button');
    const minimizeButton = buttons[1];

    await userEvent.click(minimizeButton);

    expect(canvas.queryByText('ウインドウのタイトル')).not.toBeInTheDocument();
  },
};

export const CloseTest: StoryObj<typeof Window> = {
  play: async ({ canvas, args }) => {
    const buttons = canvas.getAllByRole('button');
    const closeButton = buttons[0];

    await userEvent.click(closeButton);

    expect(canvas.queryByText('ウインドウのタイトル')).not.toBeInTheDocument();

    expect(args.onClose).toHaveBeenCalled();
  },
};