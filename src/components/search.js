import React, { Component } from 'react';
import Footer from "./footer.js";
import Header from "./header.js";
import Sidebar from "./sidebar.js";
import ContentList from "./content-list.js";

class search extends Component {

    render() {
		const queryString = require('query-string');
        const xname = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).keywords

        return (
            <div>
			  <Header />

			  <section className="site-section">
			    <div className="container">
			      <div className="row mb-4">
			        <div className="col-md-6">
			          <h2 className="mb-4">Search: {xname}</h2>
			        </div>
			      </div>
			      <div className="row blog-entries">
					<ContentList search={xname} title={xname} />
			        <Sidebar />
			      </div>
			    </div>
			  </section>

			  <Footer />
			</div>
        );
    }
}
function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}
function replce_name(str){
    return  str.replace(/%20/g, " ");
}
export default search;
