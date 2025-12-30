const adminService = require("../services/adminService");

exports.fetchUser = async (req, res) => {
    try {
        const userData = await adminService.fetchUser();
        res.status(200).json(userData);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log('Add User Request:', { name, email, password, role });
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }
        
        const newUser = await adminService.addUser({ name, email, password, role });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Add User Error:', error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await adminService.deleteUser(id);
        res.status(200).json(result);
    } catch (error) {
        console.error('Delete User Error:', error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const { status, date, page = 1, limit = 5 } = req.query;
        const { orders, total } = await adminService.fetchOrders({ status, date, page: Number(page), limit: Number(limit) });
        const totalPages = Math.ceil(total / Number(limit || 5)) || 1;
        res.status(200).json({ data: orders, page: Number(page), limit: Number(limit), total, totalPages });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }
        const updated = await adminService.updateOrderStatus(id, status);
        res.status(200).json(updated);
    } catch (error) {
        res.status(error.statusCode || 400).json({ message: error.message });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        const analytics = await adminService.getAnalytics();
        res.status(200).json(analytics);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
