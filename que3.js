// Use the database (creates ecommerceDB if it doesn't exist)
use ecommerceDB;

// --------------------
// CREATE - Insert Products with Nested Variants
// --------------------
db.products.insertMany([
    {
        name: "T-Shirt",
        price: 500,
        category: "Clothing",
        variants: [
            { color: "Red", size: "M", stock: 50 },
            { color: "Blue", size: "L", stock: 30 },
            { color: "Green", size: "S", stock: 20 }
        ]
    },
    {
        name: "Sneakers",
        price: 3000,
        category: "Footwear",
        variants: [
            { color: "White", size: 9, stock: 10 },
            { color: "Black", size: 10, stock: 5 }
        ]
    },
    {
        name: "Laptop",
        price: 75000,
        category: "Electronics",
        variants: [
            { color: "Silver", storage: "256GB", stock: 5 },
            { color: "Space Gray", storage: "512GB", stock: 2 }
        ]
    }
]);

print("Products with nested variants inserted successfully!");

// --------------------
// READ - Fetch Products
// --------------------

// Get all products
print("All Products:");
db.products.find().forEach(doc => printjson(doc));

// Filter products by category
print("Clothing Products:");
db.products.find({ category: "Clothing" }).forEach(doc => printjson(doc));

// Project specific fields (only name and variants)
print("Product Names with Variants:");
db.products.find({}, { name: 1, variants: 1, _id: 0 }).forEach(doc => printjson(doc));

// Get all variants for a specific product
var tshirt = db.products.findOne({ name: "T-Shirt" });
print("T-Shirt Variants:");
printjson(tshirt.variants);

// --------------------
// UPDATE - Modify Nested Variants
// --------------------

// Update stock of a specific variant (T-Shirt, Red, M)
db.products.updateOne(
    { name: "T-Shirt", "variants.color": "Red", "variants.size": "M" },
    { $set: { "variants.$.stock": 45 } }
);
print("Updated stock of T-Shirt Red M to 45");

// Add a new variant to Sneakers
db.products.updateOne(
    { name: "Sneakers" },
    { $push: { variants: { color: "Blue", size: 8, stock: 7 } } }
);
print("Added new variant to Sneakers");

// --------------------
// DELETE - Remove Variants
// --------------------

// Remove a specific variant from T-Shirt
db.products.updateOne(
    { name: "T-Shirt" },
    { $pull: { variants: { color: "Green", size: "S" } } }
);
print("Removed Green S variant from T-Shirt");

// Delete a product completely
db.products.deleteOne({ name: "Laptop" });
print("Deleted Laptop product");

// --------------------
// Final state of the collection
// --------------------
print("Final Products Collection:");
db.products.find().forEach(doc => printjson(doc));
