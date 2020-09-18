/**
 * SongController
 *
 * @description :: Server-side logic for managing songs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: (req, res) => {
        Artist.findOrCreate({ name: req.param('artistName') }, {
            name: req.param('artistName'),
            userCount: 0
        }).exec((err, artistData) => {
            if (err) {
                return res.status(400).send({
                    message: 'Invalid Input'
                });
            }
            Song.create({
                name: req.param('songName'),
                artist: artistData.id,
                userCount: 0
            }).exec((err, song) => {
                if (err) {
                    return res.status(400).send({
                        message: 'Invalid Input'
                    });
                }
                return res.ok(song)
            })
        })
    },

    readSongUserCount: (req, res) => {
        function sortByKey(array, key) {
            return array.sort(function (a, b) {
                var x, y;
                if (key == 'artist') {
                    x = a[key]['name'];
                    y = b[key]['name']
                }
                else {
                    x = a[key];
                    y = b[key];
                }
                return ((x > y) ? 1 : ((x < y) ? -1 : 0));
            });
        }
        Song.find({
            // userCount: {
            //     '>=': 0
            // }
        }).populate('artist')
            .exec(function (err, songs) {
                if (err) {
                    return res.status(400).send({
                        message: 'Invalid Input'
                    });
                } else if (!songs) {
                    return res.status(400).send({
                        message: 'Song not found'
                    });
                }
                return res.json(sortByKey(songs, req.param('sortBy')))
            })
    },
};

