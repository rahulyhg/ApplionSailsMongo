/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    uploadfile: function (req, res) {
        req.file("file").upload(function (err, uploadedFiles) {
            if (err) return res.send(500, err);
            _.each(uploadedFiles, function (n) {
                var oldpath = n.fd;
                var source = sails.fs.createReadStream(n.fd);
                n.fd = n.fd.split('\\').pop().split('/').pop();
                var dest = sails.fs.createWriteStream('./uploads/' + n.fd);
                source.pipe(dest);
                source.on('end', function () {
                    sails.fs.unlink(oldpath, function (data) {
                    });
                });
                source.on('error', function (err) {
                    console.log(err);
                });
            });
            return res.json({
                message: uploadedFiles.length + ' file(s) uploaded successfully!',
                files: uploadedFiles
            });
        });
    },
    resize: function (req, res) {
        function showimage(path) {
            var image = sails.fs.readFileSync(path);
            var mimetype = sails.mime.lookup(path);
            res.set('Content-Type', mimetype);
            res.send(image);
        }
        var file = req.query.file;
        var filepath = './uploads/' + file;
        var isfile = sails.fs.existsSync(filepath);
        if (!isfile) {
            res.json({
                message: "File not found",
                value: "false"
            });
        } else {
            showimage(filepath);
        }
    },
    createuser: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        };
        var data = User.createuser(req.body, printjson);

    },
    updateuser: function (req, res) {
        var alluserdata = req.allParams();
        var printjson = function (data) {
            res.json(data);
        };
        var data = User.updateuser(alluserdata, printjson);
    },

    deleteuser: function (req, res) {
        var id = req.param('id');
        var printjson = function (data) {
            res.json(data);
        };
        var data = User.deleteuser(id, printjson);
    },

    login: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        };
        var data = User.login(req.body, printjson);
    },
    finduserbyid: function (req, res) {
        var logindata = req.allParams();
        var printjson = function (data) {
            res.json(data);
        };
        User.finduserbyid(logindata, printjson);
    },
    findallusers: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        };
        User.findallusers(req.body, printjson);
    },
    changepassword: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        };
        User.changepassword(req.body, printjson);
    },
    searchmail: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        };
        User.searchmail(req.body, printjson);
    },

    forgotpassword: function (req, res) {
        var printdata = function (data) {
            res.json(data);
        }
        User.forgotpassword(req.body, printdata);
    }
};