using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Project4.Data;
using Project4.Models;

namespace Project4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public VehiclesController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/Vehicles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
        {
          if (_context.Vehicles == null)
          {
              return NotFound();
          }
            return await _context.Vehicles.ToListAsync();
        }

        // GET: api/Vehicles/5
        [HttpGet("{Ownerid}")]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicle(string Ownerid)
        {
          if (_context.Vehicles == null)
          {
              return NotFound();
          }
            var vehicle = await _context.Vehicles.Where(e => e.Ownerid.Contains(Ownerid)).ToListAsync();

            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle;
        }

        [HttpGet("Detail/{vid}")]
        public async Task<ActionResult<Vehicle>> GetDetailVehicle(int Vid)
        {
            if (_context.Vehicles == null)
            {
                return NotFound();
            }
            var vehicle = await _context.Vehicles.FindAsync(Vid);

            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle;
        }
        [HttpGet("Available")]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetAvailableVehicle()
        {
            if (_context.Vehicles == null)
            {
                return NotFound();
            }
            var vehicle = await _context.Vehicles.Where(e => e.Status == "Available").ToListAsync();

            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle;
        }
        // PUT: api/Vehicles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicle(int id, Vehicle vehicle)
        {
            if (id != vehicle.Vid)
            {
                return BadRequest();
            }

            _context.Entry(vehicle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Vehicles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
       
         public async Task<ActionResult<Vehicle>> AddVehicle([FromForm] Vehicle vehicle)
        {
            vehicle.Vpath = await SaveImage(vehicle.ImageFile);
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        // DELETE: api/Vehicles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            if (_context.Vehicles == null)
            {
                return NotFound();
            }
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }
            DeleteImage(vehicle.Vpath);
            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Vehicle>>> SearchVehicleByData(string search, DateTime date)
        {
                return await _context.Vehicles.Where(e => ((e.Brand.Contains(search) || e.Type.Contains(search))&& e.AvailabilityDate >= date) && e.Status == "Available").ToListAsync();   
        }

        private bool VehicleExists(int id)
        {
            return (_context.Vehicles?.Any(e => e.Vid == id)).GetValueOrDefault();
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_env.ContentRootPath, "ClientApp/public/Image", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_env.ContentRootPath, "Images", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}


