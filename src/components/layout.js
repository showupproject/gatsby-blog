import React from 'react'
import {Link} from 'gatsby'

import './layout.css'

const ListLink = props => (
	<li>
		<Link to={props.to}>{props.children}</Link>
	</li>
)

export default ({children}) => (
	<div className="body">
		<nav>
			<ul>
				<ListLink to="/">Home</ListLink>
				<ListLink to="/about/">About</ListLink>
				<ListLink to="/blog">Blog</ListLink>
				<ListLink to="/myfavorites">My Favorites</ListLink>
				<ListLink to="/contact/">Contact</ListLink>
			</ul>
		</nav>
		<header style={{marginBottom: `2.4rem`}}>
			<Link to="/">
				<h1 className="title">A Blog about book</h1>
			</Link>
		</header>
		<div className="container">
			<main>{children}</main>
			<aside>
				<div className="about">
					<h4>about me</h4>
					<p className="aside__p">I love healthy living, and everything about it. This is my corner.</p>
				</div>
				<div className="searchbar">
					<h4>Search</h4>
					<p className="aside__p" />
				</div>
			</aside>
		</div>
		<footer>&copy;Copyright 2019</footer>
	</div>
)
