import React, { Component } from "react";
import { category_posts, setting_api } from "./../config/config";
import { Link } from "react-router-dom";
import { processContentListApi } from "./drupal-util";

class ContentListBlockTitles extends Component {
  state = {
    blogs: [
      {
        nid: 0,
        title: ""
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
          <ul className="list-styled">
            {this.state.blogs.map((item, index) => (
              <li key={index}>
                <a href={"Blog-Single?id=" + item.nid}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
      </React.Fragment>
    );
  }
}

export default ContentListBlockTitles;
