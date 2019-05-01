import React, { Component } from "react";
import { category_posts, setting_api } from "./../config/config";
import { Link } from "react-router-dom";
import { processContentListApi } from "./drupal-util";

class ContentListBlock extends Component {
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
      <React.Fragment>
        <h3 className="heading">{this.props.title}</h3>
        <div className="post-entry-sidebar">
          <ul>
            {this.state.blogs.map((item, index) => (
              <li key={index}>
                <a href={"Blog-Single?id=" + item.nid}>
                  {((item.image != null) && item.image) ? (
                    <img
                      src={item.image}
                      style={{ height: "61px" }}
                      alt="Image placeholder"
                      className="mr-4"
                    />
                  ) : (
                    <span />
                  )}
                  <div className="text">
                    <h4>{item.title}</h4>
                    <div className="post-meta">
                      <span className="mr-2">{item.date} </span>
                      
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default ContentListBlock;
