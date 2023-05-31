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
            email.From.Add(MailboxAddress.Parse("monica.kihn25@ethereal.email"));
            email.To.Add(MailboxAddress.Parse(email1));
            email.Subject = "booking";
            email.Body = new TextPart(TextFormat.Html)
            {
                Text = "dear " + user +
                "have booking from " + d1 + " to " + d2 +
                "sdwdaedjqdiqodn djkqwdnoqwidmqw;dqw qw dqd qd qdd" + body + "doqdm;qwkp;l;d"
            };
            using var smtp = new SmtpClient();
            smtp.Connect("smtp.ethereal.email", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("monica.kihn25@ethereal.email", "pPhafpb7TEWR57e9H9");
            smtp.Send(email);
            smtp.Disconnect(true);
            return Ok();
        }
    }
}
