import BlogItemContainer from '@/app/_containers/blog/item/container'

export default async function BlogItemPage(props: { params: { blogId: string } }) {
	const { blogId } = await props.params

	return <BlogItemContainer blogId={blogId} isModal={true} />
}
