var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('contact', ['contact']);
var bodyParser = require('body-parser');
var helper = require('./js_helper');

var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.post('/contact_list', function(req, res) {
	var table = {};
	var page = helper.page(req.body);
	
	// get rows
	db.contact.find({}).limit(page.limit).skip(page.skip, function(err, docs) {
		table.rows = docs;
		
		// get page
		db.contact.find({}).count(function(err, count) {
			table.page = [];
			var page_count = Math.ceil(count / page.limit);
			for (var i = -5; i <= 5; i++) {
				var counter = page.no + i;
				if (0 < counter && counter <= page_count) {
					table.page.push({ no: counter });
				}
			}
			res.json(table);
		});
	});
});

app.post('/contact_update', function(req, res) {
	var action = (req.body.action != null) ? req.body.action : '';
	if (action == 'contact_insert') {
		if (req.body._id != null) {
			db.contact.findAndModify({
				query: { _id: mongojs.ObjectId(req.body._id) },
				update: { $set: { name: req.body.name, email: req.body.email, number: req.body.number } },
				new: true
			}, function(err, doc) {
				res.json(doc);
			});
		} else {
			db.contact.insert(req.body, function(err, doc) {
				res.json(doc);
			});
		}
	}
	else if (action == 'contact_get_by_id') {
		db.contact.findOne({ _id: mongojs.ObjectId(req.body._id) }, function(err, doc) {
			res.json(doc);
		});
	}
	else if (action == 'contact_delete') {
		db.contact.remove({ _id: mongojs.ObjectId(req.body._id) }, function(err, doc) {
			res.json(doc);
		});
	}
	else {
		res.json(req.body);
	}
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
