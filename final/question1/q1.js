// query
var count = db.message.find({"headers.From": 'andrew.fastow@enron.com', "headers.To": 'jeff.skilling@enron.com'}).count();
print (count);


// aggregate method 
db.message.aggregate([
   {$match: 
      {"headers.From": "andrew.fastow@enron.com"}}, 
   {$unwind: "$headers.To"}, 
   {$group: 
      {_id: "$headers.To", 
      count: 
         {$sum: 1}
      }
   }
])
