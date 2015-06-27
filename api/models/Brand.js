/**
 * Brand.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


module.exports = {

    attributes: {
        name: {
            type: "string",
            required: true
        },
        abbreviation: {
            type: 'string'
        },
        image: {
            type: "string"
        },
        status: {
            type: 'string',
            enum: ['IsPublished for User', 'Not Published for User']
        },
        appliancetypes: {
            collection: "appliancetype",
            via: "brands"
        }

    },
    findbrand: function (str, callback) {
        var returns = [];
        var exit = 0;
        var exitup = 0;
        var shouldend = false;
        sails.MongoClient.connect(sails.url, function (err, db) {
            var appbrand = db.collection('appliancetype_brands__brand_appliancetypes').find({
                appliancetype_brands: sails.ObjectID(str.appliancetype)
            }).each(function (err, data) {
                if (data != null) {
                    exitup++;
                    console.log("in if");
                    var found = db.collection("brand").find({
                        _id: data.brand_appliancetypes
                    }).each(function (err, data2) {
                        console.log(data2);
                        if (data2 != null) {
                            console.log("in in if");
                            returns.push(data2);
                        } else {
                            exit++;
                            if (exit == exitup && shouldend) {
                                callback(returns);
                            }
                        }
                    });
                } {
                    shouldend = true;
                }
            });
        });
    },

    searchbrand: function (str, callback) {
        var check = str.name;
        Brand.find({
            name: {
                'like': '%' + check + '%'
            }
        }).exec(function findCB(error, found) {
            if (found.length) {
                console.log(found);
                callback(found);
            } else {
                callback("false");
            }
        });
    }
};