/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
    },
    artistCollection: {
      collection: 'artist',
      via: 'users'
    },
    songCollection: {
      collection: 'song',
      via: 'users'
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
