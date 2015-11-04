HW4.3 
Your assignment is to make the following blog pages fast:

The blog home page
The page that displays blog posts by tag (http://localhost:8082/tag/whatever)
The page that displays a blog entry by permalink (http://localhost:8082/post/permalink)


Adding reverse index on the field dates:
db.posts.ensureIndex({ date: -1})

Adding indexes on the field permalink:
db.posts.ensureIndex({ permalink: 1}, {unique: true})

Adding indexes on the field tags
db.posts.ensureIndex( { tags:1, date: -1})
db.posts.find({ tags: 'sphynx'}).sort({ date: -1}).limit( 10).explain()
