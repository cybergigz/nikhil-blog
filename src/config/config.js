import {l_homepage_featured_tid,l_default_image,l_domain,l_sitename,l_twitter_handle,l_facebook_handle,l_sidebar_block1_title,l_sidebar_block1_tid,l_sidebar_block2_title,l_sidebar_block2_tid,l_footer_block1_title,l_footer_block2_title,l_footer_block1_tid,l_footer_block2_tid,l_secondary_menu_title,l_secondary_menu_tid} from './../config/local-config';

export const list_of_categories =(reactjs_blog_categorySetting)=>
{return l_domain + '/onedrupal/api/v1/vocabulary/'+reactjs_blog_categorySetting+''}
export  const all_css_posts = l_domain + "/onedrupal/api/v1/content/all/81";
export  const all_js_posts = l_domain + "/onedrupal/api/v1/content/all/85";
export  const setting_api = l_domain + "/onedrupal/api/v1/settings";

export const list_of_category_type=(id,pagenum)=>{

    return l_domain + "/onedrupal/api/v1/content/all/"+id+"?page="+pagenum+"";
}

export const list_of_content_search=(keys,pagenum)=>{
console.log("list_of_content_search"+keys);
    return l_domain + "/onedrupal/api/v1/content/all?search_keys="+keys+"&page="+pagenum+"";
}

export const category_details=(id)=>{

    return l_domain + "/node/"+id+"?_format=json";
}
export const category_type=(id)=>{

    return l_domain + "/taxonomy/term/"+id+"?_format=json";
}
export const all_posts=(pagenum)=>{

    return l_domain + "/onedrupal/api/v1/content/all?page="+pagenum+"";
}

export const category_posts=(tid)=>{
    return l_domain + "/onedrupal/api/v1/content/all/"+tid+"";
}

export const sitename = l_sitename;

const g_twitter_handle = (l_twitter_handle != "") ? "https://www.twitter.com/"+l_twitter_handle : "";
export const twitter_handle = g_twitter_handle;

const g_facebook_handle = (l_facebook_handle != "") ? "https://www.facebook.com/"+l_facebook_handle : "";
export const facebook_handle = g_facebook_handle;

export const sidebar_block1_title = l_sidebar_block1_title;
export const sidebar_block1_tid = l_sidebar_block1_tid;

export const sidebar_block2_title = l_sidebar_block2_title;
export const sidebar_block2_tid = l_sidebar_block2_tid;

export const footer_block1_title = l_footer_block1_title;
export const footer_block1_tid = l_footer_block1_tid;

export const footer_block2_title = l_footer_block2_title;
export const footer_block2_tid = l_footer_block2_tid;

export const secondary_menu_title = l_secondary_menu_title;
export const secondary_menu_tid = l_secondary_menu_tid;

export const homepage_featured_tid = l_homepage_featured_tid;

export const default_image = l_default_image;
