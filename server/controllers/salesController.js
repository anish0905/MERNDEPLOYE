const asyncHandler = require('express-async-handler');
const Sales = require('../models/salesModel');

// @desc    Get all Sales
// @route   GET /api/sales
// @access  Public
const getSales = asyncHandler(async (req, res) => {
    const sales = await Sales.find({ user_id: req.userExecutive.id });
    res.status(200).json(sales);
});

// @desc    Get single Sale by ID
// @route   GET /api/sales/:id
// @access  Public
const getSaleById = asyncHandler(async (req, res) => {
    const sale = await Sales.findById(req.params.id);
    if (!sale) {
        res.status(404).json({ error: 'Sale not found' });
        return;
    }
    res.status(200).json(sale);
});

// @desc    Create a new Sale
// @route   POST /api/sales
// @access  Public
const createSale = asyncHandler(async (req, res) => {
    const { email_Id, date, time, order_qty, state, city, ProductName, price_per_unit, totalPrice } = req.body;
    console.log(email_Id, date, time, order_qty, state, city, ProductName, price_per_unit, totalPrice)
    
    if (!email_Id || !date || !time || !order_qty || !state || !city || !ProductName || !price_per_unit || !totalPrice) {
        res.status(400).json({ error: 'All fields are mandatory' });
        return;
    }

    const sale = await Sales.create({
        user_id: req.userExecutive.id, // Set user_id based on logged-in user
        email_Id,
        date,
        time,
        order_qty,
        state,
        city,
        ProductName,
        price_per_unit,
        totalPrice
    });
    console.log(sale)

    res.status(201).json(sale);
});

// @desc    Update a Sale by ID
// @route   PUT /api/sales/:id
// @access  Public
const updateSale = asyncHandler(async (req, res) => {
    try {
        const sale = await Sales.findById(req.params.id);
        if (!sale) {
            res.status(404).json({ error: 'Sale not found' });
            return;
        }
        if (sale.user_id.toString() !== req.userExecutive.id) {
            res.status(403).json({ error: "User doesn't have permission to update other user's sales" });
            return;
        }
        const updatedSale = await Sales.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedSale);
    } catch (error) {
        console.error('Error updating sale:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @desc    Delete a Sale by ID
// @route   DELETE /api/sales/:id
// @access  Public
const deleteSale = asyncHandler(async (req, res) => {
    try {
        const sale = await Sales.findById(req.params.id);
        if (!sale) {
            res.status(404).json({ error: 'Sale not found' });
            return;
        }
        if (sale.user_id.toString() !== req.userExecutive.id) {
            res.status(403).json({ error: "User doesn't have permission to delete other user's sales" });
            return;
        }
        await Sales.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
        console.error('Error deleting sale:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = {
    getSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
};