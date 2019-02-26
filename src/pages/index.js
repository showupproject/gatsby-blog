import React from 'react'
import Layout from '../components/layout'
import {Link, graphql} from 'gatsby'

export default ({data}) => {
	console.log(data)

	const firstpost = data.firstpost.edges[0].node

	return (
		<Layout>
			<div key={firstpost.id} className="card">
				<Link to={firstpost.frontmatter.path}>
					<h3 className="card__title">{firstpost.frontmatter.title}</h3>
				</Link>
				<p className="card__date">{firstpost.frontmatter.date}</p>
				<div className="card__content" dangerouslySetInnerHTML={{__html: firstpost.html}} />
			</div>

			{data.restposts.edges.map(({node}) => (
				<div key={node.id} className="card">
					<Link to={node.frontmatter.path}>
						<h3 className="card__title">{node.frontmatter.title}</h3>
					</Link>
					<p className="card__date">{node.frontmatter.date}</p>
					<p className="card__content">{node.excerpt}</p>
					<Link to={node.frontmatter.path}>
						<p className="btn">Read More</p>
					</Link>
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
					excerpt(pruneLength: 350)
				}
			}
		}
	}
`
