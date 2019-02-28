import React from 'react'
import {graphql, Link} from 'gatsby'
import Layout from '../components/layout'

export default class BlogList extends React.Component {
	render() {
		const posts = this.props.data.allMarkdownRemark.edges
		const {currentPage, numPages} = this.props.pageContext
		const isFirst = currentPage === 1
		const isLast = currentPage === numPages
		const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
		const nextPage = (currentPage + 1).toString()

		return (
			<Layout>
				{posts.map(({node}) => {
					const title = node.frontmatter.title
					return (
						<div className="card post" key={title}>
							<p className="card__date">{node.frontmatter.date}</p>
							<Link to={node.frontmatter.path}>
								<h3 className="card__title">{node.frontmatter.title}</h3>
							</Link>
							<p className="card__content">{node.excerpt}</p>
							<Link to={node.frontmatter.path}>
								<p className="btn">Read More</p>
							</Link>
						</div>
					)
				})}
				{!isFirst &&
				numPages !== 1 && (
					<Link to={`/blog/${prevPage}`} rel="prev">
						← Previous Page
					</Link>
				)}
				{!isLast && (
					<Link to={`/blog/${nextPage}`} rel="next">
						Next Page →
					</Link>
				)}
				{Array.from({length: numPages}, (_, i) => (
					<Link key={`pagination-number${i + 1}`} to={`/blog/${i === 0 ? '' : i + 1}`}>
						{i + 1}
					</Link>
				))}
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
					excerpt(pruneLength: 400)
				}
			}
		}
	}
`
