import React, { Component } from 'react';
import Footer from "./footer.js";
import Header from "./header.js";
import Sidebar from "./sidebar.js";
import ContentList from "./content-list.js";

class category extends Component {

    render() {
        const xname =replce_name(GetParameterValues('name'));
        const xId = GetParameterValues("id");
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
					<ContentList tid="{xId}" />
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
export default category;
