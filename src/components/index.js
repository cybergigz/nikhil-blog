import React, { Component } from 'react';
import Footer from "./footer.js";
import Header from "./header.js";
import {Animated} from "react-animated-css";
import OwlCarousel, { Options } from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';




class index extends Component {
componentDidMount=()=>{
    var dotsList=document.getElementsByClassName("owl-dot");
    for (var i=0;i<dotsList.length;i++)
    {
      dotsList[i].innerHTML="";
    }
}


    render() {
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
        return (
            <div>
                <Header/>

                <section className="site-section pt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <OwlCarousel className="owl-carousel owl-theme home-slider"
                                             {...options}


                                >
                                    <div>
                                        <a href="blog-single.html"
                                           className="a-block d-flex align-items-center height-lg"
                                           style={{backgroundImage: 'url(./images/img_1.jpg)'}}>
                                            <div className="text half-to-full">
                                                <div className="post-meta">
                                                    <span className="category">Lifestyle</span>
                                                    <span className="mr-2">March 15, 2018 </span> &bullet;
                                                    <span className="ml-2"><span
                                                        className="fa fa-comments"></span> 3</span>
                                                </div>
                                                <h3>There’s a Cool New Way for Men to Wear Socks and Sandals</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
                                                    nobis, ut dicta eaque ipsa laudantium!</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="blog-single.html"
                                           className="a-block d-flex align-items-center height-lg"
                                           style={{backgroundImage: 'url(./images/img_2.jpg)' }}>
                                            <div className="text half-to-full">
                                                <div className="post-meta">
                                                    <span className="category">Lifestyle</span>
                                                    <span className="mr-2">March 15, 2018 </span> &bullet;
                                                    <span className="ml-2"><span
                                                        className="fa fa-comments"></span> 3</span>
                                                </div>
                                                <h3>There’s a Cool New Way for Men to Wear Socks and Sandals</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
                                                    nobis, ut dicta eaque ipsa laudantium!</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="blog-single.html"
                                           className="a-block d-flex align-items-center height-lg"
                                           style={{backgroundImage: 'url(./images/img_3.jpg)' }}>
                                            <div className="text half-to-full">
                                                <div className="post-meta">
                                                    <span className="category">Lifestyle</span>
                                                    <span className="mr-2">March 15, 2018 </span> &bullet;
                                                    <span className="ml-2"><span
                                                        className="fa fa-comments"></span> 3</span>
                                                </div>
                                                <h3>There’s a Cool New Way for Men to Wear Socks and Sandals</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
                                                    nobis, ut dicta eaque ipsa laudantium!</p>
                                            </div>
                                        </a>
                                    </div>
                                </OwlCarousel>
                                <div className="owl-carousel owl-theme home-slider">
                                    <div>
                                        <a href="blog-single.html"
                                           className="a-block d-flex align-items-center height-lg"
                                           style={{backgroundImage: 'url(./images/img_1.jpg)'}}>
                                            <div className="text half-to-full">
                                                <div className="post-meta">
                                                    <span className="category">Lifestyle</span>
                                                    <span className="mr-2">March 15, 2018 </span> &bullet;
                                                    <span className="ml-2"><span
                                                        className="fa fa-comments"></span> 3</span>
                                                </div>
                                                <h3>There’s a Cool New Way for Men to Wear Socks and Sandals</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
                                                    nobis, ut dicta eaque ipsa laudantium!</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="blog-single.html"
                                           className="a-block d-flex align-items-center height-lg"
                                           style={{backgroundImage: 'url(./images/img_2.jpg)' }}>
                                            <div className="text half-to-full">
                                                <div className="post-meta">
                                                    <span className="category">Lifestyle</span>
                                                    <span className="mr-2">March 15, 2018 </span> &bullet;
                                                    <span className="ml-2"><span
                                                        className="fa fa-comments"></span> 3</span>
                                                </div>
                                                <h3>There’s a Cool New Way for Men to Wear Socks and Sandals</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
                                                    nobis, ut dicta eaque ipsa laudantium!</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="blog-single.html"
                                           className="a-block d-flex align-items-center height-lg"
                                           style={{backgroundImage: 'url(./images/img_3.jpg)' }}>
                                            <div className="text half-to-full">
                                                <div className="post-meta">
                                                    <span className="category">Lifestyle</span>
                                                    <span className="mr-2">March 15, 2018 </span> &bullet;
                                                    <span className="ml-2"><span
                                                        className="fa fa-comments"></span> 3</span>
                                                </div>
                                                <h3>There’s a Cool New Way for Men to Wear Socks and Sandals</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
                                                    nobis, ut dicta eaque ipsa laudantium!</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <a href="blog-single.html" className="a-block d-flex align-items-center height-md"
                                   style={{backgroundImage: 'url(./images/img_2.jpg)'}} >
                                    <div className="text">
                                        <div className="post-meta">
                                            <span className="category">Lifestyle</span>
                                            <span className="mr-2">March 15, 2018 </span> &bullet;
                                            <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                        </div>
                                        <h3>There’s a Cool New Way for Men to Wear Socks and Sandals</h3>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <a href="blog-single.html" className="a-block d-flex align-items-center height-md"
                                   style={{backgroundImage: 'url(./images/img_3.jpg)'}}>
                                    <div className="text">
                                        <div className="post-meta">
                                            <span className="category">Travel</span>
                                            <span className="mr-2">March 15, 2018 </span> &bullet;
                                            <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                        </div>
                                        <h3>There’s a Cool New Way for Men to Wear Socks and Sandals</h3>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <a href="blog-single.html" className="a-block d-flex align-items-center height-md"
                                   style={{backgroundImage: 'url(./images/img_4.jpg)' }}>
                                    <div className="text">
                                        <div className="post-meta">
                                            <span className="category">Food</span>
                                            <span className="mr-2">March 15, 2018 </span> &bullet;
                                            <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                        </div>
                                        <h3>There’s a Cool New Way for Men to Wear Socks and Sandals</h3>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>


                </section>

                <section className="site-section py-sm">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h2 className="mb-4">Lifestyle Category</h2>
                            </div>
                        </div>
                        <div className="row blog-entries">
                            <div className="col-md-12 col-lg-8 main-content">
                                <div className="row">
                                    <div className="col-md-6">
                                        <ScrollAnimation animateIn="fadeIn">

                                        <a href="blog-single.html" className="blog-entry"
                                           >
                                            <img src="./images/img_5.jpg" alt="Image placeholder"/>
                                                <div className="blog-content-body">
                                                    <div className="post-meta">
                                                        <span className="category">Food</span>
                                                        <span className="mr-2">March 15, 2018 </span> &bullet;
                                                        <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                                    </div>
                                                    <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                                                </div>
                                        </a>
                                        </ScrollAnimation>
                                    </div>
                                    <div className="col-md-6">
                                        <ScrollAnimation animateIn="fadeIn">

                                        <a href="blog-single.html" className="blog-entry"
                                           data-animate-effect="fadeIn">
                                            <img src="./images/img_6.jpg" alt="Image placeholder"/>
                                                <div className="blog-content-body">
                                                    <div className="post-meta">
                                                        <span className="category">Travel</span>
                                                        <span className="mr-2">March 15, 2018 </span> &bullet;
                                                        <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                                    </div>
                                                    <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                                                </div>
                                        </a>
                                        </ScrollAnimation>
                                    </div>

                                    <div className="col-md-6">
                                        <ScrollAnimation animateIn="fadeIn">

                                        <a href="blog-single.html" className="blog-entry"
                                           data-animate-effect="fadeIn">
                                            <img src="./images/img_7.jpg" alt="Image placeholder"/>
                                                <div className="blog-content-body">
                                                    <div className="post-meta">
                                                        <span className="category">Travel, Asia</span>
                                                        <span className="mr-2">March 15, 2018 </span> &bullet;
                                                        <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                                    </div>
                                                    <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                                                </div>
                                        </a>
                                        </ScrollAnimation>
                                    </div>
                                    <div className="col-md-6">
                                        <ScrollAnimation animateIn="fadeIn">

                                        <a href="blog-single.html" className="blog-entry"
                                           data-animate-effect="fadeIn">
                                            <img src="./images/img_8.jpg" alt="Image placeholder"/>
                                                <div className="blog-content-body">
                                                    <div className="post-meta">
                                                        <span className="category">Travel</span>
                                                        <span className="mr-2">March 15, 2018 </span> &bullet;
                                                        <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                                    </div>
                                                    <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                                                </div>
                                        </a>
                                        </ScrollAnimation>
                                    </div>

                                    <div className="col-md-6">
                                        <ScrollAnimation animateIn="fadeIn">

                                        <a href="blog-single.html" className="blog-entry"
                                           data-animate-effect="fadeIn">
                                            <img src="./images/img_9.jpg" alt="Image placeholder"/>
                                                <div className="blog-content-body">
                                                    <div className="post-meta">
                                                        <span className="category">Travel</span>
                                                        <span className="mr-2">March 15, 2018 </span> &bullet;
                                                        <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                                    </div>
                                                    <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                                                </div>

                                        </a>
                                        </ScrollAnimation>
                                    </div>
                                    <div className="col-md-6">
                                        <ScrollAnimation animateIn="fadeIn">

                                        <a href="blog-single.html" className="blog-entry"
                                           data-animate-effect="fadeIn">
                                            <img src="./images/img_10.jpg" alt="Image placeholder"/>
                                                <div className="blog-content-body">
                                                    <div className="post-meta">
                                                        <span className="category">Lifestyle</span>
                                                        <span className="mr-2">March 15, 2018 </span> &bullet;
                                                        <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                                    </div>
                                                    <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                                                </div>
                                        </a>
                                        </ScrollAnimation>
                                    </div>

                                    <div className="col-md-6">
                                        <ScrollAnimation animateIn="fadeIn">

                                        <a href="blog-single.html" className="blog-entry "
                                           data-animate-effect="fadeIn">
                                            <img src="./images/img_11.jpg" alt="Image placeholder"/>
                                                <div className="blog-content-body">
                                                    <div className="post-meta">
                                                        <span className="category">Lifestyle</span>
                                                        <span className="mr-2">March 15, 2018 </span> &bullet;
                                                        <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                                    </div>
                                                    <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                                                </div>
                                        </a>
                                        </ScrollAnimation>
                                    </div>
                                    <div className="col-md-6">
                                        <ScrollAnimation animateIn="fadeIn">

                                        <a href="blog-single.html" className="blog-entry "
                                           data-animate-effect="fadeIn">
                                            <img src="./images/img_12.jpg" alt="Image placeholder"/>
                                                <div className="blog-content-body">
                                                    <div className="post-meta">
                                                        <span className="category">Food</span>
                                                        <span className="mr-2">March 15, 2018 </span> &bullet;
                                                        <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                                    </div>
                                                    <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                                                </div>
                                        </a>
                                        </ScrollAnimation>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <nav aria-label="Page navigation" className="text-center">
                                            <ul className="pagination">
                                                <li className="page-item  active"><a className="page-link"
                                                                                     href="#">Prev</a></li>
                                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item"><a className="page-link" href="#">Next</a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>


                                <div className="row mb-5 mt-5">

                                    <div className="col-md-12">
                                        <h2 className="mb-4">More Blog Posts</h2>
                                    </div>

                                    <div className="col-md-12">

                                        <div className="post-entry-horzontal">
                                            <ScrollAnimation animateIn="fadeIn">

                                            <a href="blog-single.html">

                                                <div className="image"
                                                     style={{backgroundImage: 'url(./images/img_10.jpg)'}}></div>
                                                <span className="text">
                      <div className="post-meta">
                        <span className="category">Travel</span>
                        <span className="mr-2">March 15, 2018 </span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                      </div>
                      <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                    </span>
                                            </a>
                                            </ScrollAnimation>
                                        </div>

                                        <div className="post-entry-horzontal">
                                            <ScrollAnimation animateIn="fadeIn">

                                            <a href="blog-single.html">
                                                <div className="image" data-animate-effect="fadeIn"
                                                     style={{backgroundImage: 'url(./images/img_11.jpg)'}}></div>
                                                <span className="text">
                      <div className="post-meta">
                        <span className="category">Lifestyle</span>
                        <span className="mr-2">March 15, 2018 </span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                      </div>
                      <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                    </span>
                                            </a>
                                            </ScrollAnimation>

                                        </div>

                                        <div className="post-entry-horzontal">
                                            <ScrollAnimation animateIn="fadeIn">

                                            <a href="blog-single.html">
                                                <div className="image " data-animate-effect="fadeIn"
                                                     style={{backgroundImage: 'url(./images/img_12.jpg)'}}></div>
                                                <span className="text">
                      <div className="post-meta">
                        <span className="category">Food</span>
                        <span className="mr-2">March 15, 2018 </span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                      </div>
                      <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                    </span>
                                            </a>
                                            </ScrollAnimation>

                                        </div>

                                    </div>
                                </div>


                            </div>


                            <div className="col-md-12 col-lg-4 sidebar">
                                <div className="sidebar-box search-form-wrap">
                                    <form action="#" className="search-form">
                                        <div className="form-group">
                                            <span className="icon fa fa-search"></span>
                                            <input type="text" className="form-control" id="s"
                                                   placeholder="Type a keyword and hit enter"/>
                                        </div>
                                    </form>
                                </div>
                                <div className="sidebar-box">
                                    <div className="bio text-center">
                                        <img src="./images/person_1.jpg" alt="Image Placeholder" className="img-fluid"/>
                                            <div className="bio-body">
                                                <h2>Meagan Smith</h2>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                    Exercitationem facilis sunt repellendus excepturi beatae porro
                                                    debitis voluptate nulla quo veniam fuga sit molestias minus.</p>
                                                <p><a href="#" className="btn btn-primary btn-sm">Read my bio</a></p>
                                                <p className="social">
                                                    <a href="#" className="p-2"><span className="fa fa-facebook"></span></a>
                                                    <a href="#" className="p-2"><span className="fa fa-twitter"></span></a>
                                                    <a href="#" className="p-2"><span
                                                        className="fa fa-instagram"></span></a>
                                                    <a href="#" className="p-2"><span
                                                        className="fa fa-youtube-play"></span></a>
                                                </p>
                                            </div>
                                    </div>
                                </div>
                                <div className="sidebar-box">
                                    <h3 className="heading">Popular Posts</h3>
                                    <div className="post-entry-sidebar">
                                        <ul>
                                            <li>
                                                <a href="">
                                                    <img src="./images/img_2.jpg" alt="Image placeholder"
                                                         className="mr-4"/>
                                                        <div className="text">
                                                            <h4>There’s a Cool New Way for Men to Wear Socks and
                                                                Sandals</h4>
                                                            <div className="post-meta">
                                                                <span className="mr-2">March 15, 2018 </span> &bullet;
                                                                <span className="ml-2"><span
                                                                    className="fa fa-comments"></span> 3</span>
                                                            </div>
                                                        </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <img src="./images/img_4.jpg" alt="Image placeholder"
                                                         className="mr-4"/>
                                                        <div className="text">
                                                            <h4>There’s a Cool New Way for Men to Wear Socks and
                                                                Sandals</h4>
                                                            <div className="post-meta">
                                                                <span className="mr-2">March 15, 2018 </span> &bullet;
                                                                <span className="ml-2"><span
                                                                    className="fa fa-comments"></span> 3</span>
                                                            </div>
                                                        </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <img src="./images/img_12.jpg" alt="Image placeholder"
                                                         className="mr-4"/>
                                                        <div className="text">
                                                            <h4>There’s a Cool New Way for Men to Wear Socks and
                                                                Sandals</h4>
                                                            <div className="post-meta">
                                                                <span className="mr-2">March 15, 2018 </span> &bullet;
                                                                <span className="ml-2"><span
                                                                    className="fa fa-comments"></span> 3</span>
                                                            </div>
                                                        </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="sidebar-box">
                                    <h3 className="heading">Categories</h3>
                                    <ul className="categories">
                                        <li><a href="#">Courses <span>(12)</span></a></li>
                                        <li><a href="#">News <span>(22)</span></a></li>
                                        <li><a href="#">Design <span>(37)</span></a></li>
                                        <li><a href="#">HTML <span>(42)</span></a></li>
                                        <li><a href="#">Web Development <span>(14)</span></a></li>
                                    </ul>
                                </div>

                                <div className="sidebar-box">
                                    <h3 className="heading">Tags</h3>
                                    <ul className="tags">
                                        <li><a href="#">Travel</a></li>
                                        <li><a href="#">Adventure</a></li>
                                        <li><a href="#">Food</a></li>
                                        <li><a href="#">Lifestyle</a></li>
                                        <li><a href="#">Business</a></li>
                                        <li><a href="#">Freelancing</a></li>
                                        <li><a href="#">Travel</a></li>
                                        <li><a href="#">Adventure</a></li>
                                        <li><a href="#">Food</a></li>
                                        <li><a href="#">Lifestyle</a></li>
                                        <li><a href="#">Business</a></li>
                                        <li><a href="#">Freelancing</a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <Footer/>

                <div id="loader" className="fullscreen">
                    <svg className="circular" width="48px" height="48px">
                        <circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4"
                                stroke="#eeeeee"/>
                        <circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4"
                                strokeMiterlimit="10" stroke="#f4b214"/>
                    </svg>
                </div>

            </div>
        );
    }
}

export default index;
