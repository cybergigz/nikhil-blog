import React, { Component } from 'react';
import Footer from "./footer.js";
import Header from "./header.js";
import Sidebar from "./sidebar.js";

import { Link } from "react-router-dom";

import {Animated} from "react-animated-css";
import {list_of_category_type,setting_api} from './../config/config';
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
    ,
          blogsPager:[{
            nid:0,
            title:"",
            image:"",
            date:"",

        }],
        
        NumberOfPage:0,
        pageSelected:0,
        itemPerPage:0,
        pager:{"count":"","pages":0,"items_per_page":0,"current_page":0}
    };




    componentWillMount=()=> {
       this.pageChange({index:0});

        
    }
    componentDidUpdate=()=>{

    var index=this.state.pageSelected;
      var pagerListSelected=document.getElementsByClassName("pagerclass"+(index+1));
    if(pagerListSelected[0] !=undefined){
           pagerListSelected[0].classList.add("active");

       }
                      window.scrollTo(0, 0);

}
    pageChange=(index)=>{
   let itemPerPage=this.state.itemPerPage;
  this.setState({pageSelected:index.index});
        var pagerList=document.getElementsByClassName("pagerclass");
  for(var i=0;i<pagerList.length;i++)
        {
               pagerList[i].classList.remove("active");

        }
        
           this.fetchDataAPI(index.index);

    
 
}
nextClick=()=>{
         const itemPerPage=this.state.itemPerPage;

            const numOfPage=this.state.pager.pages;
    var pageSelected=this.state.pageSelected;
    if(pageSelected+1<numOfPage)
       {

       this.pageChange({index:pageSelected+1});
       }
    
    
}
prevClick=()=>{
    var pageSelected=this.state.pageSelected;
    if(pageSelected>0)
       {


       this.pageChange({index:pageSelected-1});
       }
}
fetchDataAPI=(page_num)=>{
     var xId = GetParameterValues('id');
        var xname =replce_name(GetParameterValues('name'));
this.xxname=xname;
        if (xId==null)
        {
            window.location.href="/";
        }
        this.setState({name:xname})
 fetch(setting_api)
            .then(blob3 => blob3.json())
            .then(data3 => {
               var reactjs_blog=[],reactjs_video=[];
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
                      
                  }
     
     var video_field=   reactjs_video.taxonomies[0].field,blog_body_category=reactjs_blog.taxonomies[0].field,blog_body=reactjs_blog.body,blog_image=reactjs_blog.image;
                     var embded_video=reactjs_video.embedded_video,embded_video_image=reactjs_video.image;
     
     fetch(list_of_category_type(xId,page_num))
            .then(blob => blob.json())
            .then(data => {
                if ( data.results.length==0)
                {
                    window.location.href="/";

                }
                let mainmenu =[]
         this.setState({itemPerPage:data.pager.items_per_page})
         this.setState({pager:data.pager})

                for (var i=0;i<data.results.length;i++)
                {
                    var day="",month="",year="",fulldate="";
            var datefull = new Date(data.results[i].created[0].value.toString());
           day = datefull.getDate();
            month = datefull.getMonth();
             year = datefull.getFullYear();
            fulldate=day+"/"+month+"/"+year
            
                    if (data.results[i][embded_video_image] !=null)
                    {

                            let blogs = {
                                nid: data.results[i].nid[0].value,

                                title: data.results[i].title[0].value,
                                image: data.results[i][embded_video_image][0].url,
                                date: fulldate

                            };
                            mainmenu.push(blogs);

                    }
                    else
                    {
                         var bodeImage="";          
                        if(reactjs_blog.image.length>0){
                            bodeImage=data.results[i][reactjs_blog.image][0].url
                            
                        }
                            let blogs = {
                                nid: data.results[i].nid[0].value,
                                title: data.results[i].title[0].value,
                               image: bodeImage,
                                date: fulldate

                            };
                            mainmenu.push(blogs);

                    }




                }
                this.setState({blogs:mainmenu})

            })
 });
    
}
    render() {
    
     const itemPerPage=this.state.itemPerPage;
               const ArrayOfPage=[];

        if(itemPerPage>0){
                 const numOfPage=this.state.pager.pages;
       for(var x=1;x<=numOfPage;x++)
           {
               ArrayOfPage.push(x);
               
           }
           
           }
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
            { (item.image!=null)?
                                                    <div className="image"
                                                         style={{
                                                             backgroundImage:'url('+ item.image+')'}}></div>
  :<span></span>
}                                                  
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
                                 <li className="page-item "><a className="page-link" onClick={()=>this.prevClick()}>Prev</a></li>
                                          {ArrayOfPage.map((item, index) => (
                 <li key={index} className={"page-item pagerclass pagerclass"+item}><a className="page-link" onClick={()=>this.pageChange({index})}>{item}</a></li>
                                     

))}
                 
                 <li className="page-item"><a className="page-link" onClick={()=>this.nextClick()}>Next</a>
                                                </li>
                                                                                         </ul>
                                                                                         </nav>
                                                                                         </div>
                                                                                         </div>



                                                                                         </div>


                                                                                         <Sidebar/>

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
function replce_name(str){
    return  str.replace(/%20/g, " ");
}
export default category;
