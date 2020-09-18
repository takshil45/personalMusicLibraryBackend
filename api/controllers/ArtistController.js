/**
 * ArtistController
 *
 * @description :: Server-side logic for managing artists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: (req, res) => {
        Artist.create(req.body)
            .exec((err, artist) => {
                if (err) {
                    return res.status(400).send({
                        message: 'Invalid Input'
                    });
                }
                return res.ok(artist)
            })
    },
    readArtistUserCount: (req, res) => {
        function sortByKey(array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return ((x > y) ? 1 : ((x < y) ? -1 : 0));
            });
        }
        Artist.find({
            // userCount: {
            //     '>=': 0
            // }
        }).exec(function (err, artists) {
            if (err) {
                return res.status(400).send({
                    message: 'Invalid Input'
                });
            } else if (!artists) {
                return res.status(400).send({
                    message: 'Song not found'
                });
            }
            return res.json(sortByKey(artists, req.param('sortBy')))
        })
    },
};

