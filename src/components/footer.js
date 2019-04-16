import React, { Component } from 'react';
import {all_css_posts,setting_api} from './../config/config';
import { Link } from "react-router-dom";

class Footer extends Component {
     state={
        blogs:[{
            nid:0,
            title:"",
            image:"",
            date:"",

        }]
   
        
     
    };

    componentWillMount=()=> {
       
        
         let mainmenu =[],mainmenustate=[];
     fetch(all_css_posts)
            .then(blob => blob.json())
            .then(data => {
       
         mainmenu=data.results;
           fetch(setting_api)
            .then(blob3 => blob3.json())
            .then(data3 => {
     var article_body="",article_image="",article_category="",article_type="";
                           

                             for(var x=0;x<data3.types.length;x++)
                                 {
     article_body=data3.types[x].fields.body;
    article_image=data3.types[x].fields.image;
     article_type=data3.types[x].node_type;   
                                     if(data3.types[x].fields.taxonomies.length>0)
                                         {
                                                 article_category=data3.types[x].fields.taxonomies[0].field;

                                         }
        for(var i=0;i<mainmenu.length;i++)
            {
  
            //image, typeId
                if(mainmenu[i].type[0].target_id ===article_type){
                         var typeId="",typename="",image="";
      var day="",month="",year="",fulldate="";
    var datefull = new Date(mainmenu[i].created[0].value.toString());
        day = datefull.getDate();
            month = datefull.getMonth();
             year = datefull.getFullYear();
            fulldate=day+"/"+month+"/"+year;
                       var bodeImage="";          
                        if(article_image.length>0){
                            if(mainmenu[i][article_image] !=undefined){
                 bodeImage=mainmenu[i][article_image][0].url

                               }   
                        }
                    if(mainmenu[i][article_category] !=undefined)
                       {
                       typeId=mainmenu[i][article_category][0].target_id;
                       }
                    
                    
                                  let blogs = {
                                nid: mainmenu[i].nid[0].value,
                                title: mainmenu[i].title[0].value,
                                image: bodeImage,
                                date:fulldate
                            };
                    console.log(typeId);
                          mainmenustate.push(blogs);
                       if(mainmenustate.length===3)
                                         {
                                             break;
                                         }

                          

                            
                    
                    
                   }
                
                
                
                
        }
                                     if(mainmenustate.length===3)
                                         {
                                             break;
                                         }
                                 }
                                     
                     this.setState({blogs:mainmenustate});                
                                     
                                     
                                     
        

               
           });
                    

     });

        
    }
    
    render() {
        return (
            <div>
                <footer className="site-footer">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-md-4">
                                <h3>Paragraph</h3>
                                <p>
                                    <img src="images/img_1.jpg" alt="Image placeholder" className="img-fluid"/>
                                </p>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, accusantium optio
                                    unde perferendis eum illum voluptatibus dolore tempora, consequatur minus asperiores
                                    temporibus reprehenderit.</p>
                            </div>
                            <div className="col-md-6 ml-auto">
                                <div className="row">
                                    <div className="col-md-7">
                                        <h3>Latest Post</h3>
                                        <div className="post-entry-sidebar">
                                            <ul>
            {this.state.blogs.map((item,index) => (
                                                <li key={index}>
                                                    <Link to={"Blog-Single?id="+item.nid}>
             { (item.image!=null)?
        <img src={item.image} style={{height: "61px"}}  alt="Image placeholder"className="mr-4"/>
    :<span></span>
}
                                                            <div className="text">
                                                                <h4>{item.title}</h4>
                                                                <div className="post-meta">
                                                                    <span
                                                                        className="mr-2">{item.date} </span>
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
                                    <div className="col-md-1"></div>

                                    <div className="col-md-4">

                                        <div className="mb-5">
                                            <h3>Quick Links</h3>
                                            <ul className="list-unstyled">
                                                <li><a href="#">About Us</a></li>
                                                <li><a href="#">Travel</a></li>
                                                <li><a href="#">Adventure</a></li>
                                                <li><a href="#">Courses</a></li>
                                                <li><a href="#">Categories</a></li>
                                            </ul>
                                        </div>

                                        <div className="mb-5">
                                            <h3>Social</h3>
                                            <ul className="list-unstyled footer-social">
                                                <li><a href="#"><span className="fa fa-twitter"></span> Twitter</a></li>
                                                <li><a href="#"><span className="fa fa-facebook"></span> Facebook</a>
                                                </li>
                                                <li><a href="#"><span className="fa fa-instagram"></span> Instagram</a>
                                                </li>
                                                <li><a href="#"><span className="fa fa-vimeo"></span> Vimeo</a></li>
                                                <li><a href="#"><span className="fa fa-youtube-play"></span> Youtube</a>
                                                </li>
                                                <li><a href="#"><span className="fa fa-snapchat"></span> Snapshot</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                Copyright &copy;
                         2019
                                All rights reserved | This template is made with <i className="fa fa-heart-o"
                                                                                    aria-hidden="true"></i> by <a
                                href="https://colorlib.com" >Colorlib</a>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        );
    }
}
export default Footer;
