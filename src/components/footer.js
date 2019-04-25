import React, { Component } from 'react';

import ContentListBlock from "./content-list-block.js";
import ContentListBlockTitles from "./content-list-block-title.js";
import {footer_block1_title,footer_block2_title,footer_block1_tid,footer_block2_tid,secondary_menu_tid,secondary_menu_title,twitter_handle,facebook_handle} from './../config/config';

class Footer extends Component {
    
    render() {
        return (
            <div>
                <footer className="site-footer">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-md-4">
								<ContentListBlock tid={footer_block1_tid} title={footer_block1_title} limit="3" />
                            </div>
                            <div className="col-md-6 ml-auto">
                                <div className="row">
                                    <div className="col-md-7">
                                        <ContentListBlock tid={footer_block2_tid} title={footer_block2_title} limit="3" />
                                    </div>
                                    <div className="col-md-1"></div>

                                    <div className="col-md-4">

                                        <div className="mb-5">
											<ContentListBlockTitles tid={secondary_menu_tid} title={secondary_menu_title} limit="5" />
                                        </div>

                                        <div className="mb-5">
                                            <h3>Social</h3>
                                            <ul className="list-unstyled footer-social">
                                            {twitter_handle != "" && (
                    <li><a href={twitter_handle}>
                      <span className="fa fa-twitter" /> Twitter
                    </a></li>
                  )}
                  {facebook_handle != "" && (
                    <li><a href={facebook_handle}>
                      <span className="fa fa-facebook" /> Facebook
                    </a></li>
                  )}
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
