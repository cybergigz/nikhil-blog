import React, { Component } from 'react';

import ContentListBlock from "./content-list-block.js";

class Footer extends Component {
    
    render() {
        return (
            <div>
                <footer className="site-footer">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-md-4">
                                <h3>Paragraph</h3>
                                <p>
                                    <img src="images/img_1.jpg" alt="Image placeholder" className="img-fluid"/>
                                </p>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, accusantium optio
                                    unde perferendis eum illum voluptatibus dolore tempora, consequatur minus asperiores
                                    temporibus reprehenderit.</p>
                            </div>
                            <div className="col-md-6 ml-auto">
                                <div className="row">
                                    <div className="col-md-7">
                                        <ContentListBlock tid="85" title="Series" limit="3" />
                                    </div>
                                    <div className="col-md-1"></div>

                                    <div className="col-md-4">

                                        <div className="mb-5">
                                            <h3>Quick Links</h3>
                                            <ul className="list-unstyled">
                                                <li><a href="#">About Us</a></li>
                                                <li><a href="#">Travel</a></li>
                                                <li><a href="#">Adventure</a></li>
                                                <li><a href="#">Courses</a></li>
                                                <li><a href="#">Categories</a></li>
                                            </ul>
                                        </div>

                                        <div className="mb-5">
                                            <h3>Social</h3>
                                            <ul className="list-unstyled footer-social">
                                                <li><a href="#"><span className="fa fa-twitter"></span> Twitter</a></li>
                                                <li><a href="#"><span className="fa fa-facebook"></span> Facebook</a>
                                                </li>
                                                <li><a href="#"><span className="fa fa-instagram"></span> Instagram</a>
                                                </li>
                                                <li><a href="#"><span className="fa fa-vimeo"></span> Vimeo</a></li>
                                                <li><a href="#"><span className="fa fa-youtube-play"></span> Youtube</a>
                                                </li>
                                                <li><a href="#"><span className="fa fa-snapchat"></span> Snapshot</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                Copyright &copy;
                         2019
                                All rights reserved | This template is made with <i className="fa fa-heart-o"
                                                                                    aria-hidden="true"></i> by <a
                                href="https://colorlib.com" >Colorlib</a>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        );
    }
}
export default Footer;
