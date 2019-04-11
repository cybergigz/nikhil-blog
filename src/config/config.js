export const list_of_categories = 'https://one-drupal-demo2.technikh.com/onedrupal/api/v1/vocabulary/categories';
export  const all_posts="https://one-drupal-demo2.technikh.com/onedrupal/api/v1/content/all";
export const list_of_category_type=(id)=>{

    return "https://one-drupal-demo2.technikh.com/onedrupal/api/v1/content/all/"+id+"";
}

export const category_details=(id)=>{

    return "https://one-drupal-demo2.technikh.com/node/"+id+"?_format=json";
}
export const category_type=(id)=>{

    return "https://one-drupal-demo2.technikh.com/taxonomy/term/"+id+"?_format=json";
}

