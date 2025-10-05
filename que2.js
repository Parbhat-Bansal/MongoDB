// Use the database (creates studentDB if it doesn't exist)
use studentDB;

// --------------------
// CREATE - Insert Students
// --------------------
db.students.insertMany([
    { name: "Arjun", age: 21, course: "Computer Science" },
    { name: "Neha", age: 20, course: "Mechanical" },
    { name: "Ravi", age: 22, course: "Electrical" },
    { name: "Priya", age: 19, course: "Civil" }
]);

print("Students inserted successfully!");

// --------------------
// READ - Fetch Students
// --------------------

// Get all students
print("All Students:");
db.students.find().forEach(doc => printjson(doc));

// Get students filtered by course
print("Computer Science Students:");
db.students.find({ course: "Computer Science" }).forEach(doc => printjson(doc));

// Get one student by ID (replace with an actual _id from your collection)
var someId = db.students.findOne({ name: "Arjun" })._id;
print("Student with specific ID:");
printjson(db.students.findOne({ _id: someId }));

// --------------------
// UPDATE - Modify Students
// --------------------

// Update one student by ID
db.students.updateOne(
    { _id: someId },
    { $set: { age: 22 } }
);
print("Updated Arjun's age to 22");

// Update multiple students (add 'passed' field)
db.students.updateMany(
    { age: { $gte: 21 } },
    { $set: { passed: true } }
);
print("Marked students aged 21 or older as passed");

// --------------------
// DELETE - Remove Students
// --------------------

// Delete one student by ID
db.students.deleteOne({ _id: someId });
print("Deleted student Arjun");

// Delete multiple students by course
db.students.deleteMany({ course: "Civil" });
print("Deleted all Civil course students");

// --------------------
// Final state of the collection
// --------------------
print("Final Students Collection:");
db.students.find().forEach(doc => printjson(doc));
