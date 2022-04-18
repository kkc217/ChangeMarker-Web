const express = require('express');
const router = express.Router();

router.use('/', function(req, res, next) {
    var mysql_odbc = require('../db/db_conn')();
    var conn = mysql_odbc.init();
    
    var query = "DELETE FROM scripts_web where `user_code`='";
    query += req.body.user_code;
    query += "' and `type`='";
    query += req.body.type;
    if (req.body.length_old != 0) {
        query += "' and `length_old`='";
        query += req.body.length_old;
    }
    if (req.body.line_number_old.length != 0) {
        query += "' and `line_number_old`='";
        query += req.body.line_number_old;
    }
    if (req.body.length_new != 0) {
        query += "' and `length_new`='";
        query += req.body.length_new;
    }
    if (req.body.line_number_new != 0) {
        query += "' and `line_number_new`='";
        query += req.body.line_number_new;
    }
    query += "' and `change_id`='";
    query += req.body.change_id;
    query += "';"
    conn.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send({message : 'Delete success!!'});
        }
    })
});

module.exports = router;