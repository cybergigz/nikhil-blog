import React, { Component } from 'react';
import Footer from "./footer.js";
import Header from "./header.js";
import Sidebar from "./sidebar.js";
import ContentList from "./content-list.js";

class category extends Component {

    render() {
        const queryString = require('query-string');
        const xname = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).name
        const xId = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).id
        return (
            <div>
			  <Header />

			  <section className="site-section">
			    <div className="container">
			      <div className="row mb-4">
			        <div className="col-md-6">
			          <h2 className="mb-4">Category: {xname}</h2>
			        </div>
			      </div>
			      <div className="row blog-entries">
					<ContentList tid={xId} title={xname} />
			        <Sidebar />
			      </div>
			    </div>
			  </section>

			  <Footer />
			</div>
        );
    }
}

export default category;
