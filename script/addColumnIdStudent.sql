alter table income
add column studentId integer NULL,
ADD CONSTRAINT studentId
FOREIGN KEY(studentId) 
REFERENCES student(id)
