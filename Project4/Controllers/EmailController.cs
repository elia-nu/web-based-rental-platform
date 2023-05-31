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
                "sdwdaedjqdiqodn djkqwdnoqwidmqw;dqw qw dqd qd qdd" + body + "uyhvwiucbjerndgg"
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
