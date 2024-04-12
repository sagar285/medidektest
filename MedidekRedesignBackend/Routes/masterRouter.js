import express from 'express'
import { hospitalprofileupdate, addDoctorbyhospital, getdoctorbytheirid, editDoctorbyhospital,deleteimage,
    uplodimage,
    AddStaff, editStaff, alldoctorandstaffforhospital, getSingleDoctor, getSingleStaff, alldoctors, statusupdatedoctortoremove, getHotspitalsDoctorForHomeScreen, getHotspitalsByIdAndTheirsDoctors, getAllHospitalsWithAllQuery, updatedoctorimgurl, allstaff } from '../Controller/Master.js';
import { requireUser } from '../Middleware/requireUser.js';
const masterRouter = express.Router();
import multer from "multer";
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// hopital managment

masterRouter.post("/master",deleteimage)
masterRouter.post("/masterupload",upload.single("image"),uplodimage)
masterRouter.put('/master/:id', requireUser, upload.single("image"), hospitalprofileupdate);
masterRouter.post("/getdoctorinfo", requireUser, getdoctorbytheirid)
masterRouter.post('/addDoctor/:hospitalid', requireUser, upload.single("image"), addDoctorbyhospital)
masterRouter.put('/editDoctor/:hospitalid', requireUser, upload.single("image"), editDoctorbyhospital)
masterRouter.post("/addstaff", requireUser, upload.single("image"), AddStaff);
masterRouter.put("/editstaff/:id", requireUser, upload.single("image"), editStaff)
masterRouter.get("/alldoctorandstaff/:hospid", requireUser, alldoctorandstaffforhospital);
masterRouter.get("/getAlldoctor/:hospid", requireUser, alldoctors);
masterRouter.get("/singledoctor/:id", requireUser, getSingleDoctor)
masterRouter.get("/singlestaff/:id", requireUser, getSingleStaff)
masterRouter.put("/updateDoctorStatusToRemove/:doctorid", requireUser, statusupdatedoctortoremove)
masterRouter.get("/getAllHospitalsWithAllQuery", getAllHospitalsWithAllQuery)
masterRouter.get("/getHotspitalsDoctorForHomeScreen", getHotspitalsDoctorForHomeScreen)
masterRouter.get("/getHospitalByIdAndTheirsDoctors/:hospitalId", getHotspitalsByIdAndTheirsDoctors)
masterRouter.post("/updateimgurl",updatedoctorimgurl);
masterRouter.get("/allstaff",requireUser,allstaff)

export { masterRouter } 