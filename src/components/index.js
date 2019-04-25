import React, { Component } from 'react';
import Footer from "./footer.js";
import Header from "./header.js";
import ContentListBlockSlideshow from "./content-list-block-slideshow.js";
import ContentListBlockFeaturedGrid from "./content-list-block-featured-grid.js";
import Sidebar from "./sidebar.js";
import {Animated} from "react-animated-css";
import { Link } from "react-router-dom";
import  axios from "axios";


import ScrollAnimation from 'react-animate-on-scroll';
import {homepage_featured_tid,all_posts,category_type,setting_api} from './../config/config';

import "animate.css/animate.min.css";

import { processContentListApi } from "./drupal-util";
import ContentListGrid from "./content-list-grid.js";





class index extends Component {
    render() {      
        return (
            <div>
                <Header/>
   <section className="site-section pt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                              {/*   <ContentListBlockSlideshow tid={homepage_featured_tid} limit="4" /> */}
                              

                            </div>
                        </div>
                        <ContentListBlockFeaturedGrid tid={homepage_featured_tid} limit="3" />
                        
                    </div>


                </section>
               
                <section className="site-section py-sm">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h2 className="mb-4">All Content</h2>
                            </div>
                        </div>
                        <div className="row blog-entries">
						<ContentListGrid/>

						<Sidebar/>
                        </div>
                    </div>
                </section>
                <Footer/>

                <div id="loader" className="fullscreen">
                    <svg className="circular" width="48px" height="48px">
                        <circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4"
                                stroke="#eeeeee"/>
                        <circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4"
                                strokeMiterlimit="10" stroke="#f4b214"/>
                    </svg>
                </div>

            </div>
        );
    }
   
}


export default index;
