import React from 'react'
import {graphql, Link} from 'gatsby'
import Layout from '../components/layout'

export default class BlogList extends React.Component {
	render() {
		const posts = this.props.data.allMarkdownRemark.edges
		return (
			<Layout>
				{posts.map(({node}) => {
					const title = node.frontmatter.title
					return (
						<div key={title}>
							<Link to={node.frontmatter.path}>
								<h3>{node.frontmatter.title}</h3>
							</Link>
							<p>{node.frontmatter.date}</p>
							<p>{node.excerpt}</p>
						</div>
					)
				})}
			</Layout>
		)
	}
}

export const blogListQuery = graphql`
	query blogListQuery($skip: Int!, $limit: Int!) {
		allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, limit: $limit, skip: $skip) {
			edges {
				node {
					frontmatter {
						title
						date
						path
					}
					excerpt
				}
			}
		}
	}
`
