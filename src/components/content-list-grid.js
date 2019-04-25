import React, { Component } from "react";
import Footer from "./footer.js";
import Header from "./header.js";
import Sidebar from "./sidebar.js";
import { Animated } from "react-animated-css";
import { Link } from "react-router-dom";
import axios from "axios";

import ScrollAnimation from "react-animate-on-scroll";
import { all_posts, category_type, setting_api } from "./../config/config";
import OwlCarousel, { Options } from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "animate.css/animate.min.css";

import { processContentListApi } from "./drupal-util";

class ContentListGrid extends Component {
  state = {
    type: [],
    blogs: [
      {
        nid: 0,
        typenameid: 0,
        typeId: "",
        title: "",
        image: "",
        date: "",
        type: ""
      }
    ],
    blogsPager: [
      {
        nid: 0,
        typenameid: 0,
        typeId: "",
        title: "",
        image: "",
        date: "",
        type: ""
      }
    ],

    NumberOfPage: 0,
    pageSelected: 0,
    itemPerPage: 0,
    pager: { count: "", pages: 0, items_per_page: 0, current_page: 0 }
  };

  componentDidMount = () => {
    this.pageChange({ index: 0 });
  };
  componentDidUpdate = () => {
    var dotsList = document.getElementsByClassName("owl-dot");
    for (var i = 0; i < dotsList.length; i++) {
      dotsList[i].firstElementChild.style.display = "none";
    }
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
    this.setState({ type: [] });
    let mainmenu = [],
      mainmenustate = [];
    fetch(all_posts(page_num))
      .then(blob => blob.json())
      .then(data => {
        if (data.results.length == 0) {
          window.location.href = "/";
        }
        this.setState({ itemPerPage: data.pager.items_per_page });
        this.setState({ pager: data.pager });
        mainmenu = data.results;
        fetch(setting_api)
          .then(blob3 => blob3.json())
          .then(data3 => {
            var processedData = processContentListApi(data3, mainmenu);
            this.setState(processedData);

            this.getype();
          });
      });
  };

  getype = () => {
    let menutype = [];
    // this.pageChange({index:0});
    var item = this.state.blogs;
    var mainObject = {},
      promises = [];
    var myUrl = "";

    item.forEach(function(singleElement) {
		//console.log(singleElement);
      myUrl = singleElement.typeId;
      //console.log("myUrl "+myUrl);
      if(myUrl){
        promises.push(axios.get(category_type(myUrl)));
	  }
    });

    axios.all(promises).then(results => {
      results.forEach(response => {
        console.log(response.data.tid[0].value);
        if (response.data.name != undefined) {
          menutype.push(response.data.name[0].value);
        } else {
          menutype.push("");
        }

        this.setState({ type: menutype });
      });
    });
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
        <div className="row">
          {this.state.blogs.map((item, index) => (
            <div key={index} className="col-md-6">
              <ScrollAnimation animateIn="fadeIn">
                <Link
                  to={"/Blog-Single?id=" + item.nid}
                  className="blog-entry"
                  data-animate-effect="fadeIn"
                >
                  {item.image.length > 0 ? (
                    <img
                      src={item.image}
                      alt="Image placeholder"
                      style={{ width: "100%", height: "250px" }}
                    />
                  ) : (
                    <span />
                  )}
                  <div className="blog-content-body">
                    <div className="post-meta">
                      <span className="category">{this.state.type[index]}</span>
                      <span className="mr-2">{item.date} </span>
                    
                    </div>
                    <h2>{item.title}</h2>
                  </div>
                </Link>
              </ScrollAnimation>
            </div>
          ))}
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

export default ContentListGrid;
