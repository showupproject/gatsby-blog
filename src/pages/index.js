import React from 'react'
import Layout from '../components/layout'
import {Link, graphql} from 'gatsby'

export default class Landing extends React.Component {
	render() {
		const firstpost = this.props.data.firstpost.edges[0].node
		return (
			<Layout>
				<p>Recent Posts</p>
				<div key={firstpost.id} className="card">
					<p className="card__date">{firstpost.frontmatter.date}</p>
					<Link to={firstpost.frontmatter.path}>
						<h3 className="card__title">{firstpost.frontmatter.title}</h3>
					</Link>
					<div className="card__content" dangerouslySetInnerHTML={{__html: firstpost.html}} />
					<hr />
				</div>

				{this.props.data.restposts.edges.map(({node}) => (
					<div key={node.id} className="card">
						<p className="card__date">{node.frontmatter.date}</p>
						<Link to={node.frontmatter.path}>
							<h3 className="card__title">{node.frontmatter.title}</h3>
						</Link>
						<p className="card__content">{node.excerpt}</p>
						<Link to={node.frontmatter.path}>
							<p className="btn">Read More</p>
						</Link>
						<hr />
					</div>
				))}
				<Link to="/blog">More Blogs</Link>
			</Layout>
		)
	}
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
		restposts: allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, skip: 1, limit: 4) {
			edges {
				node {
					id
					frontmatter {
						title
						date(formatString: "MMMM DD, YYYY")
						path
					}
					excerpt(pruneLength: 400)
				}
			}
		}
	}
`
