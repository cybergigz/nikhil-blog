import React, { Component } from "react";
import Footer from "./footer.js";
import Header from "./header.js";
import Sidebar from "./sidebar.js";

import { Link } from "react-router-dom";

import { Animated } from "react-animated-css";
import { list_of_category_type, list_of_content_search, setting_api } from "./../config/config";
import ScrollAnimation from "react-animate-on-scroll";

import "animate.css/animate.min.css";

import { processContentListApi } from "./drupal-util";

class ContentList extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: "",
    blogs: [
      {
        nid: 0,
        title: "",
        image: "",
        date: ""
      }
    ],
    blogsPager: [
      {
        nid: 0,
        title: "",
        image: "",
        date: ""
      }
    ],

    NumberOfPage: 0,
    pageSelected: 0,
    itemPerPage: 0,
    pager: { count: "", pages: 0, items_per_page: 0, current_page: 0 }
  };

  componentWillMount = () => {
    this.pageChange({ index: 0 });
  };
  componentDidUpdate = () => {
    var index = this.state.pageSelected;
    var pagerListSelected = document.getElementsByClassName(
      "pagerclass" + (index + 1)
    );
    if (pagerListSelected[0] != undefined) {
      pagerListSelected[0].classList.add("active");
    }
    window.scrollTo(0, 0);
  };
  pageChange = index => {
    let itemPerPage = this.state.itemPerPage;
    this.setState({ pageSelected: index.index });
    var pagerList = document.getElementsByClassName("pagerclass");
    for (var i = 0; i < pagerList.length; i++) {
      pagerList[i].classList.remove("active");
    }

    this.fetchDataAPI2(index.index);
  };
  nextClick = () => {
    const itemPerPage = this.state.itemPerPage;

    const numOfPage = this.state.pager.pages;
    var pageSelected = this.state.pageSelected;
    if (pageSelected + 1 < numOfPage) {
      this.pageChange({ index: pageSelected + 1 });
    }
  };
  prevClick = () => {
    var pageSelected = this.state.pageSelected;
    if (pageSelected > 0) {
      this.pageChange({ index: pageSelected - 1 });
    }
  };
  fetchDataAPI2 = page_num => {
    let mainmenu = [],
      mainmenustate = [];
    var xname = this.props.title;
    var fetchURL = "";
    //console.log(this.props);
    if (this.props.tid){
		var xId = this.props.tid;

		fetchURL = list_of_category_type(xId, page_num);
	}else if (this.props.search){
		fetchURL = list_of_content_search(this.props.search, page_num);
	} else {
      //window.location.href = "/";
    }
    console.log("fetchURL"+fetchURL);
    this.setState({ name: xname });
    if(fetchURL){
    fetch(fetchURL)
      .then(blob => blob.json())
      .then(data => {
		this.setState({ resultsLength: data.results.length });
        if (data.results.length == 0) {
          //window.location.href = "/";
        }

        this.setState({ itemPerPage: data.pager.items_per_page });
        this.setState({ pager: data.pager });
        mainmenu = data.results;
        fetch(setting_api)
          .then(blob3 => blob3.json())
          .then(data3 => {
            var processedData = processContentListApi(data3, mainmenu);
            this.setState(processedData);
          });
      });
	}
  };

  render() {
    const itemPerPage = this.state.itemPerPage;
    const ArrayOfPage = [];

    if (itemPerPage > 0) {
      const numOfPage = this.state.pager.pages;
      for (var x = 1; x <= numOfPage; x++) {
        ArrayOfPage.push(x);
      }
    }
    return (
      <div className="col-md-12 col-lg-8 main-content">
		<h3> {this.state.resultsLength} results</h3>
        <div className="row mb-5 mt-5">
          <div className="col-md-12">
            {this.state.blogs.map((item, index) => (
              <ScrollAnimation key={index} animateIn="fadeIn">
                <div className="post-entry-horzontal">
                  <Link
                    to={"Blog-Single?id=" + item.nid}
                    style={{ width: "100%" }}
                  >
                    {((item.image != null) && item.image) ? (
                      <div
                        className="image"
                        style={{
                          backgroundImage: "url(" + item.image + ")"
                        }}
                      />
                    ) : (
                      <span />
                    )}
                    <span className="text">
                      <div className="post-meta">
                        <span className="category"> {this.state.name} </span>
                        <span className="mr-2">{item.date} </span>
                        
                      </div>
                      <h2>{item.title}</h2>
                    </span>
                  </Link>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 text-center">
            <nav aria-label="Page navigation" className="text-center">
              <ul className="pagination">
                <li className="page-item ">
                  <a className="page-link" onClick={() => this.prevClick()}>
                    Prev
                  </a>
                </li>
                {ArrayOfPage.map((item, index) => (
                  <li
                    key={index}
                    className={"page-item pagerclass pagerclass" + item}
                  >
                    <a
                      className="page-link"
                      onClick={() => this.pageChange({ index })}
                    >
                      {item}
                    </a>
                  </li>
                ))}

                <li className="page-item">
                  <a className="page-link" onClick={() => this.nextClick()}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentList;
