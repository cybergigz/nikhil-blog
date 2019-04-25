import React, { Component } from "react";
import {
  list_of_categories,
  setting_api,
  sitename,
  twitter_handle,
  facebook_handle
} from "./../config/config";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {
    menuData: [
      {
        weight: 0,
        tid: "",
        name: "",
        parentId: "",
        children: []
      }
    ]
  };
  componentWillMount = () => {
    fetch(setting_api)
      .then(blob2 => blob2.json())
      .then(data2 => {
        var reactjs_blog_categorySetting =
          data2.settings.taxonomy_menu_vocabulary;

        fetch(list_of_categories(reactjs_blog_categorySetting))
          .then(blob => blob.json())
          .then(data => {
            var mainmenu = [],
              mainmenu2 = [],
              mainmenu2reve = [],
              map = {},
              map2 = {};
            var x = -1;

            for (var i = 0; i < data.results.length; i++) {
              if (data.results[i].parent[0].target_id == null) {
                x = x + 1;

                map[data.results[i].tid[0].value] = x;

                let item = {
                  weight: data.results[i].weight[0].value,
                  tid: data.results[i].tid[0].value,
                  name: data.results[i].name[0].value,
                  children: []
                };
                mainmenu.push(item);
              }
            }

            for (var i = 0; i < data.results.length; i++) {
              if (data.results[i].parent[0].target_id != null) {
                let mapIndex = map[data.results[i].parent[0].target_id];
                if (mapIndex != undefined) {
                  // map2[data.results[i].tid[0].value] = i; // initialize the map

                  let item = {
                    weight: data.results[i].weight[0].value,
                    tid: data.results[i].tid[0].value,
                    name: data.results[i].name[0].value,
                    parentId: data.results[i].parent[0].target_id,
                    children: []
                  };
                  if (mainmenu[mapIndex] != undefined)
                    mainmenu[mapIndex].children.push(item);
                }
              }
            }
            mainmenu = mainmenu.sort(function(a, b) {
              return a.weight - b.weight;
            });

            for (var i = 0; i < mainmenu.length; i++) {
              if (mainmenu[i].children != null) {
                var childArray = mainmenu[i].children;
                mainmenu[i].children = childArray.sort(function(a, b) {
                  return a.weight - b.weight;
                });
              }
            }

            this.setState({ menuData: mainmenu });
          })
          .catch(e => {
            console.log(e);
            return e;
          });
      });
  };

  render() {
    return (
      <div>
        <header role="banner">
          <div className="top-bar">
            <div className="container">
              <div className="row">
                <div className="col-9 social">
                  {twitter_handle != "" && (
                    <a href={twitter_handle}>
                      <span className="fa fa-twitter" />
                    </a>
                  )}
                  
                  {facebook_handle != "" && (
                    <a href={facebook_handle}>
                      <span className="fa fa-facebook" />
                    </a>
                  )}
                </div>
                <div className="col-3 search-top">
                  <form action="/search" className="search-top-form" method="get">
                    <span className="icon fa fa-search" />
                    <input
                      type="text"
                      id="s"
                      name="keywords"
                      placeholder="Type keyword to search..."
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="container logo-wrap">
            <div className="row pt-5">
              <div className="col-12 text-center">
                <a
                  className="absolute-toggle d-block d-md-none"
                  data-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  onClick={() => this.mobileMebnubtn()}
                >
                  <span className="burger-lines" />
                </a>
                <h1 className="site-logo">
                  <Link to="/">{sitename}</Link>
                </h1>
              </div>
            </div>
          </div>

          <nav className="navbar navbar-expand-md  navbar-light bg-light">
            <div className="container">
              <div className="collapse navbar-collapse" id="navbarMenu">
                <ul className="navbar-nav mx-auto">
                  {this.state.menuData.map(item =>
                    item.children.length === 0 ? (
                      <li key={item.tid} className="nav-item">
                        <a
                          className="nav-link"
                          href={
                            "/category?id=" + item.tid + "&name=" + item.name
                          }
                        >
                          {item.name}
                        </a>
                      </li>
                    ) : (
                      <li key={item.tid} className=" nav-item dropdown">
                        <a
                          className=" nav-link dropdown-toggle"
                          onMouseEnter={this.OnmenuHover}
                          href={
                            "/category?id=" + item.tid + "&name=" + item.name
                          }
                          id="dropdown04"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {item.name}
                        </a>
                        <div
                          className="dropdown-menu navhover2"
                          onMouseLeave={this.OnmenuLeave}
                          aria-labelledby="dropdown04"
                        >
                          {item.children.map(itemChild => (
                            <a
                              className="dropdown-item"
                              key={itemChild.tid}
                              href={
                                "/category?id=" +
                                itemChild.tid +
                                "&name=" +
                                itemChild.name
                              }
                            >
                              {itemChild.name}
                            </a>
                          ))}
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
  OnmenuHover = e => {
    var dotsList = document.getElementsByClassName("navhover2");
    for (var i = 0; i < dotsList.length; i++) {
      dotsList[i].classList.remove("show");
    }
    e.target.parentElement.classList.add("show");
    e.target.nextElementSibling.classList.add("show");
  };

  OnmenuLeave = e => {
    e.target.parentElement.classList.remove("show");
    e.target.classList.remove("show");
  };
  mobileMebnubtn = () => {
    let navbarMenu = document.getElementById("navbarMenu");
    if (navbarMenu != null) {
      if (navbarMenu.classList.contains("show")) {
        navbarMenu.classList.remove("show");
      } else {
        navbarMenu.classList.add("show");
      }
    }
  };
}

export default Header;
