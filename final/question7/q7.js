//add index 
db.albums.ensureIndex({'images':1});

var to_remove = [];

db.images.find({}, {_id:1}).forEach(function(each) { 
    if (!db.albums.findOne({images:each._id})) { 
        to_remove.push(each._id); 
    }
});

print(to_remove);
print(to_remove.length);

db.images.remove({_id: {$in: to_remove}});

print (db.images.find({tags:"kittens"}).count());
