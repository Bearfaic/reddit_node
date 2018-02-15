var 	ObjectID 	= require('mongodb').ObjectID;

//Code to request data from web hosted json. Taken from 
//https://stackoverflow.com/questions/20304862/nodejs-httpget-to-a-url-with-json-response
const   request 		 = require("request");
var     url 			 = "https://www.reddit.com/r/SubredditSimulator/top/.json";

module.exports = function(app, db) {

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    	
    for(i=0; i < subRedditJSON.data.children.length; i++) {
    	console.log(subRedditJSON.data.children[i].data.author + " has received " + 
    	subRedditJSON.data.children[i].data.ups + " upvotes.") 
    }
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });


  app.get('/redditer/:search', (req, res) => 
  {
    const search = req.params.search;
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



  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });

  	app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });


};