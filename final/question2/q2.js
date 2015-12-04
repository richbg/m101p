db.messages.aggregate([
   {$match: {
      "headers.From": {
         $in: [
            "jeff.dasovich@enron.com",
            "richard.shapiro@enron.com",
            "soblander@carrfut.com",
            "susan.mara@enron.com",
            "james.steffes@enron.com",
            "evelyn.metoyer@enron.com",
            "kate.symes@enron.com",
            "alan.comnes@enron.com",]}}},
   // Unwind to expand the recipient array.
   {$unwind: "$headers.To"},
   // Grouping to filter out duplicate recipients in the same email.
   {$group: {
      _id: {
         "mesId": "$headers.Message-ID",
         "to": "$headers.To"},
      "from": {
         $first: "$headers.From"}}},
   // Second group to count the actual from/to combinations.
   {$group: {
      _id: {
         "to": "$_id.to",
         "from": "$from"},
      "count": {
         $sum: 1}}},
   // Finally a sort to get the biggest hitters to the top.
   {$sort: {
      "count": -1}}])

