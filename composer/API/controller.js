const url = require('url');
const routes = require('./routes.js');
const db = require('./libs/db')
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

exports.list = function (req, res, match) {
  let presentations = [];
  db.all("SELECT * FROM presentations", function (err, rows) {
    if (err) return (err);
    rows.forEach(function (row) {
      let slides = JSON.parse(row.data);
      presentations.push({
        "presentation": {
          "id": row.ID,
          "presentationId": row.presentationId,
          "name": row.name,
          "product": row.product,
          "useShared": row.useShared
        },
        "slides": slides
      });
    });
    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(presentations))
  });
}

exports.get = function (req, res, match) {
  db.all(`SELECT * FROM presentations WHERE id=?`, match[1], function (err, rows) {
    if (err) {
      return console.error(err.message);
    }
    let data = rows[0]
    var response = {
      "presentation": {
        "id": data.ID,
        "presentationId": data.presentationId,
        "name": data.name,
        "product": data.product,
        "useShared": data.useShared
      },
      "slides": JSON.parse(data.data)
    }

    res.statusCode = 201;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response))
  });
}

exports.create = function (req, res, match) {
  let id;
  body = '';

  req.on('data', function (chunk) {
    body += chunk;
    postBody = JSON.parse(body);
    createProjectJSON(postBody.presentation);
    var slides = JSON.stringify(postBody.presentation.slides);
    db.run(`INSERT INTO presentations(presentationId,name,product,useShared,data) VALUES(?,?,?,?,?)`,
      [
        postBody.presentation.presentationId,
        postBody.presentation.name,
        postBody.presentation.product,
        postBody.presentation.useShared,
        slides
      ],
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        id = this.lastID
        var response = [{
          "status": true,
          "id": id,
          "text": "Presentation added successfully"
        }]
        res.statusCode = 201;
        res.setHeader('content-Type', 'Application/json');
        res.end(JSON.stringify(response))
      }
    );
  });
}

exports.update = function (req, res, match) {
  let id;
  body = '';

  req.on('data', function (chunk) {
    body += chunk;
    postBody = JSON.parse(body);
    createProjectJSON(postBody.presentation);
    var slides = JSON.stringify(postBody.presentation.slides);
    db.run(`UPDATE presentations SET presentationId=?, name=?, product=?, useShared=?, data=? WHERE ID = ?`,
      [postBody.presentation.presentationId,
        postBody.presentation.name,
        postBody.presentation.product,
        postBody.presentation.useShared,
        slides,
        postBody.presentation.id
      ],
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        id = this.lastID
        var response = [{
          "status": true,
          "id": id,
          "text": "Presentation Update successfully"
        }]
        res.statusCode = 201;
        res.setHeader('content-Type', 'Application/json');
        res.end(JSON.stringify(response))
      });
  });
}

exports.delete = function (req, res, match) {
  db.all(`DELETE FROM presentations WHERE id=?`, match[1], function (err, rows) {
    if (err) {
      return console.error(err.message);
    }
    let data = rows[0]
    var response = {
      "presentation": {
        "id": match[1]
      },
      "status": this.changes
    }

    res.statusCode = 201;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response))
  });
}

exports.saveImage = function (req, res, match) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    try {
      const oldpath = files.filetoupload.path;
      const extension = files.filetoupload.type.split('/')[1]
      const filename = 'background-' + Date.now() + '.' + extension
      const newpath = './../public/images/' + filename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        var response = {
          "file": {
            "path": newpath,
            "name": filename
          },
          "status": true
        }
        res.statusCode = 200;
        res.setHeader('content-Type', 'Application/json');
        res.end(JSON.stringify(response))
      });
    } catch (err) {
      var response = {
        "error": err,
        "status": true
      }
      res.statusCode = 400;
      res.setHeader('content-Type', 'Application/json');
      res.end(JSON.stringify(response))
    }

  });
}

exports.deleteImage = function (req, res, match) {
  let id, path = './../public/images/',
    response;
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    id = match[1]
    try {
      fs.unlinkSync(path + id)
      response = {
        "status": true,
        "id": id,
      }
      res.statusCode = 201;
      res.setHeader('content-Type', 'Application/json');
      res.end(JSON.stringify(response))
      //file removed
    } catch (err) {
      response = [{
        "status": false,
        "id": id,
      }]
      res.statusCode = 400;
      res.setHeader('content-Type', 'Application/json');
      res.end(JSON.stringify(response))
    }
  });
}

exports.listImage = function (req, res, match) {
  const newpath = './../public/images/';
  let images = [];
  //passsing directoryPath and callback function
  fs.readdir(newpath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(async function (files) {
      images.push({
        "file": {
          "id": files,
        }
      });
    });
    res.statusCode = 201;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(images))

  });

}

exports.invalidUrl = function (req, res) {
  var response = [{
      "message": "oops! that is a wrong endpoint, here are the available endpoints "
    },
    routes
  ]
  res.statusCode = 404;
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response))
}

function createProjectJSON(presentation) {
  let data = JSON.stringify(presentation, null, 2);
  //const imagePath = `./../public/json/${presentation.name}.json`;
  const imagePath = `./../public/json/presentation.json`;
  fs.writeFileSync(imagePath, data);
}
