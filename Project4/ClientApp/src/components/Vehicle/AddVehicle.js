import React, { Component, useEffect, useState} from 'react'
import axios from 'axios'
import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const defaultImageSrc = '/img/image_placeholder.png'
const initialFieldValues = {
    year: '',
    type: '',
    brand: '',
    color: '',
    price: '',
    availabilityDate: '',
    plateNo: '',
    ownerId: '',
    status: 'Available',
    vpath: '',
    imageSrc: defaultImageSrc,
    imageFile: null

}
const AddVehicle = () => {
    const [values, setValues] = useState(initialFieldValues)
    const [isLoggedIn, setIsLoggedIn] = useState(
        JSON.parse(localStorage.getItem("logstatus"))
    );
    const [formErrors, setFormErrors] = useState({});
    const [ownerId, setOwnerId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
        setOwnerId(JSON.parse(localStorage.getItem("userid")));
    }, [isLoggedIn, navigate]);


    const handleSubmit = () => {
        const errors = {};
        if (!values.year) {
            errors.year = "Please enter a year.";
        } else if (values.year.toString().length < 4) {
            errors.year = "Year must be at least 4 digits.";
        }
        if (!values.type) {
            errors.type = "Please enter a type.";
        }
        if (!values.brand) {
            errors.brand = "Please enter a brand.";
        }
        if (!values.color) {
            errors.color = "Please enter a color.";
        }
        if (!values.price) {
            errors.price = "Please enter a price.";
        }
        if (!values.availabilityDate) {
            errors.availabilityDate = "Please enter an availability date.";
        }
        if (!values.plateNo) {
            errors.plateNo = "Please enter a plate number.";
        }
        if (!values.imageSrc) {
            errors.imageSrc = "Please upload a photo.";
        }
        const today = new Date();
        const selectedDate = new Date(values.availabilityDate);

        if (selectedDate < today) {
            errors.availabilityDate = "Selected date cannot be behind current date.";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const formData = new FormData()
        formData.append("year", values.year);
        formData.append("type", values.type);
        formData.append("brand", values.brand);
        formData.append("color", values.color);
        formData.append("price", values.price);
        formData.append("availabilitydate", values.availabilityDate);
        formData.append("ownerid", ownerId);
        formData.append("plateno", values.plateNo);
        formData.append("status", values.status);
        formData.append('vpath', values.vpath)
        formData.append('imageFile', values.imageFile)
        formData.append('imageSrc', values.imageSrc)
        axios
            .post("https://localhost:7075/api/Vehicles/", formData)
            .then((res) => {
                console.log(res.data);
                toast.success("Vehicle added successfully!");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to add vehicle.");
            });
    };

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })

    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormErrors((errors) => ({
            ...errors,
            [name]: value ? "" : `Please enter a ${name}.`,
        }));
        switch (name) {
            case "year":
                handleInputChange(event);
                break;
            case "type":
                handleInputChange(event);
                break;
            case "brand":
                handleInputChange(event);
                break;
            case "color":
                handleInputChange(event);
                break;
            case "price":
                handleInputChange(event);
                break;
            case "availabilityDate":
                handleInputChange(event);
                break;
            case "plateNo":
                handleInputChange(event);
                break;
            default:
                break;
        }
    };
      

  return (
      <>
        <ToastContainer />

        <div className="card mx-auto">
          <div className="card-body">
            <h5 className="card-title">Car Details</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className={`form-control ${formErrors.year ? "is-invalid" : ""}`}
                      id="year"
                      name="year"
                      placeholder="Enter year"
                      required
                      value={values.year}
                      onChange={handleChange}
                    />
                    <label htmlFor="year">Year</label>
                    {formErrors.year && (
                      <div className="invalid-feedback">{formErrors.year}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${formErrors.type ? "is-invalid" : ""}`}
                      id="type"
                      name="type"
                      placeholder="Enter type"
                      required
                      value={values.type}
                      onChange={handleChange}
                    />
                    <label htmlFor="type">Type</label>
                    {formErrors.type && (
                      <div className="invalid-feedback">{formErrors.type}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${formErrors.brand ? "is-invalid" : ""}`}
                      id="brand"
                      name="brand"
                      placeholder="Enter brand"
                      required
                      value={values.brand}
                      onChange={handleChange}
                    />
                    <label htmlFor="brand">Brand</label>
                    {formErrors.brand && (
                      <div className="invalid-feedback">{formErrors.brand}</div>
                    )}
                  </div>
                </div>
              </div>
       <div className="col-md-6">
         <div className="form-group">
           <div className="form-floating mb-3">
             <input
               type="text"
               className={`form-control ${formErrors.color ? "is-invalid" : ""}`}
               id="color"
               name="color"
               placeholder="Enter color"
               required
               value={values.color}
               onChange={handleChange}
             />
             <label htmlFor="color">Color</label>
             {formErrors.color && (
               <div className="invalid-feedback">{formErrors.color}</div>
             )}
           </div>
         </div>
       </div>
     </div>
     <div className="row">
       <div className="col-md-6">
         <div className="form-group">
           <div className="form-floating mb-3">
             <input
               type="number"
               className={`form-control ${formErrors.price ? "is-invalid" : ""}`}
               id="price"
               name="price"
               placeholder="Enter price"
               required
               value={values.price}
               onChange={handleChange}
             />
             <label htmlFor="price">Price</label>
             {formErrors.price && (
               <div className="invalid-feedback">{formErrors.price}</div>
             )}
           </div>
         </div>
       </div>
       <div className="col-md-6">
         <div className="form-group">
           <div className="form-floating mb-3">
             <input
               type="date"
               className={`form-control ${
                 formErrors.availabilityDate ? "is-invalid" : ""
               }`}
               id="availabilityDate"
               name="availabilityDate"
               placeholder="Enter availability date"
               required
               value={values.availabilityDate}
               onChange={handleChange}
             />
             <label htmlFor="availabilityDate">Availability Date</label>
             {formErrors.availabilityDate && (
               <div className="invalid-feedback">
                 {formErrors.availabilityDate}
               </div>
             )}
           </div>
         </div>
       </div>
     </div>
     <div className="row">
       <div className="col-md-6">
         <div className="form-group">
           <div className="form-floating mb-3">
             <input
               type="text"
               className={`form-control ${
                 formErrors.plateNo ? "is-invalid" : ""
               }`}
               id="plateNo"
               name="plateNo"
               placeholder="Enter plate number"
               required
               value={values.plateNo}
               onChange={handleChange}
             />
             <label htmlFor="plateNo">Plate Number</label>
             {formErrors.plateNo && (
                <div className="invalid-feedback">{formErrors.plateNo}</div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="file"
                  className={`form-control ${
                    formErrors.photo ? "is-invalid" : ""
                  }`}
                  id="photo"
                  name="photo"
                  accept="image/*"
                  required
                  onChange={showPreview}
                />
                <label htmlFor="photo">Photo</label>
                {formErrors.photo && (
                  <div className="invalid-feedback">{formErrors.photo}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Add Vehicle
          </button>
        </div>
      </div>
    </div>
  </>
  
); 
};

export default AddVehicle