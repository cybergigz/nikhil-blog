import React, { Component } from 'react';
import Footer from "./footer.js";
import Header from "./header.js";
import { Link } from "react-router-dom";

import {Animated} from "react-animated-css";
import {list_of_category_type} from './../config/config';
import ScrollAnimation from 'react-animate-on-scroll';

import "animate.css/animate.min.css";


class category extends Component {
    constructor(props)
    {
        super(props);
let xxname="";

    }
    state={
        name:""
        ,blogs:[{
            nid:0,
            title:"",
            image:"",
            date:"",

        }]
    };




    componentWillMount=()=> {
        var xId = GetParameterValues('id');
        var xname = GetParameterValues('name');
this.xxname=xname;
        if (xId==null)
        {
            window.location.href="/";
        }
        this.setState({name:xname})

        fetch(list_of_category_type(xId))
            .then(blob => blob.json())
            .then(data => {
                console.log(data)
                if ( data.results.length==0)
                {
                    window.location.href="/";

                }
                let mainmenu =[]
                for (var i=0;i<data.results.length;i++)
                {
                    console.log(data.results[i].created[0].value)
                    if (data.results[i].field_video_image !=null)
                    {

                            let blogs = {
                                nid: data.results[i].nid[0].value,

                                title: data.results[i].title[0].value,
                                image: data.results[i].field_video_image[0].url,
                                date: data.results[i].created[0].value

                            };
                            mainmenu.push(blogs);

                    }
                    else
                    {
                            let blogs = {
                                nid: data.results[i].nid[0].value,
                                title: data.results[i].title[0].value,
                                image: data.results[i].field_rjs_image[0].url,
                                date: data.results[i].created[0].value

                            };
                            mainmenu.push(blogs);

                    }




                }
                this.setState({blogs:mainmenu})
                console.log(mainmenu);


            })
    }

    render() {
        return (
            <div>
                <Header/>
                <section className="site-section">
                    <div className="container">
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <h2 className="mb-4">Category: {this.state.name}</h2>
                            </div>
                        </div>
                        <div className="row blog-entries">
                            <div className="col-md-12 col-lg-8 main-content">
                                <div className="row mb-5 mt-5">

                                    <div className="col-md-12">
                                        {this.state.blogs.map((item,index) => (
                                                    <ScrollAnimation key={index} animateIn="fadeIn">

                                            <div  className="post-entry-horzontal">
                                                <Link to={"Blog-Single?id="+item.nid} style={{width: '100%'}}>
                                                    <div className="image"
                                                         style={{
                                                             backgroundImage:'url('+ item.image+')'}}></div>
                                                    <span className = "text" >
                                                         <div className = "post-meta" >
                                                         <span className = "category" > {this.state.name} </span>
                                                         <span className="mr-2">{item.date} </span> 
                                                             <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
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
                                                                                         <li className="page-item  active"><a className="page-link" href="#">Prev</a></li>
                                                                                         <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                                                         <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                                                         <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                                                         <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                                                                         </ul>
                                                                                         </nav>
                                                                                         </div>
                                                                                         </div>



                                                                                         </div>


                                                                                         <div className="col-md-12 col-lg-4 sidebar">
                                                                                         <div className="sidebar-box search-form-wrap">ٍ                                                                                <form action="#" className="search-form">
                                                                                         <div className="form-group">
                                                                                         <span className="icon fa fa-search"></span>
                                                                                         <input type="text" className="form-control" id="s" placeholder="Type a keyword and hit enter"/>
                                                                                         </div>
                                                                                         </form>
                                                                                         </div>
                                                                                         <div className="sidebar-box">
                                                                                         <div className="bio text-center">
                                                                                         <img src="images/person_1.jpg" alt="Image Placeholder" className="img-fluid"/>
                                                                                         <div className="bio-body">
                                                                                         <h2>Meagan Smith</h2>
                                                                                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem facilis sunt repellendus excepturi beatae porro debitis voluptate nulla quo veniam fuga sit molestias minus.</p>
                                                                                         <p><a href="#" className="btn btn-primary btn-sm">Read my bio</a></p>
                                                                                         <p className="social">
                                                                                         <a href="#" className="p-2"><span className="fa fa-facebook"></span></a>
                                                                                         <a href="#" className="p-2"><span className="fa fa-twitter"></span></a>
                                                                                         <a href="#" className="p-2"><span className="fa fa-instagram"></span></a>
                                                                                         <a href="#" className="p-2"><span className="fa fa-youtube-play"></span></a>
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
                                                                                         <img src="images/img_2.jpg" alt="Image placeholder" className="mr-4"/>
                                                                                         <div className="text">
                                                                                         <h4>There’s a Cool New Way for Men to Wear Socks and Sandals</h4>
                                                                                         <div className="post-meta">
                                                                                         <span className="mr-2">March 15, 2018 </span> &bullet;
                                                                                         <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                                                                         </div>
                                                                                         </div>
                                                                                         </a>
                                                                                         </li>
                                                                                         <li>
                                                                                         <a href="">
                                                                                         <img src="images/img_4.jpg" alt="Image placeholder" className="mr-4"/>
                                                                                         <div className="text">
                                                                                         <h4>There’s a Cool New Way for Men to Wear Socks and Sandals</h4>
                                                                                         <div className="post-meta">
                                                                                         <span className="mr-2">March 15, 2018 </span> &bullet;
                                                                                         <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                                                                         </div>
                                                                                         </div>
                                                                                         </a>
                                                                                         </li>
                                                                                         <li>
                                                                                         <a href="">
                                                                                         <img src="images/img_12.jpg" alt="Image placeholder" className="mr-4"/>
                                                                                         <div className="text">
                                                                                         <h4>There’s a Cool New Way for Men to Wear Socks and Sandals</h4>
                                                                                         <div className="post-meta">
                                                                                         <span className="mr-2">March 15, 2018 </span> &bullet;
                                                                                         <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
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
function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}
export default category;
