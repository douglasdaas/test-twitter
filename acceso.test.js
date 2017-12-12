const assert = require('chai').assert;
const expect = require('expect');
const Twit = require('twit');

var Acceso = require('./acceso');
var cuenta = new Twit(Acceso.acceso);

var usuario;

describe('Prueba para recibir un usuario de Twitter', () => {
  it('Devuelve el usuario', (done) => {

    usuario = {
      screen_name: 'Twitter'
    };

    cuenta.get('users/show', usuario, function(e, data, res) {
      if (e) {
        done(e);
      }

      assert.equal(e, undefined);
      assert.equal(res.headers.status, '200 OK');
      assert.equal(data.screen_name, usuario.screen_name);
      done();

      usuario = null;
    });
  });

  it('Da un error si el usuario no existe', (done) => {

    usuario = {
      screen_name: 'algo invalido'
    }

    cuenta.get('users/show', usuario, function(e, data, res) {


      assert.equal(e.statusCode, 404);
      assert.equal(e.code, 50);
      done();

      usuario = null;
    });
  });
});
