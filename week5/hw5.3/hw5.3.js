db.grades.aggregate([
  {$unwind: '$scores'},
  {$match: {'scores.type': {$ne: 'quiz'}}},
  {$project: {_id: 0, class: '$class_id', student: '$student_id', score: '$scores.score'}},
  {$group: {_id: {class: '$class', student: '$student'}, student_avg: {$avg: '$score'}}},
  {$group: {_id: {class: '$_id.class'}, avg: {$avg: '$student_avg'}}},
  {$project: {_id: 0, class: '$_id.class', avg: 1}},
  {$sort: {avg: -1}}
])
