import React, { Component } from "react";
import { category_posts, setting_api } from "./../config/config";
import { Link } from "react-router-dom";
import { processContentListApi } from "./drupal-util";

import OwlCarousel, { Options } from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class ContentListBlockSlideshow extends Component {
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
    console.log(category_posts(this.props.tid));
    fetch(category_posts(this.props.tid))
      .then(blob => blob.json())
      .then(data => {
        mainmenu = data.results;
        fetch(setting_api)
          .then(blob3 => blob3.json())
          .then(data3 => {
			  console.log(data3);
            var processedData = processContentListApi(data3, mainmenu, this.props.limit);
            console.log(processedData);
            this.setState(processedData);
          });
      });
  };

  render() {
	  const ConsoleLog = ({ children }) => {
  console.log(children);
  return false;
};
	    const options = {
            loop:true,
            autoplay: true,
            margin:10,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            nav:true,
            dots:true,
            autoplayHoverPause: true,
            items: 1,
            navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:true
                }
            }
        };
        console.log(this.state.blogs);
    return (
    <React.Fragment>
      <OwlCarousel className="owl-carousel owl-theme home-slider"
                                             {...options}


                                >
                                { console.log(this.props.tid) }
                                {this.state.blogs.map((item, index) => (

                                    <div key={index}>
                                    								<ConsoleLog>{ item }</ConsoleLog>
                                    {item.title}
                                        <a href="blog-single.html"
                                           className="a-block d-flex align-items-center height-lg"
                                           style={{backgroundImage: 'url(./images/img_1.jpg)'}}>
                                            <div className="text half-to-full">
                                                <div className="post-meta">
                                                    <span className="category">Lifestyle</span>
                                                    <span className="mr-2">{item.date}</span> &bullet;
                                                    <span className="ml-2"><span
                                                        className="fa fa-comments"></span> 3</span>
                                                </div>
                                                <h3>{item.title}</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
                                                    nobis, ut dicta eaque ipsa laudantium!</p>
                                            </div>
                                        </a>
                                    </div>
								))}
                                </OwlCarousel>
                                </React.Fragment>
    );
  }
}

export default ContentListBlockSlideshow;
