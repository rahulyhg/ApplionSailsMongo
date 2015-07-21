/**
 * Warranty.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        period: {
            type: "string"
        },
        type: {
            type: 'string',
            enum: ['onsite', 'offsite']
        },
        expiry: {
            type: "date"
        },
        iscovered: {
            type: 'string',
            enum: ['true', 'false']
        },
        iswarrantyoramc: {
            type: 'string',
            enum: ['Extended Warranty', 'AMC']
        },
        purchasedate: {
            type: "date"
        },
        billno: {
            type: "string"
        },
        images: {
            type: "array"
        },
        store: {
            model: "store"
        },
        purchasedfrom: {
            type: "string"
        },
        contact: {
            type: "string"
        },
        purchaseprice: {
            type: "string"
        },
        includes: {
            type: 'array'
        },
        appliance: {
            model: "appliance"
        }
    },
    createwarranty: function (str, callback) {
        console.log(str.id);
        Warranty.create(str).exec(function (error, created) {
            if (error) {
                console.log(error);
                callback("false");
            }
            if (created) {
                console.log(created);
                callback(created);
            }
        });
    },
    updatewarranty: function (str, callback) {
        console.log(str.id);
        Warranty.update({
            id: str.id
        }, str).exec(function (error, updated) {
            if (error) {
                console.log(error);
                callback("false");
            } else {
                console.log(updated);
                callback("true");
            }
        });
    }
};