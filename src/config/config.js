export const list_of_categories = 'http://one-drupal-demo2.technikh.com/onedrupal/api/v1/vocabulary/categories';
export  const all_posts="http://one-drupal-demo2.technikh.com/onedrupal/api/v1/content/all";
export const list_of_category_type=(id)=>{

    return "http://one-drupal-demo2.technikh.com/onedrupal/api/v1/content/all/"+id+"";
}

export const category_details=(id)=>{

    return "http://one-drupal-demo2.technikh.com/node/"+id+"?_format=json";
}
export const category_type=(id)=>{

    return "http://one-drupal-demo2.technikh.com/taxonomy/term/"+id+"?_format=json";
}

