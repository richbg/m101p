db.zips.aggregate([
    {$project: { _id: 1, city: 1, pop: 1, state: 1, first_char: {$substr : ["$city", 0, 1]} }},
    {$match: {first_char: {$regex: '[0-9]'}}},
    {$group: {_id: null, sum: {$sum: '$pop'}}}
])
