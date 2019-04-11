import React, { Component } from 'react';
import Footer from "./footer.js";
import Header from "./header.js";
import {Animated} from "react-animated-css";


class about extends Component {
    render() {
        return (
            <div>
                <Header/>
                <section className="site-section">
                    <div className="container">

                        <div className="row blog-entries">
                            <div className="col-md-12 col-lg-8 main-content">

                                <div className="row">
                                    <div className="col-md-12">
                                        <h2 className="mb-4">Hi There! I'm Meagan Smith</h2>
                                        <p className="mb-5"><img src="images/img_6.jpg" alt="Image placeholder"
                                                                 className="img-fluid"/></p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum minima
                                            eveniet recusandae suscipit eum laboriosam fugit amet deleniti iste et. Ad
                                            dolores, necessitatibus non saepe tenetur impedit commodi quibusdam natus
                                            repellat, exercitationem accusantium perferendis officiis. Laboriosam
                                            impedit quia minus pariatur!</p>
                                        <p>Dignissimos iste consectetur, nemo magnam nulla suscipit eius quibusdam, quo
                                            aperiam quia quae est explicabo nostrum ab aliquid vitae obcaecati tenetur
                                            beatae animi fugiat officia id ipsam sint? Obcaecati ea nisi fugit assumenda
                                            error totam molestiae saepe fugiat officiis quam?</p>
                                        <p>Culpa porro quod doloribus dolore sint. Distinctio facilis ullam voluptas
                                            nemo voluptatum saepe repudiandae adipisci officiis, explicabo eaque itaque
                                            sed necessitatibus, fuga, ea eius et aliquam dignissimos repellendus impedit
                                            pariatur voluptates. Dicta perferendis assumenda, nihil placeat, illum
                                            quibusdam. Vel, incidunt?</p>
                                        <p>Dolorum blanditiis illum quo quaerat, possimus praesentium perferendis! Quod
                                            autem optio nobis, placeat officiis dolorem praesentium odit. Vel, cum, a.
                                            Adipisci eligendi eaque laudantium dicta tenetur quod, pariatur sunt sed
                                            natus officia fuga accusamus reprehenderit ratione, provident possimus ut
                                            voluptatum.</p>
                                    </div>
                                </div>

                                <div className="row mb-5 mt-5">
                                    <div className="col-md-12 mb-5">
                                        <h2>My Latest Posts</h2>
                                    </div>
                                    <div className="col-md-12">

                                        <div className="post-entry-horzontal">
                                            <a href="blog-single.html">
                                                <div className="image"
                                                     style={{backgroundImage: 'url(images/img_10.jpg)'}}></div>
                                                <span className="text">
                      <div className="post-meta">
                        <span className="category">Travel</span>
                        <span className="mr-2">March 15, 2018 </span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                      </div>
                      <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                    </span>
                                            </a>
                                        </div>

                                        <div className="post-entry-horzontal">
                                            <a href="blog-single.html">
                                                <div className="image"
                                                     style={{backgroundImage: 'url(images/img_11.jpg)'}}></div>
                                                <span className="text">
                      <div className="post-meta">
                        <span className="category">Lifestyle</span>
                        <span className="mr-2">March 15, 2018 </span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                      </div>
                      <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                    </span>
                                            </a>
                                        </div>

                                        <div className="post-entry-horzontal">
                                            <a href="blog-single.html">
                                                <div className="image"
                                                     style={{backgroundImage: 'url(images/img_12.jpg)'}}></div>
                                                <span className="text">
                      <div className="post-meta">
                        <span className="category">Food</span>
                        <span className="mr-2">March 15, 2018 </span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                      </div>
                      <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                    </span>
                                            </a>
                                        </div>

                                        <div className="post-entry-horzontal">
                                            <a href="blog-single.html">
                                                <div className="image"
                                                     style={{backgroundImage: 'url(images/img_9.jpg)'}}></div>
                                                <span className="text">
                      <div className="post-meta">
                        <span className="category">Travel</span>
                        <span className="mr-2">March 15, 2018 </span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                      </div>
                      <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                    </span>
                                            </a>
                                        </div>

                                        <div className="post-entry-horzontal">
                                            <a href="blog-single.html">
                                                <div className="image"
                                                     style={{backgroundImage: 'url(images/img_8.jpg)'}}></div>
                                                <span className="text">
                      <div className="post-meta">
                        <span className="category">Lifestyle</span>
                        <span className="mr-2">March 15, 2018 </span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                      </div>
                      <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                    </span>
                                            </a>
                                        </div>

                                        <div className="post-entry-horzontal">
                                            <a href="blog-single.html">
                                                <div className="image"
                                                     style={{backgroundImage: 'url(images/img_7.jpg)'}}></div>
                                                <span className="text">
                      <div className="post-meta">
                        <span className="category">Food</span>
                        <span className="mr-2">March 15, 2018 </span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                      </div>
                      <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                    </span>
                                            </a>
                                        </div>

                                        <div className="post-entry-horzontal">
                                            <a href="blog-single.html">
                                                <div className="image"
                                                     style={{backgroundImage: 'url(images/img_6.jpg)'}}></div>
                                                <span className="text">
                      <div className="post-meta">
                        <span className="category">Travel</span>
                        <span className="mr-2">March 15, 2018 </span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                      </div>
                      <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                    </span>
                                            </a>
                                        </div>

                                        <div className="post-entry-horzontal">
                                            <a href="blog-single.html">
                                                <div className="image"
                                                     style={{backgroundImage: 'url(images/img_5.jpg)'}}></div>
                                                <span className="text">
                      <div className="post-meta">
                        <span className="category">Lifestyle</span>
                        <span className="mr-2">March 15, 2018 </span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                      </div>
                      <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                    </span>
                                            </a>
                                        </div>

                                        <div className="post-entry-horzontal">
                                            <a href="blog-single.html">
                                                <div className="image"
                                                     style={{backgroundImage: 'url(images/img_4.jpg)'}}></div>
                                                <span className="text">
                      <div className="post-meta">
                        <span className="category">Food</span>
                        <span className="mr-2">March 15, 2018 </span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                      </div>
                      <h2>There’s a Cool New Way for Men to Wear Socks and Sandals</h2>
                    </span>
                                            </a>
                                        </div>

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
                                        <img src="images/person_1.jpg" alt="Image Placeholder" className="img-fluid"/>
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
                                                    <img src="images/img_2.jpg" alt="Image placeholder"
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
                                                    <img src="images/img_4.jpg" alt="Image placeholder"
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
                                                    <img src="images/img_12.jpg" alt="Image placeholder"
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
            </div>
        );
    }
}
export default about;
