const [year, setYear] = useState("");
const [type, setType] = useState("");
const [brand, setBrand] = useState("");
const [color, setColor] = useState("");
const [price, setPrice] = useState("");
const [availabilityDate, setAvailabilityDate] = useState("");
const [plateno, setPlateno] = useState("");
const [ownerid, setOwnerid] = useState("");
const [status, setStatus] = useState("");
const [veliclePhoto, setVeliclePhoto] = useState("");

const [id, setId] = useState("");
const [data, setData] = useState([]);
const loginstatus = JSON.stringify(localStorage.getItem("loginstatus"));
 const navigator=useNavigate();
useEffect(() => {
(async () => await Load())();
},[]);
async function Load() {
const result = await axios.get("https://localhost:7075/api/Vehicles");
setData(result.data);
console.log(result.data);
}

async function save(event) {

event.preventDefault();
try {
  await axios.post("https://localhost:7075/api/Vehicles", {
    
    year: year,
    type: type,
    brand: brand,
    color: color,
    price: price,
    availabilityDate: availabilityDate,
    plateno: plateno,
    ownerid: 1,
    status: status,
    veliclePhoto: veliclePhoto,
    
  });
  alert("Vehicle Registation Successfully");
      setYear("");
      setType("");
      setBrand("");
      setColor("");
      setPrice("");
      setAvailabilityDate("");
      setPlateno("");
      setOwnerid("");
      setStatus("");  
      setVeliclePhoto("");    
 
  Load();
} catch (err) {
  alert(err);
}
}
async function editStudent(data) {
    setYear(data.year);
    setType(data.type);
    setBrand(data.brand);
    setColor(data.color);
    setPrice(data.price);
    setAvailabilityDate(data.availabilityDate);
    setPlateno(data.plateno);
    setOwnerid(data.ownerid);
    setStatus(data.status);
    setVeliclePhoto(data.veliclePhoto);

    setId(data.vid);
  }
 

  async function DeleteStudent(id) {
  await axios.delete("https://localhost:7075/api/Vehicles/" + id);
   alert("Employee deleted Successfully");
   setYear("");
   setType("");
   setBrand("");
   setColor("");
   setPrice("");
   setAvailabilityDate("");
   setPlateno("");
   setOwnerid("");
   setStatus(""); 
   setVeliclePhoto("");     
   Load();
  }
 

  async function update(event) {
    event.preventDefault();
    try {

  await axios.patch("https://localhost:7075/api/Vehicles/"+ data.find((u) => u.id === id).id || id,
        {
            year: year,
            type: type,
            brand: brand,
            color: color,
            price: price,
            availabilityDate: availabilityDate,
            plateno: plateno,
            ownerid: 1,
            status: status,
            veliclePhoto: veliclePhoto,

        }
      );
      alert("Registation Updateddddd");
      setYear("");
   setType("");
   setBrand("");
   setColor("");
   setPrice("");
   setAvailabilityDate("");
   setPlateno("");
   setOwnerid("");
   setStatus("");  
   setVeliclePhoto("");
     
      Load();
    } catch (err) {
      alert(err);
    }
}



const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({});
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get('/api/employees')
      .then(res => setEmployees(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('/api/employees', newEmployee)
      .then(res => setEmployees([...employees, res.data]))
      .catch(err => console.log(err));
  };

  const handleDelete = id => {
    axios.delete(`/api/employees/${id}`)
      .then(res => setEmployees(employees.filter(emp => emp.id !== res.data.id)))
      .catch(err => console.log(err));
  };

  const handleSearch = event => {
    setSearchText(event.target.value);
    axios.get(`/api/employees/${event.target.value}`)
      .then(res => setEmployees(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Employee List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" onChange={handleInputChange} />
        <input type="text" name="lastName" onChange={handleInputChange} />
        <button type="submit">Add Employee</button>
      </form>
      <input type="text" value={searchText} onChange={handleSearch} />
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.firstName} {emp.lastName}
            <button onClick={() => handleDelete(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

/*
public class Vehicle
{
    public int VehicleId { get; set; }
    public int Year { get; set; }
    public string Type { get; set; }
    public string Brand { get; set; }
    public string Color { get; set; }
    public decimal Price { get; set; }
    public int OwnerId { get; set; }
    public DateTime AvailabilityDate { get; set; }
    public string PlateNo { get; set; }
    public string Status { get; set; }
    public byte[] VehiclePhoto { get; set; }
}

public class VehiclesController : ApiController
{
    private readonly IVehicleRepository _vehicleRepository;

    public VehiclesController(IVehicleRepository vehicleRepository)
    {
        _vehicleRepository = vehicleRepository;
    }

    [HttpPost]
    public async Task<IActionResult> CreateVehicle([FromBody] Vehicle vehicle)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _vehicleRepository.CreateVehicle(vehicle);

        return Ok(vehicle);
    }
}

import React, { Component, useEffect, useState} from 'react'
import axios from 'axios'
import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
const AddVehicle = () => {
    const [newVehicle, setNewVehicle] = useState({});
    const [data, setData] = useState([]);
    const [year,setYear] = useState('');
    const [type,setType] = useState('');
    const [brand,setBrand] = useState('');
    const [color,setColor] = useState('');
    const [price,setPrice] = useState('');
    const [availabilityDate,setAvailabilityDate] = useState('');
    const [plateno,setPlateno] = useState('');
    const [ownerid,setOwnerId] = useState('');
    const [status,setStatus] = useState('');
    const loginstatus = JSON.stringify(localStorage.getItem("logstatus"));
    const navigator=useNavigate();
    
useEffect(() => {
  if(loginstatus == "null")
  {
     navigator("/login");
   }
  setOwnerId(JSON.stringify(localStorage.getItem("Userid")));
  
})

      const handleSubmit = () => {
        axios.post("https://localhost:7075/api/Vehicles/", 
        {
          year: year,
          type: type,
          brand: brand,
          color: color,
          price: price,
          ownerid:ownerid,
          availabilitydate: availabilityDate,
          plateno: plateno,
          status: "Available",
          vehiclePhoto: image,
        })
          .then(res => setData([...data, res.data]))
          
          .catch(err => console.log(err));
      };
      
    const [image, setImage] = useState('');
    
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };
    
    return (
      <div class="card">
  <div class="card-body">
    <h5 class="card-title">Car Details</h5>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
        <div className="form-floating mb-3">
          <input type="number" class="form-control " id="year" name="year" placeholder="Enter year" required onChange={(e)=>setYear(e.target.value)} />
          <label for="year">Year</label>
        </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
        <div className="form-floating mb-3">
          <input type="text" class="form-control floating-label" id="type" name="type" placeholder="Enter type" required onChange={(e)=>setType(e.target.value)} />
          <label for="type">Type</label>
        </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
        <div className="form-floating mb-3">
           <input type="text" class="form-control" id="brand" name="brand" placeholder='Enter brand' required onChange={(e)=>setBrand(e.target.value)} />
           <label for="brand">Brand</label>
        </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
        <div className="form-floating mb-3"> 
          <input type="text" class="form-control" id="color" name="color" placeholder='Enter color' required onChange={(e)=>setColor(e.target.value)} />
          <label for="color">Color</label>
          </div>  
        </div>
      </<div class="col-md-6">
        <div class="form-group">
        <div className="form-floating mb-3"> 
          <input type="number" class="form-control" id="price" name="price" placeholder='Enter price' required onChange={(e)=>setPrice(e.target.value)} />
          <label for="price">Price</label>
          </div> 
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
        <div className="form-floating mb-3"> 
          <input type="date" class="form-control" id="availabilityDate" name="availabilityDate" placeholder='Enter availabilityDate' required onChange={(e)=>setAvailabilityDate(e.target.value)} />
          <label for="availabilityDate">Availability Date</label>
          </div> 
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
        <div className="form-floating mb-3"> 
          <input type="text" class="form-control" id="plateno" name="plateno" placeholder='Enter plateno' required onChange={(e)=>setPlateno(e.target.value)} />
          <label for="plateno">Plate No.</label>
          </div> 
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
        <div className="form-floating mb-3"> 
          <input type="text" class="form-control" id="ownerid" name="ownerid" value={ownerid} disabled />
          <label for="ownerid">Owner ID</label>
          </div> 
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
        <div className="form-floating mb-3"> 
          <input type="text" class="form-control" id="status" name="status" value="Avalible" disabled />
          <label for="status">Status</label>
          </div> 
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <input type="file" class="form-control-file" id="vehiclePhoto" name="vehiclePhoto" onChange={handleImageChange} />
        <label for="vehiclePhoto">Vehicle Photo</label>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <button type="submit" class="btn btn-primary" onClick={() =>handleSubmit()}>Save</button>
      </div>
    </div>
  </div>
</div>

    )
  
}

export default AddVehicle

public class VehiclesController : Controller
{
    private readonly IVehicleRepository _vehicleRepository;

    public VehiclesController(IVehicleRepository vehicleRepository)
    {
        _vehicleRepository = vehicleRepository;
    }

    [HttpGet]
    public IActionResult Index()
    {
        var Vehicles = _vehicleRepository.GetAllVehicles();

        return View(Vehicles);
    }

    [HttpGet("{id}")]
    public IActionResult Details(int id)
    {
        var vehicle = _vehicleRepository.GetVehicleById(id);

        return View(vehicle);
    }

    [HttpPost]
    public IActionResult Create([FromBody] Vehicle vehicle)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _vehicleRepository.CreateVehicle(vehicle);

        return RedirectToAction("Index");
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Vehicle vehicle)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _vehicleRepository.UpdateVehicle(id, vehicle);

        return RedirectToAction("Index");
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _vehicleRepository.DeleteVehicle(id);

        return RedirectToAction("Index");
    }
}

*/
