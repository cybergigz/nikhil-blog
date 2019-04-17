import React, { Component } from 'react';
import Footer from "./footer.js";
import Header from "./header.js";
import Sidebar from "./sidebar.js";

import { Link } from "react-router-dom";

import {Animated} from "react-animated-css";
import {list_of_category_type,setting_api} from './../config/config';
import ScrollAnimation from 'react-animate-on-scroll';

import "animate.css/animate.min.css";

import { processContentListApi } from "./drupal-util";


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
        
           this.fetchDataAPI2(index.index);

    
 
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
fetchDataAPI2=(page_num)=>{
        let mainmenu =[],mainmenustate=[];
      var xId = GetParameterValues('id');
        var xname =replce_name(GetParameterValues('name'));
        if (xId==null)
        {
            window.location.href="/";
        }
        this.setState({name:xname});
     fetch(list_of_category_type(xId,page_num))
            .then(blob => blob.json())
            .then(data => {
                if ( data.results.length==0)
                {
                    window.location.href="/";

                }
         
           this.setState({itemPerPage:data.pager.items_per_page});
                      this.setState({pager:data.pager});
         mainmenu=data.results;
          fetch(setting_api)
            .then(blob3 => blob3.json())
            .then(data3 => {
				var processedData = processContentListApi(data3, mainmenu);
				this.setState(processedData);
           });
         
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
