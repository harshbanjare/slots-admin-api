const router = require("express").Router();
const Appointment = require("../models/Appointment");
const Business = require("../models/Business");
const Package = require("../models/Package");
const auth = require("../middleware/auth");

// Get overall report with graph data (Protected)
router.get("/overall", auth, async (req, res) => {
  try {
    // Get total number of businesses
    const totalBusinesses = await Business.countDocuments();

    // Get appointments with business details
    const appointments = await Appointment.find()
      .populate("businessid")
      .populate("packageid");
    const totalAppointments = appointments.length;

    // Calculate total revenue and prepare graph data
    let totalRevenue = 0;
    const monthlyRevenue = new Array(12).fill(0);
    const monthlyAppointments = new Array(12).fill(0);

    appointments.forEach((appointment) => {
      const price = parseFloat(appointment.price);
      totalRevenue += price;

      // Add to monthly data
      const month = new Date(appointment.selectedDate).getMonth();
      monthlyRevenue[month] += price;
      monthlyAppointments[month]++;
    });

    // Prepare graph data
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const graphData = months.map((month, index) => ({
      month,
      revenue: Math.round(monthlyRevenue[index] * 100) / 100,
      appointments: monthlyAppointments[index],
    }));

    res.json({
      totalBusinesses,
      totalAppointments,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      graphData,
      revenueStats: {
        highest: Math.max(...monthlyRevenue),
        lowest: Math.min(...monthlyRevenue.filter((rev) => rev > 0)) || 0,
        average:
          totalRevenue / months.filter((_, i) => monthlyRevenue[i] > 0).length,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error generating overall report",
      error: error.message,
    });
  }
});

// Get business-specific report with graph data (Protected)
router.get("/:businessid", auth, async (req, res) => {
  try {
    const businessId = req.params.businessid;

    // Check if business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    // Get appointments for this business
    const appointments = await Appointment.find({
      businessid: businessId,
    }).populate("packageid");
    const totalAppointments = appointments.length;

    // Initialize data structures for revenue calculations
    let totalRevenue = 0;
    const monthlyRevenue = new Array(12).fill(0);
    const serviceRevenue = {};
    business.services.forEach((service) => {
      serviceRevenue[service] = {
        total: 0,
        monthly: new Array(12).fill(0),
      };
    });

    // Calculate revenues
    for (const appointment of appointments) {
      const price = parseFloat(appointment.price);
      totalRevenue += price;

      // Add to monthly data
      const month = new Date(appointment.selectedDate).getMonth();
      monthlyRevenue[month] += price;

      // Add to service revenue using package name
      if (appointment.packageid && appointment.packageid.packageName) {
        const service = appointment.packageid.packageName;
        if (!serviceRevenue[service]) {
          serviceRevenue[service] = {
            total: 0,
            monthly: new Array(12).fill(0),
          };
        }
        serviceRevenue[service].total += price;
        serviceRevenue[service].monthly[month] += price;
      }
    }

    // Prepare graph data
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const graphData = months.map((month, index) => ({
      month,
      revenue: Math.round(monthlyRevenue[index] * 100) / 100,
      serviceBreakdown: Object.keys(serviceRevenue).reduce((acc, service) => {
        acc[service] =
          Math.round(serviceRevenue[service].monthly[index] * 100) / 100;
        return acc;
      }, {}),
    }));

    res.json({
      businessName: business.businessName,
      totalAppointments,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      graphData,
      serviceRevenue: Object.keys(serviceRevenue).reduce((acc, service) => {
        acc[service] = Math.round(serviceRevenue[service].total * 100) / 100;
        return acc;
      }, {}),
      revenueStats: {
        highest: Math.max(...monthlyRevenue),
        lowest: Math.min(...monthlyRevenue.filter((rev) => rev > 0)) || 0,
        average:
          totalRevenue / months.filter((_, i) => monthlyRevenue[i] > 0).length,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error generating business report",
      error: error.message,
    });
  }
});

module.exports = router;
