/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const e = require("cors");

module.exports = {
  create: (req, res) => {
    User.create(req.body)
      .exec((err, user) => {
        if (err) {
          return res.status(400).send({
            message: 'Invalid Input'
          });
        }
        return res.ok(user)
      })
  },

  read: (req, res) => {
    User.findOne({
      id: req.param('id')
    })
      .exec((err, user) => {
        if (err) {
          return res.status(400).send({
            message: 'Invalid Input'
          });
        }
        return res.json(user)
      })
  },

  update: (req, res) => {
    const updateRecord = req.allParams()
    User.update({
      id: req.param('id')
    },
      updateRecord
    ).exec((err, user) => {
      if (err) {
        return res.status(400).send({
          message: 'Invalid Input'
        });
      }
      return res.json(user)
    })
  },

  /**
   * Delete the product.
   * @param - the id of service. URL parameter
   * @return - the service object.
   */
  destroy: (req, res) => {
    User.destroy({
      id: req.param('id')
    })
      .exec((err, user) => {
        if (err) {
          return res.status(400).send({
            message: 'Invalid Input'
          });
        }
        return res.json(user)
      })
  },

  addUserSongs: (req, res) => {
    async function updateSong(songData) {
      return new Promise((resolve, reject) => {
        Song.findOne({ id: songData })
          .exec(function (err, song) {
            if (err) {
              reject(err);
            } else if (!song) {
              reject(`Could not find a service with name ${song}`)
            }
            else {
              Song.update({
                id: songData
              }, {
                userCount: song.userCount + 1
              }).exec((err, songD) => {
                if (err) {
                  return res.status(400).send({
                    message: 'Invalid Input'
                  });
                }
                resolve(songD.id)
              });
            }
          })
      })
    }
    async function updateArtist(artistData) {
      return new Promise((resolve, reject) => {
        Artist.findOne({ id: artistData })
          .exec(function (err, artist) {
            if (err) {
              reject(err);
            } else if (!artist) {
              reject(`Could not find a service with name ${artist}`)
            }
            else {
              Artist.update({
                id: artistData
              }, {
                userCount: artist.userCount + 1
              }).exec((err, artistD) => {
                if (err) {
                  return res.status(400).send({
                    message: 'Invalid Input'
                  });
                }
                resolve(artistD.id)
              });
            }
          })
      })
    }
    async function find_songs(services) {
      return new Promise((resolve, reject) => {
        Song.findOne({ name: services })
          .exec(function (err, service) {
            if (err) {
              reject(err);
            } else if (!service) {
              reject(`Could not find a service with name ${service}`)
            }
            resolve(service.id)
          })
      })
    }

    async function find_artists(services) {
      return new Promise((resolve, reject) => {
        Artist.findOne({ name: services })
          .exec(function (err, service) {
            if (err) {
              reject(err);
            } else if (!service) {
              reject(`Could not find a service with name ${service}`)
            }
            resolve(service.id)
          })
      })
    }

    async function run() {
      User.findOne({ id: req.param('id') })
        .populate('songCollection')
        .populate('artistCollection')
        .exec(async function (err, user) {
          if (err) {
            return res.status(400).send({
              message: 'Invalid Input'
            });
          } else if (!user) {
            return res.status(400).send({
              message: 'User not found'
            });
          }
          var songData = await find_songs(req.param('songName'));
          var artistData = await find_artists(req.param('artistName'));

          await updateSong(songData)
          await updateArtist(artistData)

          user.songCollection.add(songData)
          user.artistCollection.add(artistData)
          user.save(function (err) {
            if (err) {
              return res.status(400).send({
                message: err
              });
            }
          })
        })
      return;
    }
    run().then(() => {
      return res.send()
    })
  },


  readUserSongs: (req, res) => {
    User.findOne({ id: req.param('id') })
      .populate('songCollection')
      .populate('artistCollection')
      .exec(function (err, user) {
        if (err) {
          return res.status(400).send({
            message: 'Invalid Input'
          });
        } else if (!user) {
          return res.status(400).send({
            message: 'User not found'
          });
        }
        else {
          var songArr = []
          user.songCollection.map((song) => {
            var index = user.artistCollection.findIndex(artist => {
              return song.artist == artist.id;
            })
            if (index != -1) {
              song['artist'] = user.artistCollection[index].name;
              songArr.push(song);
            }
          })
          return res.json(songArr)
        }
      })
  },
  removeUserSongs: (req, res) => {
    async function updateSong(songData) {
      return new Promise((resolve, reject) => {
        Song.findOne({ id: songData })
          .exec(function (err, song) {
            if (err) {
              reject(err);
            } else if (!song) {
              reject(`Could not find a service with name ${song}`)
            }
            else {
              Song.update({
                id: songData
              }, {
                userCount: song.userCount - 1
              }).exec((err, songD) => {
                if (err) {
                  return res.status(400).send({
                    message: 'Invalid Input'
                  });
                }
                resolve(songD.id)
              });
            }
          })
      })
    }
    async function updateArtist(artistData) {
      return new Promise((resolve, reject) => {
        Artist.findOne({ id: artistData })
          .exec(function (err, artist) {
            if (err) {
              reject(err);
            } else if (!artist) {
              reject(`Could not find a service with name ${artist}`)
            }
            else {
              Artist.update({
                id: artistData
              }, {
                userCount: artist.userCount - 1
              }).exec((err, artistD) => {
                if (err) {
                  return res.status(400).send({
                    message: 'Invalid Input'
                  });
                }
                resolve(artistD.id)
              });
            }
          })
      })
    }
    async function find_songs(services) {
      return new Promise((resolve, reject) => {
        Song.findOne({ name: services })
          .exec(function (err, service) {
            if (err) {
              reject(err);
            } else if (!service) {
              reject(`Could not find a service with name ${service}`)
            }
            resolve(service.id)
          })
      })
    }

    async function find_artists(services) {
      return new Promise((resolve, reject) => {
        Artist.findOne({ name: services })
          .exec(function (err, service) {
            if (err) {
              reject(err);
            } else if (!service) {
              reject(`Could not find a service with name ${service}`)
            }
            resolve(service.id)
          })
      })
    }

    async function run() {
      User.findOne({ id: req.param('id') })
        .populate('songCollection')
        .populate('artistCollection')
        .exec(async function (err, user) {
          if (err) {
            return res.status(400).send({
              message: 'Invalid Input'
            });
          } else if (!user) {
            return res.status(400).send({
              message: 'User not found'
            });
          }
          var songData = await find_songs(req.param('songName'));
          var artistData = await find_artists(req.param('artistName'));

          await updateSong(songData)
          await updateArtist(artistData)

          user.songCollection.remove(songData)
          user.artistCollection.remove(artistData)
          user.save(function (err) {
            if (err) {
              return res.status(400).send({
                message: err
              });
            }
          })
        })
      return;
    }
    run().then(() => {
      return res.send()
    })
  },

  removeUserSong: (req, res) => {
    User.findOne({ id: req.param('id') })
      .populate('songCollection')
      .populate('artistCollection')
      .exec(function (err, user) {
        if (err) {
          return res.status(400).send({
            message: 'Invalid Input'
          });
        } else if (!user) {
          return res.status(400).send({
            message: `Could not find a user with ID ${req.param('id')}`
          });
        }
        var songUserCount;
        Song.findOne({ id: req.param('songId') })
          .exec(function (err, song) {
            if (err) {
              return res.status(400).send({
                message: 'Invalid Input'
              });
            } else if (!song) {
              return res.status(400).send({
                message: `Could not find a song with id ${req.param('songId')}`
              });
            }
            else
              songUserCount = song.userCount;

            user.songCollection.remove(song.id)
            Song.update({
              id: req.param('songId')
            }).set({
              userCount: songUserCount - 1
            }).exec((err, song) => {
              if (err) {
                return res.status(400).send({
                  message: 'Invalid Input'
                });
              }
            });
            user.save(function (err) {
              if (err) {
                return res.status(400).send({
                  message: err
                });
              }
              return res.ok()
            })
          })
      })
  },
};
