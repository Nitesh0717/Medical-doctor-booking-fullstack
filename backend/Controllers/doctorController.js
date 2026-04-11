import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Review from "../models/ReviewSchema.js";


// UPDATE DOCTOR
export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updatedDoctor,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to update",
    });

  }
};



// DELETE DOCTOR
export const deleteDoctor = async (req, res) => {

  const id = req.userId;

  try {

    await Booking.deleteMany({ doctor: id });

    await Review.deleteMany({ doctor: id });

    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
      data: deletedDoctor
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });

  }

};



// GET SINGLE DOCTOR
export const getSingleDoctor = async (req, res) => {

  const id = req.params.id;

  try {

    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Doctor found",
      data: doctor
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Doctor not found"
    });

  }

};



// GET ALL DOCTORS (WITHOUT SEARCH)
export const getAll = async (req, res) => {

  try {

    const doctors = await Doctor.find().select("-password");

    res.status(200).json({
      success: true,
      message: "Doctors found",
      data: doctors
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};



// GET ALL DOCTORS WITH SEARCH
export const getAllDoctors = async (req, res) => {

  try {

    const { query } = req.query;

    let doctors;

    if (query) {

      doctors = await Doctor.find({

        $or: [

          { name: { $regex: query, $options: "i" } },

          { specialization: { $regex: query, $options: "i" } }

        ]

      }).select("-password");

    }

    else {

      doctors = await Doctor.find().select("-password");

    }


    res.status(200).json({

      success: true,

      message: "Doctors found",

      data: doctors

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message: "Failed to fetch doctors"

    });

  }

};



// GET DOCTOR PROFILE
export const getDoctorProfile = async (req, res) => {

  const doctorId = req.userId;

  try {

    const doctor = await Doctor.findById(doctorId).select("-password");

    if (!doctor) {

      return res.status(404).json({

        success: false,

        message: "Doctor not found"

      });

    }


    const appointments = await Booking.find({

      doctor: doctorId,

      status: "approved"

    });


    res.status(200).json({

      success: true,

      message: "Profile info",

      data: {

        ...doctor._doc,

        appointments

      }

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message: "Something went wrong"

    });

  }

};



// UPDATE DOCTOR APPROVAL STATUS
export const updateDoctorStatus = async (req, res) => {

  try {

    const { doctorId } = req.params;

    const { isApproved } = req.body;


    const updatedDoctor = await Doctor.findByIdAndUpdate(

      doctorId,

      { isApproved },

      { new: true }

    ).select("-password");


    if (!updatedDoctor) {

      return res.status(404).json({

        success: false,

        message: "Doctor not found"

      });

    }


    res.status(200).json({

      success: true,

      message: "Doctor status updated",

      data: updatedDoctor

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message: "Server error"

    });

  }

};
