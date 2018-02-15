const   request 		 = require("request");
var     url 			 = "https://www.reddit.com/r/SubredditSimulator/top/.json";

module.exports = function(app, db) {

  app.get('/redditer/:search', (req, res) => 
  {
    const search = req.params.search;
    //Code to request data from web hosted json. Taken from 
	//https://stackoverflow.com/questions/20304862/nodejs-httpget-to-a-url-with-json-response
	request({
		url: url,
		json: true 

	},  function (error, response, body) {

	    if (!error && response.statusCode === 200) {
			var strang = ""
			for(i=0; i < body.data.children.length; i++) {
				if(body.data.children[i].data.title.indexOf(search) > -1 ){
		    	strang = strang +body.data.children[i].data.title + " has received " + 
    			body.data.children[i].data.ups + " upvotes.\n" 
    			}
		    }
		    res.send(strang)
		}
	});
	});

};