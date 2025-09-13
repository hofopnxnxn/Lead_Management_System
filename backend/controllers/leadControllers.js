// export const leadControllers = async (req, res) => {
//   const page = parseInt(req.query.page, 10) || 1;
//   let limit = parseInt(req.query.limit, 10) || 20;
//   if (limit > 100) limit = 100; // Enforce max limit [cite: 52]

//   const offset = (page - 1) * limit;

//   try {
//     // This query fetches the data for the current page
//     const leads = await YourDatabaseModel.findMany({
//       skip: offset,
//       take: limit,
//     });

//     // This query gets the total count of all leads
//     const totalLeads = await YourDatabaseModel.count();

//     // The response format matches the frontend's expectation
//     res.status(200).json({
//       data: leads, // Used for `rowData`
//       total: totalLeads, // Used for `rowCount`
//       page: page,
//       limit: limit,
//       totalPages: Math.ceil(totalLeads / limit),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
