// query
var count = db.messages.find({"headers.From": 'andrew.fastow@enron.com', "headers.To": 'jeff.skilling@enron.com'}).count();
print (count);


// aggregate method 
db.messages.aggregate([
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
