import React, { Component } from "react";
import { category_posts, setting_api } from "./../config/config";
import { Link } from "react-router-dom";
import { processContentListApi } from "./drupal-util";

class ContentListBlockFeaturedGrid extends Component {
  state = {
    blogs: [
      {
        nid: 0,
        title: "",
        image: "",
        date: ""
      }
    ]
  };

  componentWillMount = () => {
    let mainmenu = [];
    fetch(category_posts(this.props.tid))
      .then(blob => blob.json())
      .then(data => {
        mainmenu = data.results;
        fetch(setting_api)
          .then(blob3 => blob3.json())
          .then(data3 => {
            var processedData = processContentListApi(data3, mainmenu, this.props.limit);
            this.setState(processedData);
          });
      });
  };

  render() {
    return (
      <div className="row">
		{this.state.blogs.map((item, index) => (
                            <div className="col-md-6 col-lg-4" key={index}>
                                <a href={"Blog-Single?id=" + item.nid} className="a-block d-flex align-items-center height-md"
                                   style={{backgroundImage: 'url(' + item.image + ')'}} >
                                    <div className="text">
                                        <div className="post-meta">
                                            <span className="category">{item.date}</span>
                                            {/* <span className="mr-2">{item.date} </span> */}
                                        </div>
                                        <h3>{item.title}</h3>
                                    </div>
                                </a>
                            </div>
        ))}
      </div>
    );
  }
}

export default ContentListBlockFeaturedGrid;
