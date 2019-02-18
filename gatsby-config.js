module.exports = {
	siteMetadata: {
		title: `A Reader Within`
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `src`,
				path: `${__dirname}/src/`
			}
		},
		`gatsby-transformer-remark`
	]
}
