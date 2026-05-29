import { Customer } from "../models/customerSchema.js";

// POST /api/v1/customer/login
export const loginCustomer = async (req, res) => {
  try {
    // req.customer is set by isCustomerAuthenticated middleware
    if (!req.customer) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    return res.status(200).json({
      success: true,
      message: "Customer Logged In Successfully",
      customer: req.customer,
    });
  } catch (error) {
    console.log("❌ LOGIN CONTROLLER ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/customer/profile
export const getCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer._id).populate("purchasedProjects");
    return res.status(200).json({ success: true, customer });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/customer/check-purchase/:id
export const checkPurchase = async (req, res) => {
  try {
    if (!req.customer) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const customer = await Customer.findById(req.customer._id);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    const isPurchased = customer.purchasedProjects.some(
      (id) => id.toString() === req.params.id
    );

    return res.status(200).json({ success: true, purchased: isPurchased });
  } catch (error) {
    console.log("❌ CHECK PURCHASE ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};