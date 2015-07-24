/* GET users listing. */
var mongoose = require('mongoose');

exports.list = function(req, res){
	var Todo = mongoose.model('Todo');
	Todo.find(function(err,records){
	res.send(records);	
	});
};
exports.CreateCourse=function(req,res)
{
	var Todo = mongoose.model('Todo');
    new Todo({
    name    : req.body.txtname,
    completed    : req.body.txtstatus,
    note:req.body.notes,
    updated_at : Date.now()
  }).save( function( err, todo, count ){
    res.redirect( '/account' );
  });
};

exports.edit=function(req,res)
{
	 var Todo = mongoose.model('Todo');
	 Todo.findById(req.params.id, function ( err, todo )
	 {
	  res.render(todo);	
	});
};

exports.destroy = function ( req, res, next ){
var Todo = mongoose.model('Todo');
  Todo.findById( req.params.id, function ( err, todo )
  { 
    todo.remove( function ( err, todo ){
      if( err ) return next( err );
      res.redirect( '/account' );
    });
  });
};