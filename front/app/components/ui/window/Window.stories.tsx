import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Window from './Window';

import { expect, within, userEvent } from "storybook/test"

const meta: Meta<typeof Window> = {
  title: 'Components/ui/Window',
  component: Window,
};

export default meta;

export const Default: StoryObj<typeof Window> = {
  args: {
    title: 'ウインドウのタイトル',
    children: <div>WindowContent</div>,
    onClose: () => {
      console.log('ウインドウを閉じました');
    },
  },
};

export const MinimizeTest: StoryObj<typeof Window> = {
  args: {
    title: '最小化テスト',
    children: <div className="text-white p-4">このウィンドウは最小化ボタンで非表示になります</div>,
    onClose: () => {
      console.log('ウインドウを閉じました');
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('最小化ボタンをクリックする', async () => {
      // すべてのボタンを取得（react-aria-componentsのButtonはrole="button"を持つ）
      const buttons = canvas.getAllByRole('button');
      // 2番目のボタンがminimizeボタン（黄色のボタン）
      const minimizeButton = buttons[1];

      // ウィンドウが表示されていることを確認
      const windowElement = canvasElement.querySelector('.bg-gray-800');
      expect(windowElement).toBeInTheDocument();

      // 最小化ボタンをクリック
      await userEvent.click(minimizeButton);
    });

    await step('ウィンドウが非表示になったことを確認する', async () => {
      // ウィンドウ要素が存在しないことを確認（nullが返される）
      const windowElement = canvasElement.querySelector('.bg-gray-800');
      expect(windowElement).not.toBeInTheDocument();
    });
  },
};
