const dashboardService = require("../services/dashboard.service");

async function getDashboardStats(req,res,next){
    try {
        const result = await dashboardService.getDashboardStats();
console.log(result);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getDashboardStats,
}