'use client'

import { BudouXText } from '@/components/ui/text/bundouxText'
import Image from 'next/image'
import { CustomComponents } from './types'

export const defaultComponents: CustomComponents = {
	p: ({ children, ...props }) => {
		if (typeof children === 'string') {
			return (
				<p className="text-md mb-4 text-gray-300" {...props}>
					<BudouXText text={children as string} />
				</p>
			)
		}
		return (
			<p className="text-md mb-4 text-gray-300" {...props}>
				{children}
			</p>
		)
	},
	a: ({ children, href, ...props }) => (
		<a href={href} className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer" {...props}>
			{children}
		</a>
	),
	h1: ({ children, ...props }) => (
		<h1 className="mb-4 text-5xl font-bold" {...props}>
			<BudouXText text={children as string} />
		</h1>
	),
	h2: ({ children, ...props }) => (
		<h2 className="mb-3 text-4xl font-bold" {...props}>
			<BudouXText text={children as string} />
		</h2>
	),
	h3: ({ children, ...props }) => (
		<h3 className="mb-2 text-xl font-bold" {...props}>
			<BudouXText text={children as string} />
		</h3>
	),
	ul: ({ children, ...props }) => (
		<ul className="mb-4 list-inside list-disc pl-4 [&>li>ul]:pl-4" {...props}>
			{children}
		</ul>
	),
	ol: ({ children, ...props }) => (
		<ol className="mb-4 list-inside list-decimal" {...props}>
			{children}
		</ol>
	),
	li: ({ children, ...props }) => (
		<li className="mb-1" {...props}>
			{children}
		</li>
	),
	blockquote: ({ children, ...props }) => (
		<blockquote className="mb-4 border-l-4 border-gray-300 pl-4 italic" {...props}>
			{children}
		</blockquote>
	),
	code: ({ children, ...props }) => (
		<code className="rounded bg-gray-200 px-1 py-0.5" {...props}>
			{children}
		</code>
	),
	pre: ({ children, ...props }) => (
		<pre className="mb-4 overflow-x-auto rounded bg-gray-200 p-4" {...props}>
			{children}
		</pre>
	),
	img: ({ src, alt }) => (
		<Image
			src={src as string}
			alt={alt || ''}
			width={1000}
			height={1000}
			className="pointer-events-none mx-auto mb-4 h-auto max-w-full rounded-lg object-contain select-none md:max-w-3xl"
			unoptimized
		/>
	),
	hr: () => (
		<div className="relative my-8">
			<div className="absolute inset-0 flex items-center">
				<div className="w-full border-t border-gray-300"></div>
			</div>
			<div className="relative flex justify-center">
				<div className="bg-white px-4">
					<div className="h-4 w-4 animate-[slide_2s_ease-in-out_infinite] rounded-full border-2 border-gray-300"></div>
				</div>
			</div>
		</div>
	),
}
