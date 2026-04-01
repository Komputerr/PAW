
class Student:
    def __init__(self,id, name, surname, age, courses=None):
        self.id:int = id
        self.name:str = name
        self.surname:str = surname
        self.age:str = age
        self.courses = courses if courses is not None else []
    def Info(self):
        courses_str = ", ".join(self.courses)
        print(f"{self.name} {self.surname} ({self.age} lat): {courses_str}")
    def SaveToFile(self):
        with open(f"{self.name.lower()}_{self.surname.lower()}.txt", "w", encoding="UTF8") as file:
            courses_ent = ",\n-".join(self.courses)
            file.write("Kursy: \n-"+courses_ent)

class Course:
    def __init__(self, studentId, subjectName):
        self.studentId:int = studentId
        self.subjectName:str = subjectName
    def Info(self):
        print(f"{self.studentId} {self.subjectName}")

def readfile():
    students = []
    courses = []
    with open("students.txt", "r", encoding="UTF8") as file:
        lines = file.readlines()
        for line in lines:
            line = line.split(",")
            student = Student(line[0],line[1], line[2], line[3].strip())
            students.append(student)

    with open("courses.txt", "r", encoding="UTF8") as file:
        lines = file.readlines()
        for line in lines:
            line = line.split(",")
            course = Course(line[0],line[1].strip())
            courses.append(course)

    for course in courses:
        for student in students:
            if student.id == course.studentId:
                student.courses.append(course.subjectName)

    for student in students:
        student.Info()
        student.SaveToFile()



if __name__ == '__main__':
    readfile()