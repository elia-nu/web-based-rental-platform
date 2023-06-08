using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project4.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Userid { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? Phonenumber { get; set; }
        public DateTime? Dateofbirth { get; set; }
        public string? Gender { get; set; }
        public string? Driverlicense { get; set; }
        public string? Role { get; set; }
        public string? Username { get; set;}

        public DateTime? SuspendDate { get; set; }
        public string? status { get; set; }

        [NotMapped]
        public IFormFile? Driverlicenses { get; set;}

    }
}
