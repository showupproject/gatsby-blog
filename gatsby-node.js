const path = require('path')

exports.createPages = ({graphql, actions}) => {
	const {createPage} = actions
	return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
		if (result.errors) {
			reject(result.errors)
		}
		result.data.allMarkdownRemark.edges.forEach(({node}) => {
			createPage({
				path: node.frontmatter.path,
				component: path.resolve(`./src/templates/blog-post.js`),
				context: {
					// Data passed to context is available
					// in page queries as GraphQL variables.
				}
			})
		})

		const posts = result.data.allMarkdownRemark.edges
		const postsPerPage = 5
		const numPages = Math.ceil(posts.length / postsPerPage)
		Array.from({length: numPages}).forEach((_, i) => {
			createPage({
				path: i === 0 ? `/blog` : `/blog/${i + 1}`,
				component: path.resolve('./src/templates/blog-list.js'),
				context: {
					limit: postsPerPage,
					skip: i * postsPerPage
				}
			})
		})
	})
}
