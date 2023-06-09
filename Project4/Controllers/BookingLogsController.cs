﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit.Text;
using MimeKit;
using Project4.Data;
using Project4.Models;
using MailKit.Net.Smtp;


namespace Project4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingLogsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingLogsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BookingLogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingLog>>> GetBookingLog()
        {
          if (_context.BookingLog == null)
          {
              return NotFound();
          }
            return await _context.BookingLog.ToListAsync();
        }

        // GET: api/BookingLogs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookingLog>> GetBookingLog(int id)
        {
          if (_context.BookingLog == null)
          {
              return NotFound();
          }
            var bookingLog = await _context.BookingLog.FindAsync(id);

            if (bookingLog == null)
            {
                return NotFound();
            }

            return bookingLog;
        }

        // PUT: api/BookingLogs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookingLog(int id, BookingLog bookingLog)
        {
            if (id != bookingLog.Bid)
            {
                return BadRequest();
            }

            _context.Entry(bookingLog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingLogExists(id))
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

        // POST: api/BookingLogs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookingLog>> PostBookingLog(BookingLog bookingLog)
        {
          if (_context.BookingLog == null)
          {
              return Problem("Entity set 'ApplicationDbContext.BookingLog'  is null.");
          }
            _context.BookingLog.Add(bookingLog);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookingLog", new { id = bookingLog.Bid }, bookingLog);
        }

        // DELETE: api/BookingLogs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookingLog(int id)
        {
            if (_context.BookingLog == null)
            {
                return NotFound();
            }
            var bookingLog = await _context.BookingLog.FindAsync(id);
            if (bookingLog == null)
            {
                return NotFound();
            }

            _context.BookingLog.Remove(bookingLog);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("Confirm/{confirm}")]
        public async Task<ActionResult<IEnumerable<BookingLog>>> ConfirmData(string confirm)
        {
            return await _context.BookingLog.Where(e => e.Confirm.Contains(confirm)).ToListAsync();
        }
        [HttpGet("Cusid/{cusid}")]
        public async Task<ActionResult<IEnumerable<BookingLog>>> GetDataByCusid(string cusid)
        {
            return await _context.BookingLog.Where(e => e.Cusid.Contains(cusid)).ToListAsync();
        }
        [HttpGet("Ownid/{ownid}")]
        public async Task<ActionResult<IEnumerable<BookingLog>>> GetDataByOwnid(string ownid)
        {
            return await _context.BookingLog.Where(e => e.Ownid.Contains(ownid)).ToListAsync();
        }
        private bool BookingLogExists(int id)
        {
            return (_context.BookingLog?.Any(e => e.Bid == id)).GetValueOrDefault();
        }
        [HttpPost("Email")]
        public IActionResult SendEmail(string body, string user, string email1, string d1, string d2)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("rowsa2000@gmail.com"));
            email.To.Add(MailboxAddress.Parse(email1));
            email.Subject = "booking";
            email.Body = new TextPart(TextFormat.Html)
            {
                Text = "dear " + user +
                "have booking from " + d1 + " to " + d2 +
                "sdwdaedjqdiqodn djkqwdnoqwidmqw;dqw qw dqd qd qdd" + body + "doqdm;qwd"
            };
            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("rowsa2000@gmail.com", "uyhvwiucbjerndgg");
            smtp.Send(email);
            smtp.Disconnect(true);
            return Ok();
        }
    }
}
