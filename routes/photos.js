var Photo = require('../models/Photo');
var multiparty = require('multiparty');
var path = require('path');
var fs = require('fs');
var join = path.join;

exports.list = function(req, res){ res.render('photos', {
  title: 'Photos',
  photos: photos });
};

exports.list = function(req, res, next){
  Photo.find({}, function(err, photos){
    if (err) return next(err);
    res.render('photos', {
      title: 'Photos',
      photos: photos
    });
  });
};

exports.form = function(req, res){
  res.render('photos/upload', {
    title: 'Photo upload' 
  });
};

exports.submit = function (dir) {
  return function(req, res, next){
    var form = new multiparty.Form({uploadDir: './public/photos/'});
    form.parse(req,function (err, fields, files) {
      var img = files.image[0];
      var name = fields.name[0];
      var path = join(dir, img.originalFilename);
      console.log(path);
      fs.rename(img.path, path, function(err){
        if (err) return next(err);
        Photo.remove({});
        Photo.create({
          name: name,
          path: img.originalFilename
        }, function(err) {
          if (err) return next(err);
          res.redirect('/');
        });
      });
    });
    
  };
};

exports.download = function(dir){
  return function(req, res, next){
    var id = req.params.id;
    Photo.findById(id, function(err, photo){
      if (err) return next(err);
      var path = join(dir, photo.path);
      res.download(path, photo.name+'.jpeg');
    });
  };
};
