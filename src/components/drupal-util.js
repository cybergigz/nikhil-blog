import { default_image } from "./../config/config";

const processContentListApi = (data3, mainmenu, limit = 0) => {
  let mainmenustate = [];
  var article_body = "",
    article_image = "",
    article_remoteimage = "",
    article_category = "",
    article_type = "";

  for (var i = 0; i < mainmenu.length; i++) {

    for (var x = 0; x < data3.types.length; x++) {
	    article_body = data3.types[x].fields.body;
	    article_image = data3.types[x].fields.image;
	    article_remoteimage = data3.types[x].fields.remote_image;
	    article_type = data3.types[x].node_type;
	    if (data3.types[x].fields.taxonomies.length > 0) {
	      article_category = data3.types[x].fields.taxonomies[0].field;
	    }
      //image, typeId
      if (mainmenu[i].type[0].target_id === article_type) {
        var typeId = "",
          typename = "",
          image = "";
        var day = "",
          month = "",
          year = "",
          fulldate = "";
        var datefull = new Date(mainmenu[i].changed[0].value.toString());

        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        day = datefull.getDate();
        month = monthNames[datefull.getMonth()];
        year = datefull.getFullYear();
        fulldate = month + " " + day + " " + year;
        var bodeImage = "";
        if (article_image.length > 0) {
          if (mainmenu[i][article_image] != undefined) {
            if (mainmenu[i][article_image].length > 0) {
              bodeImage = mainmenu[i][article_image][0].url;
            }
          }
        }
        if (!bodeImage && article_remoteimage.length > 0) {
          if (mainmenu[i][article_remoteimage] != undefined) {
            if (mainmenu[i][article_remoteimage].length > 0) {
              bodeImage = mainmenu[i][article_remoteimage][0].uri;
            }
          }
        }
        if(!bodeImage){
			if(default_image){
				bodeImage = default_image;
			}
		}
        if (mainmenu[i][article_category] != undefined) {
          if (mainmenu[i][article_category].length > 0) {
            typeId = mainmenu[i][article_category][0].target_id;
          }
        }

        let blogs = {
          nid: mainmenu[i].nid[0].value,
          title: mainmenu[i].title[0].value,
          image: bodeImage,
          typeId: typeId,
          date: fulldate
        };
        //console.log(typeId);
        mainmenustate.push(blogs);
        if (limit > 0 && mainmenustate.length >= limit) {
          return { blogs: mainmenustate };
        }
        break;
      }
    }
    /*if (limit > 0 && mainmenustate.length >= limit) {
      break;
    }*/
  }

  //this.setState({blogs:mainmenustate});

  return { blogs: mainmenustate };
};

export { processContentListApi };
