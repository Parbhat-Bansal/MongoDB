// Use the database (will create if not exists)
use productDB;

// --------------------
// CREATE - Insert Products
// --------------------
db.products.insertMany([
    { name: "Laptop", price: 75000, category: "Electronics" },
    { name: "Phone", price: 30000, category: "Electronics" },
    { name: "Book", price: 500, category: "Stationery" },
    { name: "Table", price: 2500, category: "Furniture" }
]);

print("Products inserted successfully!");

// --------------------
// READ - Fetch Products
// --------------------

// Get all products
print("All Products:");
db.products.find().forEach(doc => printjson(doc));

// Get products filtered by category
print("Electronics Products:");
db.products.find({ category: "Electronics" }).forEach(doc => printjson(doc));

// Get one product by ID (replace with an actual _id from your collection)
var someId = db.products.findOne({ name: "Laptop" })._id;
print("Product with specific ID:");
printjson(db.products.findOne({ _id: someId }));

// --------------------
// UPDATE - Modify Products
// --------------------

// Update one product by ID
db.products.updateOne(
    { _id: someId },
    { $set: { price: 70000 } }
);
print("Updated Laptop price to 70000");

// Update multiple products (set onSale = true for all Electronics)
db.products.updateMany(
    { category: "Electronics" },
    { $set: { onSale: true } }
);
print("Marked all Electronics as on sale");

// --------------------
// DELETE - Remove Products
// --------------------

// Delete one product by ID
db.products.deleteOne({ _id: someId });
print("Deleted Laptop product");

// Delete multiple products by category
db.products.deleteMany({ category: "Stationery" });
print("Deleted all Stationery products");

// Final state of the collection
print("Final Products Collection:");
db.products.find().forEach(doc => printjson(doc));
