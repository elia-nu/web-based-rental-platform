using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project4.Data;
using Project4.Models;

namespace Project4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Userid)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
          if (_context.Users == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Users'  is null.");
          }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Userid }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPost("Login")]
        public async Task<ActionResult<User>> userlogin(LoginModel model)
        {
            var user = await _context.Users.Where(e => e.Email == model.Email && e.Password == model.Password ).ToListAsync();
            if (user == null)
            {
                // Return an error message if the user credentials are invalid
                return BadRequest("Invalid username or password");
            }
            return Ok(user);
        }
        public class LoginModel
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
        [HttpGet("Confirm/{confirm}")]
        public async Task<ActionResult<IEnumerable<User>>> ConfirmData(string confirm)
        {
            return await _context.Users.Where(e => e.Role.Contains(confirm)).ToListAsync();
        }


        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Userid == id)).GetValueOrDefault();
        }
        [HttpPost ("forgotpassword")]
        public async Task<IActionResult> Post([FromBody] ForgotPasswordRequest request)
        {
            // Here, you would perform a check to see if the provided
            // username and email are valid. If they are valid, you would
            // send a password reset email to the provided email address
            // with a link to reset their password.

            bool isValid = await CheckCredentialsAsync(request.Username, request.Email);

            if (isValid)
            {
                return Ok(new { isValid = true });
            }
            else
            {
                return BadRequest("Invalid credentials");
            }
        }

        private async Task<bool> CheckCredentialsAsync(string username, string email)
        {
            var user = await _context.Users.Where(e => e.Email.Contains(email) && e.Username.Contains(username)).ToListAsync();
            if (user == null)
            {
                // Return an error message if the user credentials are invalid
                return false;
            }
            return true;
        }
    }

    public class ForgotPasswordRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
    }
}
