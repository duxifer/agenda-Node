var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function (e, docs) {
    res.render('index', {
      title: 'Express',
      "userlist": docs,
      "error" : ''
    });
  });
});

/* POST to Add */
router.post('/add', function (req, res) {

  // Set our internal DB variable
  var db = req.db;
  // Set our collection
  var collection = db.get('usercollection');
  var b = true;
  var error = '';
  // Get our form values. These rely on the "name" attributes
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var direccion = req.body.direccion;
  var numero = req.body.numero;
  var tipo = req.body.tipo;

  if (nombre == undefined) {
    error = ("El nombre es necesario");
    b = false;
  }

  if (numero == undefined) {
    error = ("El numero es necesario");
    b = false;
  }
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (direccion != undefined && !re.test(direccion)) {
    error = ("El correo debe de tener un formato valido");
    b = false;
  }

  if (b) {
    // Submit to the DB
    collection.insert({
      "nombre": nombre,
      "apellido": apellido,
      "direccion": direccion,
      "numero": numero,
      "tipo": tipo
    }, function (err, doc) {
      if (!err) {
        // And forward to success page
        res.redirect("/");
      }
    });
  } else {
    collection.find({}, {}, function (e, docs) {
      res.render('index', {
        title: 'Express',
        "userlist": docs,
        "error": error
      });
    });
  }
});

router.get('/update/:id', function (req, res, next) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.findOne({_id: req.params.id}, {}, function (e, docs) {
    res.render('update', {
      "user": docs,
      "error" : ''
    });
  });
});

router.post('/update/:id', function (req, res) {

  // Set our internal DB variable
  var db = req.db;
  // Set our collection
  var collection = db.get('usercollection');
  var b = true;
  var error = '';
  // Get our form values. These rely on the "name" attributes
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var direccion = req.body.direccion;
  var numero = req.body.numero;
  var tipo = req.body.tipo;

  if (nombre == undefined) {
    error = ("El nombre es necesario");
    b = false;
  }

  if (numero == undefined) {
    error = ("El numero es necesario");
    b = false;
  }
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (direccion != undefined && !re.test(direccion)) {
    error = ("El correo debe de tener un formato valido");
    b = false;
  }

  if (b) {
    // Submit to the DB
    collection.update({_id: req.params.id},{
      "nombre": nombre,
      "apellido": apellido,
      "direccion": direccion,
      "numero": numero,
      "tipo": tipo
    }, function (err, doc) {
      if (!err) {
        // And forward to success page
        res.redirect("/");
      }
    });
  } else {
    collection.findOne({_id: req.params.id}, {}, function (e, docs) {
      res.render('update', {
        "user": docs,
        "error" : error
      });
    });
  }
});

router.post('/delete/:id', function (req, res, next) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.remove({_id: req.params.id},function(err, r) {});
  res.redirect("/");
});

module.exports = router;
