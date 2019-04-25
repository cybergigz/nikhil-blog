import React, { Component } from 'react';

import ContentListBlock from "./content-list-block.js";
import {sidebar_block1_title,sidebar_block1_tid,sidebar_block2_title,sidebar_block2_tid} from './../config/config';

class Sidebar extends Component {
    
    render() {
        return (

                            <div className="col-md-12 col-lg-4 sidebar">
                                <div className="sidebar-box search-form-wrap">
                                    <form action="/search" className="search-form">
                                        <div className="form-group">
                                            <span className="icon fa fa-search"></span>
                                            <input name="keywords" type="text" className="form-control" id="s"
                                                   placeholder="Type a keyword and hit enter"/>
                                        </div>
                                    </form>
                                </div>
                                <div className="sidebar-box">
                                    <ContentListBlock tid={sidebar_block1_tid} title={sidebar_block1_title} limit="3" />
                                </div>
                                <div className="sidebar-box">
                                    <ContentListBlock tid={sidebar_block2_tid} title={sidebar_block2_title} limit="4" />
                                </div>

                            </div>

             

        );
    }
   
}


export default Sidebar;
