import React from 'react'
import {Link} from 'gatsby'

import './layout.css'

const ListLink = props => (
	<li>
		<Link to={props.to}>{props.children}</Link>
	</li>
)

export default ({children}) => (
	<div>
		<nav>
			<ul>
				<ListLink to="/">Home</ListLink>
				<ListLink to="/about/">About</ListLink>
				<ListLink to="/blog">Blog</ListLink>
				<ListLink to="/myfavorites">My Favorites</ListLink>
				<ListLink to="/contact/">Contact</ListLink>
			</ul>
		</nav>

		<div style={{margin: `3rem auto`, maxWidth: 750, padding: `0 1rem`}}>
			<header style={{marginBottom: `1.5rem`}}>
				<Link to="/" style={{textShadow: `none`, backgroundImage: `none`}}>
					<h1 className="title">A Blog about book</h1>
				</Link>
			</header>
			{children}
		</div>
	</div>
)
