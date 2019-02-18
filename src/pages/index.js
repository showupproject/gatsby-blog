import React from 'react'
import Layout from '../components/layout'
import {Link, graphql} from 'gatsby'

export default ({data}) => {
	console.log(data)
	return (
		<Layout>
			<div>
				<h1>Amazing Pandas Eating Things</h1>
				<h4>{data.allMarkdownRemark.totalCount} Posts</h4>
				{data.allMarkdownRemark.edges.map(({node}) => (
					<div key={node.id}>
						<Link to={node.frontmatter.path}>
							<h3>
								{node.frontmatter.title} <span>— {node.frontmatter.date}</span>
							</h3>
							<p>{node.excerpt}</p>
						</Link>
					</div>
				))}
			</div>
		</Layout>
	)
}

export const query = graphql`
	query {
		allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
			totalCount
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
