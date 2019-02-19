import React from 'react'
import Layout from '../components/layout'
import {Link, graphql} from 'gatsby'

export default ({data}) => {
	console.log(data)

	const firstpost = data.firstpost.edges[0].node

	return (
		<Layout>
			<div key={firstpost.id}>
				<Link to={firstpost.frontmatter.path}>
					<h3>{firstpost.frontmatter.title}</h3>
				</Link>
				<p>{firstpost.frontmatter.date}</p>
				<div dangerouslySetInnerHTML={{__html: firstpost.html}} />
			</div>

			{data.restposts.edges.map(({node}) => (
				<div key={node.id}>
					<Link to={node.frontmatter.path}>
						<h3>{node.frontmatter.title}</h3>
					</Link>
					<p>{node.frontmatter.date}</p>
					<p>{node.excerpt}</p>
				</div>
			))}
		</Layout>
	)
}

export const query = graphql`
	query {
		firstpost: allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, limit: 1) {
			edges {
				node {
					id
					frontmatter {
						title
						date(formatString: "MMMM DD, YYYY")
						path
					}
					html
				}
			}
		}
		restposts: allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, skip: 1) {
			edges {
				node {
					id
					frontmatter {
						title
						date(formatString: "MMMM DD, YYYY")
						path
					}
					excerpt
				}
			}
		}
	}
`
