import React, { Component } from 'react';
import Footer from "./footer.js";
import Header from "./header.js";
import Sidebar from "./sidebar.js";
import {Animated} from "react-animated-css";
import {category_details} from "../config/config";
import {category_type,setting_api} from "../config/config";
var getYouTubeID = require('get-youtube-id');




class blogsingle extends Component {
    state={
        name:""
        ,blog:{
            nid:0,
            title:"",
            image:"",
            date:"",
            video:"",
            body:"",
            type:""

        }
    };
    componentWillMount=()=> {
        var xId = GetParameterValues('id');
        if (xId==null)
        {
            window.location.href="/";
        }
        
          fetch(setting_api)
            .then(blob3 => blob3.json())
            .then(data3 => {
            var reactjs_blog=[],reactjs_video=[],reactjs_article=[];
              for(var i=0;i<data3.types.length;i++)
                  {
                      if(data3.types[i].node_type=="reactjs_blog")
                          {
                             reactjs_blog= data3.types[i].fields;
                          }
                      else if(data3.types[i].node_type=="reactjs_videos")
                              {
                                                           reactjs_video= data3.types[i].fields;

                              }
                      else if(data3.types[i].node_type=="article")
                              {
                                                           reactjs_article= data3.types[i].fields;

                              }
                      
                  }
              var article_body=reactjs_article.body,article_image=reactjs_article.image;
              
        fetch(category_details(xId))
            .then(blob => blob.json())
            .then(data => {
                var nameType="",image="",body="",typeId="",video="";
            
         var video_field=   reactjs_video.taxonomies[0].field,blog_body_category=reactjs_blog.taxonomies[0].field,blog_body=reactjs_blog.body,blog_image=reactjs_blog.image;
                     var embded_video=reactjs_video.embedded_video,embded_video_image=reactjs_video.image;
var day="",month="",year="",fulldate="";
            var datefull = new Date(data.created[0].value.toString());
           day = datefull.getDate();
            month = datefull.getMonth();
             year = datefull.getFullYear();
            fulldate=day+"/"+month+"/"+year
            
           
            if(data[video_field] !=null)
               {
                   if(data[video_field] !=undefined)
                       {
                                            typeId= data[video_field][0].target_id;
 
                       }
                   if(data[embded_video] !=null )
                      {
                          if(data[embded_video].length>0)
                              {
                                    var id = getYouTubeID(data[embded_video][0].value);

                                         video="https://www.youtube.com/embed/"+id+"";  
                              }
                      

                      }
                    var bodyblog="";          
                        if(blog_body !=null){
                            if(data[blog_body]!=undefined){
                               bodyblog=data[blog_body][0].value;
                               }
                            
                            
                        }
                   
                   body=bodyblog;
                    var bodeImage="";          
                        if(embded_video_image !=null){
                            if(data[embded_video_image] !=undefined){
                                                           bodeImage=data[embded_video_image][0].url;

                               }
                            else if(data[blog_image] !=undefined){
                                 bodeImage=data[blog_image][0].url;
                                
                            }
                            else
                                {
                                        if(data[article_image] !=undefined)
                                       {
                                 bodeImage=data[article_image][0].url;
                                
                            }
                                }
                            
                        }
                 
                  image=bodeImage;
               
               }
               else
               {
                  
                         var bodeImage="";    
                        if(reactjs_blog.image.length>0){
                            if(data[reactjs_blog.image] !=undefined){
                                                           bodeImage=data[reactjs_blog.image][0].url

                               }
                            else{
                                if(data.field_image !=undefined){
                                                                    bodeImage=data.field_image[0].url

                                   }
                                
                            }
                            
                        }
                   if(data[blog_body_category] !=undefined){
                                       typeId= data[blog_body_category][0].target_id;

                   }
if(data[blog_body_category] !=undefined)
{
                                         body=data[blog_body][0].value;
}
else {
body=data[article_body][0].value;

}
                      
                   image=bodeImage;
               }
            
            
     let blog={
                                    nid:data.nid[0].value,
                                    title:data.title[0].value,
                                    image:image,
                                    date:fulldate,
                                    video:video,
                                    body:body,
                                    type:nameType


                                };
                                this.setState({blog:blog})
if(typeId !=null)
    {
         fetch(category_type(typeId))
                    .then(blob2 => blob2.json())
                    .then(data2 => {
if(data2.name !=undefined){
          nameType=data2.name[0].value;
                       
                                let blog={
                                    nid:data.nid[0].value,
                                    title:data.title[0].value,
                                    image:image,
                                    date:fulldate,
                                    video:video,
                                    body:body,
                                    type:nameType


                                };
                                this.setState({blog:blog})
                            
   
   }
                  
                     


                        
                   

                    })

    }
               



            })
          });

    }
    componentDidUpdate=()=>{
              window.scrollTo(0, 0);

    }

    render() {
        return (
            <div>
                <Header/>
                <section className="site-section py-lg">
                    <div className="container">

                        <div className="row blog-entries">
                            <div className="col-md-12 col-lg-8 main-content">
                                <h1 className="mb-4">{this.state.blog.title}</h1>
                                <div className="post-meta">
                                    <span className="category">{this.state.blog.type}</span>
                                    <span className="mr-2">{this.state.blog.date} </span>
                                    <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                                </div>
                                <div className="post-content-body">

                                    <div className="row mb-5">
                                        <div className="col-md-12 mb-4">
                                            {
                                                (this.state.blog.video.length > 0)?
                                                <iframe width="800" height="480" frameBorder="0"
                                                allowFullScreen="allowfullscreen"
                                                src={this.state.blog.video}></iframe>
                                                    :
        (this.state.blog.body.length > 0)?
                                                    <div className="post-content-body">
              <p>
                                                        {this.state.blog.body}</p>
            
    
            </div>
        :
        <p></p>
                                            }

{ (this.state.blog.image.length>0)?
                                            <img src={this.state.blog.image} alt="Image placeholder"  className="img-fluid"/>
      :<span></span>
}                                   
    </div>

                                    </div>

                                </div>


                                <div className="pt-5">
                                    <p>Categories: <a href="#">{this.state.blog.type}</a></p>
                                </div>


                                <div className="pt-5">
                                    <h3 className="mb-5">6 Comments</h3>
                                    <ul className="comment-list">
                                        <li className="comment">
                                            <div className="vcard">
                                                <img src="images/person_1.jpg" alt="Image placeholder"/>
                                            </div>
                                            <div className="comment-body">
                                                <h3>Jean Doe</h3>
                                                <div className="meta">January 9, 2018 at 2:21pm</div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
                                                    quidem laborum necessitatibus, ipsam impedit vitae autem, eum
                                                    officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum
                                                    impedit necessitatibus, nihil?</p>
                                                <p><a href="#" className="reply">Reply</a></p>
                                            </div>
                                        </li>

                                        <li className="comment">
                                            <div className="vcard">
                                                <img src="images/person_1.jpg" alt="Image placeholder"/>
                                            </div>
                                            <div className="comment-body">
                                                <h3>Jean Doe</h3>
                                                <div className="meta">January 9, 2018 at 2:21pm</div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
                                                    quidem laborum necessitatibus, ipsam impedit vitae autem, eum
                                                    officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum
                                                    impedit necessitatibus, nihil?</p>
                                                <p><a href="#" className="reply">Reply</a></p>
                                            </div>

                                            <ul className="children">
                                                <li className="comment">
                                                    <div className="vcard">
                                                        <img src="images/person_1.jpg" alt="Image placeholder"/>
                                                    </div>
                                                    <div className="comment-body">
                                                        <h3>Jean Doe</h3>
                                                        <div className="meta">January 9, 2018 at 2:21pm</div>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                            Pariatur quidem laborum necessitatibus, ipsam impedit vitae
                                                            autem, eum officia, fugiat saepe enim sapiente iste iure!
                                                            Quam voluptas earum impedit necessitatibus, nihil?</p>
                                                        <p><a href="#" className="reply">Reply</a></p>
                                                    </div>


                                                    <ul className="children">
                                                        <li className="comment">
                                                            <div className="vcard">
                                                                <img src="images/person_1.jpg" alt="Image placeholder"/>
                                                            </div>
                                                            <div className="comment-body">
                                                                <h3>Jean Doe</h3>
                                                                <div className="meta">January 9, 2018 at 2:21pm</div>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing
                                                                    elit. Pariatur quidem laborum necessitatibus, ipsam
                                                                    impedit vitae autem, eum officia, fugiat saepe enim
                                                                    sapiente iste iure! Quam voluptas earum impedit
                                                                    necessitatibus, nihil?</p>
                                                                <p><a href="#" className="reply">Reply</a></p>
                                                            </div>

                                                            <ul className="children">
                                                                <li className="comment">
                                                                    <div className="vcard">
                                                                        <img src="images/person_1.jpg"
                                                                             alt="Image placeholder"/>
                                                                    </div>
                                                                    <div className="comment-body">
                                                                        <h3>Jean Doe</h3>
                                                                        <div className="meta">January 9, 2018 at
                                                                            2:21pm
                                                                        </div>
                                                                        <p>Lorem ipsum dolor sit amet, consectetur
                                                                            adipisicing elit. Pariatur quidem laborum
                                                                            necessitatibus, ipsam impedit vitae autem,
                                                                            eum officia, fugiat saepe enim sapiente iste
                                                                            iure! Quam voluptas earum impedit
                                                                            necessitatibus, nihil?</p>
                                                                        <p><a href="#" className="reply">Reply</a></p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>

                                        <li className="comment">
                                            <div className="vcard">
                                                <img src="images/person_1.jpg" alt="Image placeholder"/>
                                            </div>
                                            <div className="comment-body">
                                                <h3>Jean Doe</h3>
                                                <div className="meta">January 9, 2018 at 2:21pm</div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
                                                    quidem laborum necessitatibus, ipsam impedit vitae autem, eum
                                                    officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum
                                                    impedit necessitatibus, nihil?</p>
                                                <p><a href="#" className="reply">Reply</a></p>
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="comment-form-wrap pt-5">
                                        <h3 className="mb-5">Leave a comment</h3>
                                        <form action="#" className="p-5 bg-light">
                                            <div className="form-group">
                                                <label htmlFor="name">Name *</label>
                                                <input type="text" className="form-control" id="name"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email *</label>
                                                <input type="email" className="form-control" id="email"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="website">Website</label>
                                                <input type="url" className="form-control" id="website"/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="message">Message</label>
                                                <textarea name="" id="message" cols="30" rows="10"
                                                          className="form-control"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <input type="submit" value="Post Comment" className="btn btn-primary"/>
                                            </div>

                                        </form>
                                    </div>
                                </div>

                            </div>

<Sidebar/>
                           
                        </div>
                    </div>
                </section>

                <section className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="mb-3 ">Related Post</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <a href="#" className="a-block d-flex align-items-center height-md"
                                   style={{backgroundImage: 'url(images/img_2.jpg)'}}>
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
                                <a href="#" className="a-block d-flex align-items-center height-md"
                                   style={{backgroundImage: 'url(images/img_3.jpg)'}}>
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
                                <a href="#" className="a-block d-flex align-items-center height-md"
                                   style={{backgroundImage: 'url(images/img_4.jpg)'}}>
                                    <div className="text">
                                        <div className="post-meta">
                                            <span className="category">{this.state.blog.type}</span>
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
export default blogsingle;
