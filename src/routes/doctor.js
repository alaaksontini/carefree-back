const express = require('express');
const router = express.Router();

module.exports = (firebase) => {
  // List Doctors
  router.get('/', (req, res) => {
    firebase.database().ref('doctor').once('value').then((snapshot) => {
      res.json(snapshot.val());
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).json({
        error: {
          errorCode,
          errorMessage,
        },
      });
    });
  });

  // add new Doctor
  router.post('/add', (req, res) => {
    let newDoctor = firebase.database().ref('doctor').push(req.body);
    newDoctor.set(req.body).then(response => {
      res.json();
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).json({
        error: {
          errorCode,
          errorMessage,
        },
      });
    });
  });

  // Show single Doctor
  router.get('/show/:id', (req, res) => {
    let newDoctor = firebase.database().ref(`doctor/${req.params.id}`).once('value').then(response => {
      res.json(response);
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).json({
        error: {
          errorCode,
          errorMessage,
        },
      });
    });
  });

  // delete single Doctor
  router.put('/:id', (req, res) => {
    let newDoctor = firebase.database().ref(`doctor/${req.params.id}`).set(req.body).then(response => {
      res.json(response);
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).json({
        error: {
          errorCode,
          errorMessage,
        },
      });
    });
  });

  // delete single Doctor
  router.delete('/:id', (req, res) => {
    let newDoctor = firebase.database().ref(`doctor/${req.params.id}`).remove().then(response => {
      res.json(response);
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).json({
        error: {
          errorCode,
          errorMessage,
        },
      });
    });
  });
  return router;
};
