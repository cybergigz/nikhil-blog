import React, { Component } from 'react';
import {all_js_posts,setting_api} from './../config/config';

import { Link } from "react-router-dom";






class Sidebar extends Component {

   state={
        blogs:[{
            nid:0,
            title:"",
            image:"",
            date:"",

        }]
   
        
     
    };

    componentWillMount=()=> {

         fetch(setting_api)
            .then(blob2 => blob2.json())
            .then(data2 => {
            var reactjs_blog=data2.types[0].fields,reactjs_video=data2.types[1].fields;
                          console.log(reactjs_blog);
             
               fetch(all_js_posts)
            .then(blob => blob.json())
            .then(data => {
          
                let mainmenu =[]
                for (var i=0;i<data.results.length;i++)
                {
                    if(i==3){
                        break;
                    }
                    if (data.results[i][reactjs_video.image] !=null)
                    {

                            let blogs = {
                                nid: data.results[i].nid[0].value,

                                title: data.results[i].title[0].value,
                                image: data.results[i][reactjs_video.image][0].url,
                                date: data.results[i].created[0].value

                            };
                            mainmenu.push(blogs);

                    }
                    else
                    {
                            let blogs = {
                                nid: data.results[i].nid[0].value,
                                title: data.results[i].title[0].value,
                                image: data.results[i][reactjs_blog.image][0].url,
                                date: data.results[i].created[0].value

                            };
                            mainmenu.push(blogs);

                    }




                }
                this.setState({blogs:mainmenu})

            })
         });
      
    }
    
    render() {
      

        return (

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
                        {this.state.blogs.map((item,index) => (
               <li key={index}>
                                                <Link to={"Blog-Single?id="+item.nid}>
                                                    <img src={item.image} style={{height: "61px"}} alt="Image placeholder"
                                                         className="mr-4"/>
                                                        <div className="text">
                                                            <h4>{item.title}</h4>
                                                            <div className="post-meta">
                                                                <span className="mr-2">{item.date} </span> 
                                                                <span className="ml-2"><span
                                                                    className="fa fa-comments"></span> 3</span>
                                                            </div>
                                                        </div>
                                                </Link>
                                            </li>
))}
                                         
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

             

        );
    }
   
}


export default Sidebar;
