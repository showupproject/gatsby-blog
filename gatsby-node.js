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
	})
}
