import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'

export default ({data}) => {
	const post = data.markdownRemark
	console.log(data)
	return (
		<Layout>
			<div>
				<p className="card__date">{post.frontmatter.date}</p>
				<h1>{post.frontmatter.title}</h1>
				<div dangerouslySetInnerHTML={{__html: post.html}} />
			</div>
		</Layout>
	)
}

export const query = graphql`
	query($path: String!) {
		markdownRemark(frontmatter: {path: {eq: $path}}) {
			html
			frontmatter {
				title
				date
			}
		}
	}
`
