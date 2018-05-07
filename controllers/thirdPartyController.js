var thirdpartyController = function (Patientthirdpartyuser) {
    var post = function (req, res) {
        var patientthirdpartyuser = new Patientthirdpartyuser(req.body);

        if(!req.body.name) {
            res.status(400);
            res.send('Name is required');
        } else {
            patientthirdpartyuser.save();
            res.status(201);
            res.send(patientthirdpartyuser);
        }
    };
    var get = function (req, res) {
        var query = {};
        if(req.query.patientname)
            query.patientname = req.query.patientname;

            Patientthirdpartyuser.find(query, function (err, thirdpartyusers) {
            if(err)
                res.status(500).send(err);
            else
                var userstoreturn = [];
                thirdpartyusers.forEach(function (elem, i, arr) {
                    var el = elem.toJSON();
                    el.links = {};
                    el.links.self = 'http://' + req.headers.host + '/api/thirdparty/' + el._id;
                    userstoreturn.push(el);
                });
                res.json(userstoreturn);
        });
    };
    var getOne = function (req, res) {
        var userstoreturn = req.thirdpartyuser.toJSON();
        userstoreturn.links = {};
        var newLink = 'http://' + req.headers.host + '/api/thirdparty?patientname=' + userstoreturn.patientname;
        userstoreturn.links.filterByThispatientname = newLink.replace(' ', '%20');
        res.json(userstoreturn);
    };
    var put = function (req, res) {
        req.thirdpartyuser.name = req.body.name;
        req.thirdpartyuser.email = req.body.email;
        req.thirdpartyuser.patientname = req.body.patientname;
        req.thirdpartyuser.permission = req.body.permission;
        req.thirdpartyuser.save(function (err) {
            if(err)
                res.status(500).send(err);
            else
                res.json(req.thirdpartyuser);
        });
    };
    var patch = function (req, res) {
        if(req.body._id)
            delete req.body._id;
        for(var p in req.body) {
            req.thirdpartyuser[p] = req.body[p]
        }
        req.thirdpartyuser.save(function (err) {
            if(err)
                res.status(500).send(err);
            else
                res.json(req.thirdpartyuser);
        });
    };
    var deleteOne = function (req, res) {
        req.thirdpartyuser.remove(function (err) {
            if(err)
                res.status(500).send(err);
            else
                res.status(204).send('Removed');
        });
    };
    var returnOne = function (req, res, next) {
      Patientthirdpartyuser.findById(req.params.thirdpartyid, function (err, thirdpartyuser) {
            if(err)
                res.status(500).send(err);
            else if (thirdpartyuser) {
                req.thirdpartyuser = thirdpartyuser;
                next();
            } else
                res.status(404).send('no users found');
        });
    };

    return {
        get: get,
        post: post,
        getOne: getOne,
        put: put,
        patch: patch,
        delete: deleteOne,
        returnOne: returnOne
    }
};

module.exports = thirdpartyController;
