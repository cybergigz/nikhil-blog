import React, { Component } from 'react';

import OwlCarousel, { Options } from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "animate.css/animate.min.css";




class carousel extends Component {




    
componentDidMount=()=>{
    var dotsList=document.getElementsByClassName("owl-dot");
    for (var i=0;i<dotsList.length;i++)
    {
      dotsList[i].innerHTML="";
    }
}




    render() {
        console.log(this.state.blogs);

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
            </div>
);
    }
}

export default carousel;
