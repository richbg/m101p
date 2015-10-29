import pymongo

# Homework 3.1 · Course M101P
#
# Write a program in the language of your choice that will remove
# the lowest homework score for each student. Since there is a single
# document for each student containing an array of scores, you will need 
# to update the scores array and remove the homework.
# Remember, just remove a homework score. Don't remove a quiz or an exam!

connection = pymongo.MongoClient("mongodb://localhost")
db = connection.school
students = db.students

def find():
    print("finding all students")

    try:
        cursor = students.find()
        for student in cursor:
            student_id = student['_id']
            scores = student['scores']
            lowest_score = None
            for score in scores:
                if score['type'] == 'homework' and (lowest_score is None or score['score'] < lowest_score):
                    lowest_score = score['score']
                    print(student['name'])
                    print(lowest_score)
            students.update({'_id': student_id}, {'$pull': {'scores': {'score': lowest_score}}})

    except Exception as e:
        print("Unexpected error:", type(e), e)


find()
