const { query } = require('../utils/database')





function calculateAndAddTotalAmount(patientsData) {
    const todayTimestamp = Math.floor(Date.now() / 1000);
    const secondsPerDay = 86400;

    // Process each patient and add total_amount
    const updatedPatientsData = patientsData.map(patient => {
        if (!patient.room1 || !Array.isArray(patient.room1)) {
            return { ...patient, total_amount: 0 };
        }

        // Calculate total for this patient's rooms
        const totalAmount = patient.room1.reduce((patientTotal, room) => {
            if (!room.total || room.start_date === null) {
                return patientTotal;
            }

            const endDate = room.end_date === null ? todayTimestamp : room.end_date;
            const timeDifference = endDate - room.start_date;
            const days = Math.ceil(timeDifference / secondsPerDay);
            const roomCost = days * room.total;

            return patientTotal + roomCost;
        }, 0);

        // Return new object with total_amount added
        return { ...patient, total_amount: totalAmount };
    });

    return updatedPatientsData;
}



// function calculateAndAddTotalAmount(patientsData) {
//     const now = Math.floor(Date.now() / 1000); // current epoch in seconds
//     const SECONDS_IN_HOUR = 3600;
//     const DAILY_RATE = 1000;

//     const updatedPatientsData = patientsData.map(patient => {
//         if (!patient.room1 || !Array.isArray(patient.room1)) {
//             return { ...patient, total_amount: 0 };
//         }

//         const totalAmount = patient.room1.reduce((patientTotal, room) => {
//             if (!room.total || room.start_date === null) {
//                 return patientTotal;
//             }

//             const endTimestamp = room.end_date === null ? now : room.end_date;
//             const startTimestamp = room.start_date;

//             const timeDifferenceInSeconds = endTimestamp - startTimestamp;
//             const hours = timeDifferenceInSeconds / SECONDS_IN_HOUR;

//             let roomCost = 0;
//             if (hours > 12) {
//                 // Charge for full day
//                 roomCost = DAILY_RATE;
//             } else {
//                 // Charge hourly rate (daily rate / 24)
//                 const hourlyRate = DAILY_RATE / 24;
//                 roomCost = Math.ceil(hours * hourlyRate); // rounding up to avoid fractions
//             }
//             console.log("total", patientTotal + roomCost)
//             return patientTotal + roomCost;
//         }, 0);
//         console.log("ammount --------- ", totalAmount)

//         return { ...patient, total_amount: totalAmount };
//     });

//     return updatedPatientsData;
// }



// function calculateRoomBookings(data) {
//     // Get current time in UTC epoch seconds
//     const currentTime = Math.floor(Date.now() / 1000);

//     return data.map(patient => {
//         // Process room1 bookings for the patient
//         const updatedRoom1 = patient.room1.map(booking => {
//             // Extract timestamps and total
//             const startDate = booking.start_date;
//             const endDate = booking.end_date !== null ? booking.end_date : currentTime;
//             const total = booking.total;

//             // Calculate hours
//             const secondsDiff = endDate - startDate;
//             let hours = secondsDiff / 3600; // Convert seconds to hours

//             // Handle negative hours (use absolute value)
//             if (hours < 0) {
//                 hours = Math.abs(hours);
//             }

//             // Apply minimum 1-hour rule
//             if (hours < 1) {
//                 hours = 1.0;
//             }

//             // Calculate amount based on condition
//             let amount;
//             if (hours > 12) {
//                 amount = total; // Use full total amount
//             } else {
//                 // Hourly rate: total is for 24 hours
//                 const hourlyRate = total / 24;
//                 amount = hourlyRate * hours;
//             }

//             // Create updated booking with hours and amount
//             return {
//                 ...booking,
//                 hours: Number(hours.toFixed(2)), // Round to 2 decimal places
//                 total_amount: Number(amount.toFixed(2)) // Round to 2 decimal places
//             };
//         });




//         // Return updated patient record with modified room1
//         return {
//             ...patient,
//             room1: updatedRoom1
//         };
//     });
// }

function calculateRoomBookings(data) {
    // Get current time in UTC epoch seconds
    const currentTime = Math.floor(Date.now() / 1000);

    return data.map(patient => {
        // Process room1 bookings for the patient
        const updatedRoom1 = patient.room1.map(booking => {
            // Extract timestamps and total
            const startDate = booking.start_date;
            const endDate = booking.end_date !== null ? booking.end_date : currentTime;
            const total = booking.total;

            // Calculate hours
            const secondsDiff = endDate - startDate;
            let hours = secondsDiff / 3600; // Convert seconds to hours

            // Handle negative hours (use absolute value)
            if (hours < 0) {
                hours = Math.abs(hours);
            }

            // Apply minimum 1-hour rule
            if (hours < 1) {
                hours = 1.0;
            }

            // Calculate amount based on condition
            let amount;
            if (hours > 12) {
                amount = total; // Use full total amount
            } else {
                // Hourly rate: total is for 24 hours
                const hourlyRate = total / 24;
                amount = hourlyRate * hours;
            }

            // Create updated booking with hours and amount
            return {
                ...booking,
                hours: Number(hours.toFixed(0)), // Round to 2 decimal places
                amount: Number(amount.toFixed(0)) // Round to 2 decimal places
            };
        });

        // Calculate Total_amount as sum of amounts in room1 bookings
        const totalAmount = Number(updatedRoom1.reduce((sum, booking) => sum + booking.amount, 0).toFixed(0));

        // Return updated patient record with modified room1 and Total_amount
        return {
            ...patient,
            room1: updatedRoom1,
            total_amount: totalAmount
        };
    });
}

// function calculateRoomBookings1(data) {
//     // Get current time in UTC epoch seconds
//     const currentTime = Math.floor(Date.now() / 1000);

//     return data.map(patient => {
//         // Process room1 bookings for the patient
//         const updatedRoom1 = patient.room1.map(booking => {
//             // Extract timestamps and total
//             const startDate = booking.start_date;
//             const endDate = booking.end_date !== null ? booking.end_date : currentTime;
//             const total = booking.total;

//             // Calculate hours
//             const secondsDiff = endDate - startDate;
//             let hours = secondsDiff / 3600; // Convert seconds to hours

//             // Handle negative hours (use absolute value)
//             if (hours < 0) {
//                 hours = Math.abs(hours);
//             }

//             // Apply minimum 1-hour rule
//             if (hours < 1) {
//                 hours = 1.0;
//             }

//             // Calculate amount based on condition
//             let amount;
//             if (hours > 12) {
//                 amount = total; // Use full total amount
//             } else {
//                 // Hourly rate: total is for 24 hours
//                 const hourlyRate = total / 24;
//                 amount = hourlyRate * hours;
//             }

//             // Create updated booking with hours and amount
//             return {
//                 ...booking,
//                 hours: Number(hours.toFixed(0)), // Round to 2 decimal places
//                 total: Number(amount.toFixed(0)) // Round to 2 decimal places
//             };
//         });

//         // Calculate Total_amount as sum of amounts in room1 bookings
//         const totalAmount = Number(updatedRoom1.reduce((sum, booking) => sum + booking.amount, 0).toFixed(0));

//         // Return updated patient record with modified room1 and Total_amount
//         return {
//             ...patient,
//             room1: updatedRoom1,
//             total_amount: totalAmount
//         };
//     });
// }







const GetAdmitedPatientBill = async () => {
    try {
        const response = await query("Call GetAdmitPatientsDeposite()");
        const data = calculateAndAddTotalAmount(response[0])
        return data;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const Paydeposite = async (admitedId, amount, date,mode) => {
    try {
        const response = await query("Call AddIPDDeposite(?,?,?,?)", [admitedId, date, amount, mode]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const GetCollectionReportDatewise = async (date) => {
    try {
        const response = await query("Call DaywiseCollectionReport(?)", [date]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const GetopdReportDatewise = async (date) => {
    try {
        const response = await query("Call TodayCollectionReport(?)", [date]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


const addUserAccountant = async (
    degree,
    year_of_graduation,
    name,
    phoneno,
    email_id,
    sex,
    age,
    address,
    city,
    id_proof,
    id_proof_image,
    user_photo,
    role_id,
    username,
    password,
    joining_date,
    created_by,
    shift_id,
    blood_group,
) => {
    try {
        const result = await query(
            "CALL AddAccountant(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                degree,
                year_of_graduation,
                name,
                phoneno,
                email_id,
                sex,
                age,
                address,
                city,
                id_proof,
                id_proof_image,
                user_photo,
                username,
                password,
                joining_date,
                created_by,
                shift_id,
                blood_group
            ]
        );

        return result;
    } catch (error) {
        console.error("Database error:", error);
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            throw new Error(error.message);
        } else {
            throw new Error("Error inserting doctor data.");
        }
    }
};

const GetAdmitedPatientReceipt = async (admited_id) => {
    try {
        const response = await query("Call GetAdmitPatientsReceiptDetails(?)", [admited_id]);
      
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const GetAccountant = async (page, limit) => {
    try {
        const response = await query("CALL GetAllAccountants(?,?)", [page, limit]);
        if (!response || response.length < 2) {
            throw new Error("Unexpected database response format");
        }

        const doctorData = response[0];
        const paginationData = response[1][0];

        return {
            data: doctorData,  // Array of doctors
            pagination: paginationData || {
                TotalRecords: 0,
                TotalPages: 0,
                CurrentPage: page,
                LimitPerPage: limit
            }
        };
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const IpdBill = async (admitedId, amount, payment_method, bill_report, receipt_number, date, userId, discount_amount) => {
    try {
        const response = await query("Call InsertIPDBill(?,?,?,?,?,?,?,?)", [admitedId, amount, payment_method, bill_report, receipt_number, date, userId, discount_amount]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const TodayDischargePatientList = async (date) => {
    try {
        const response = await query("Call GetTodayDischargepatient(?)", [date]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const ChangeAdmitedpatientSatuts = async (admited_id) => {
    try {
        const response = await query("Call UpdateAdmitedpatientStatus(?)", [admited_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};


const PaymentHistorySearch = async (patient_id, page, limit) => {
    try {
        const response = await query("Call GetAllPaymentHistorySearch(?,?,?)", [page, limit, patient_id]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const PaymentHistory = async (page, limit) => {
    try {
        const response = await query("Call GetAllPaymentHistory(?,?)", [page, limit]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};






module.exports = { GetAdmitedPatientBill, Paydeposite, GetCollectionReportDatewise, addUserAccountant, GetAdmitedPatientReceipt, GetAccountant, IpdBill, TodayDischargePatientList, ChangeAdmitedpatientSatuts, GetopdReportDatewise, PaymentHistory, PaymentHistorySearch }

