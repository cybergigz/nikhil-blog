import React, { Component } from 'react';
import Footer from "./footer.js";
import Header from "./header.js";
import Sidebar from "./sidebar.js";

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
    ,
          blogsPager:[{
            nid:0,
            title:"",
            image:"",
            date:"",

        }],
        
        NumberOfPage:0,
        pageSelected:0
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

this.pageChange({index:0});
            })
    }
    
    pageChange=(index)=>{
      // alert(index.index);
    this.setState({pageSelected:index.index});
        var pagerList=document.getElementsByClassName("pagerclass");
  for(var i=0;i<pagerList.length;i++)
        {
               pagerList[i].classList.remove("active");

        }
    
    var pagerListSelected=document.getElementsByClassName("pagerclass"+(index.index+1));
   pagerListSelected[0].classList.add("active");
    let arrayOfPosts=[];
        var item=index.index,itemCompare=0;
        if(item!=0)
            {
                itemCompare=index.index+2;
            }
    
    for(var i=itemCompare;i<=itemCompare+2;i++)
        {
            if(i==this.state.blogs.length)
               {
break;
               }
                                       arrayOfPosts.push(this.state.blogs[i]);

        
    }
    this.setState({blogsPager:arrayOfPosts})
}
nextClick=()=>{
           const numOfPage=Math.ceil(this.state.blogs.length/3);
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

    render() {
           const numOfPage=Math.ceil(this.state.blogs.length/3);
       const ArrayOfPage=[];
       for(var x=1;x<=numOfPage;x++)
           {
               ArrayOfPage.push(x);
               
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
                                        {this.state.blogsPager.map((item,index) => (
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
export default category;
