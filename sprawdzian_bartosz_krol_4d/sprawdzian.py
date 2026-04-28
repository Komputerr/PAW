__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Bartosz Król 4D"

import datetime
from typing import List

from models.Grades import Grades
from models.Student import Student
from models.Subject import Subject
from models.Teacher import Teacher
from year_grade import year_grade
import json

teachers:List[Teacher] = []
subjects:List[Subject] = []
students:List[Student] = []
grades:List[Grades] = []

with open("teachers.txt", "r", encoding="UTF-8") as f_teachers:
    lines = f_teachers.readlines()
    for line in lines:
        props = line.strip().split(' ')
        teachers.append(Teacher(int(props[0]),props[1],props[2]))

with open('subjects.txt', 'r', encoding="UTF-8") as f_subjects:
    lines = f_subjects.readlines()
    for line in lines:
        props = line.strip().split(' ')
        for teacher in teachers:
            if teacher.id == int(props[2]):
                subjects.append(Subject(int(props[0]), props[1], teacher))
                break

with open('students.txt', 'r', encoding="UTF-8") as f_students:
    lines = f_students.readlines()
    for line in lines:
        props = line.strip().split(' ')
        birthdate = datetime.datetime.strptime(props[3], '%Y-%m-%d').date()
        students.append(Student(int(props[0]), props[1], props[2], birthdate))

with open('grades.txt', 'r', encoding="UTF-8") as grades_file:
    lines = grades_file.readlines()
    for line in lines:
        props:List[str] = line.strip().split(' ')
        grades_list:List[str] = props[2].split(',')
        for student in students:
            if student.id == int(props[0]):
                for subject in subjects:
                    if subject.id == int(props[1]):
                        subject_grades: Grades = Grades(student, subject)
                        for grade in grades_list:
                            subject_grades.add_grade(int(grade))
                        grades.append(subject_grades)
                        break
                break

print("Oceny i średnie poszczególnych uczniów")
for student in students:
    print(f"{student}:")
    for subject_grades in grades:
        if subject_grades.student == student:
            print(f"\t{subject_grades.subject.name}:")
            print(f"\t\tOceny: {", ".join(map(str, subject_grades.get_grades()))}")
            print(f"\t\tŚrednia: {str(round(subject_grades.get_average(), 2))}")
            print(f"\t\tOcena końcowa: {str(year_grade(subject_grades.get_average()))}")
    print()

with open("students.json", "w", encoding="UTF-8") as fj_students:
    res:List[dict] = []
    for student in students:
        res_student: dict = {}
        res_subjects: dict = {}

        for subject_grades in grades:
            if subject_grades.student == student:
                res_subject: dict = {"Oceny": ", ".join(map(str, subject_grades.get_grades())),
                                        "Srednia": round(subject_grades.get_average(), 2),
                                        "Ocena roczna": year_grade(subject_grades.get_average())}
                res_subjects[subject_grades.subject.name] = res_subject

        res_student[str(student)] = res_subjects
        res.append(res_student)
    json.dump(res, fj_students, indent=4, ensure_ascii=False)

print("="*50)
print()

for subject in subjects:
    print(f"{subject.name}:")
    print(f"\tNauczyciel: {subject.teacher}")

    grades_s:List[int] = []
    for subject_grades in grades:
        if subject_grades.subject == subject:
            grades_s += subject_grades.get_grades()
    print(f"\tOceny: {", ".join(map(str, grades_s))}")

    avg = round(sum(grades_s) / len(grades_s), 2) if grades_s else 0.0
    print(f"\tŚrednia: {avg}")
    print()

with open('subjects.json', 'w', encoding="UTF-8") as fj_subjects:
    res:List[dict] = []
    for subject in subjects:
        full_res_subject: dict = {}
        res_subject: dict = {"Nauczyciel": str(subject.teacher)}

        grades_res: List[int] = []
        for subject_grades in grades:
            if subject_grades.subject == subject:
                grades_res += subject_grades.get_grades()
        res_subject["Oceny"] = grades_res

        avg = round(sum(grades_res) / len(grades_res), 2) if grades_res else 0.0
        res_subject["Średnia"] = avg

        full_res_subject[subject.name] = res_subject
        res.append(full_res_subject)
    json.dump(res, fj_subjects, indent=4, ensure_ascii=False)


