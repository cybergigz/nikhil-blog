export const list_of_categories =(reactjs_blog_categorySetting)=>
{return 'https://one-drupal-demo.technikh.com/onedrupal/api/v1/vocabulary/'+reactjs_blog_categorySetting+''}
export  const all_css_posts="https://one-drupal-demo.technikh.com/onedrupal/api/v1/content/all/81";
export  const all_js_posts="https://one-drupal-demo.technikh.com/onedrupal/api/v1/content/all/85";
export  const setting_api="https://one-drupal-demo.technikh.com/onedrupal/api/v1/settings";

export const list_of_category_type=(id,pagenum)=>{

    return "https://one-drupal-demo.technikh.com/onedrupal/api/v1/content/all/"+id+"?page="+pagenum+"";
}

export const category_details=(id)=>{

    return "https://one-drupal-demo.technikh.com/node/"+id+"?_format=json";
}
export const category_type=(id)=>{

    return "https://one-drupal-demo.technikh.com/taxonomy/term/"+id+"?_format=json";
}
export const all_posts=(pagenum)=>{

    return "https://one-drupal-demo.technikh.com/onedrupal/api/v1/content/all?page="+pagenum+"";
}

