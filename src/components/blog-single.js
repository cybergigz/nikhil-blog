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
    this.fetchDataAPI2();

    }
    componentDidUpdate=()=>{
              window.scrollTo(0, 0);

    }
    
    fetchDataAPI2=()=>{
         var xId = GetParameterValues('id');
        if (xId==null||xId==0)
        {
            window.location.href="/";
        }
    let mainmenu ={},mainmenustate={};
     fetch(category_details(xId))
            .then(blob => blob.json())
            .then(data => {
         if(data.length==0)
             {
                 window.location.href="/";
             }
      
         mainmenu=data;
           fetch(setting_api)
            .then(blob3 => blob3.json())
            .then(data3 => {
     var article_body="",article_image="",article_category="",article_type="",articla_video="";
                           

                             for(var x=0;x<data3.types.length;x++)
                                 {
     article_body=data3.types[x].fields.body;
    article_image=data3.types[x].fields.image;
     article_type=data3.types[x].node_type;   
 if(data3.types[x].fields.taxonomies.length>0)
 {
     article_category=data3.types[x].fields.taxonomies[0].field;

 }

articla_video=data3.types[x].fields.embedded_video;

    
                                     
        
  
                if(mainmenu.type[0].target_id ===article_type){
                         var typeId="",typename="",bodeImage="",body_post="",video_post;
      var day="",month="",year="",fulldate="";
    var datefull = new Date(mainmenu.changed[0].value.toString());
              
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
        day = datefull.getDate();
            month =monthNames[datefull.getMonth()];
             year = datefull.getFullYear();
            fulldate=month+" "+day+" "+year;
                               
                        if(article_image.length>0){
                            if(mainmenu[article_image] !=undefined){
                 bodeImage=mainmenu[article_image][0].url

                               }   
                        }
                    if(mainmenu[article_category] !=undefined)
                       {

                       typeId=mainmenu[article_category][0].target_id;
                       }
                    if(mainmenu[article_body] !=undefined)
                       {
                       body_post=mainmenu[article_body][0].value;
                       }
                    if(mainmenu[articla_video] !=undefined)
                       {
                           if(mainmenu[articla_video].length>0){
                                  var id = getYouTubeID(mainmenu[articla_video][0].value);

                                         video_post="https://www.youtube.com/embed/"+id+""; 
                              }

                           
                    
                       }
                    
                    
                                  let blog = {
                                nid: mainmenu.nid[0].value,
                                title: mainmenu.title[0].value,
                                image: bodeImage,
                                date:fulldate, 
                                video:video_post,
                                body:body_post,
                                type:""
                                       
       

                            };
                    console.log(blog);
                                    this.setState({blog:blog})
if(typeId !=null)
    {
         fetch(category_type(typeId))
                    .then(blob2 => blob2.json())
                    .then(data2 => {
if(data2.name !=undefined){
       var   nameType=data2.name[0].value;
                       
                                let blog={
                                    nid:data.nid[0].value,
                                    title:data.title[0].value,
                                    image:bodeImage,
                                    date:fulldate,
                                    video:video_post,
                                    body:body_post,
                                    type:nameType


                                };
                                this.setState({blog:blog})
                            
   
   }                

                    })

    }
            
                   }
                                                   
                                 }               
           });
                    

     });
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
                                                (this.state.blog.video !=undefined)?
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
