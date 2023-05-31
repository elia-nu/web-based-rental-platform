using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MimeKit.Text;
using Project4.Models;


namespace Project4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        

        [HttpPost]
        public IActionResult SendEmail(string body)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("zachery.bartoletti43@ethereal.email"));
            email.From.Add(MailboxAddress.Parse("zachery.bartoletti43@ethereal.email"));
            email.Subject = "booking";
            email.Body = new TextPart(TextFormat.Html) { Text = body };
            using var smtp = new SmtpClient();
            smtp.Connect("smtp.ethereal.email", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("zachery.bartoletti43@ethereal.email", "ghXNfZrThVFnG4x6JT");
            smtp.Send(email);
            smtp.Disconnect(true);
            return Ok();
        }
    }
}
