using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Project4.Models
{
    public class Vehicle
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Vid { get; set; }
        public string? Year { get; set; }
        public string? Type { get; set; }
        public string? Brand { get; set; }
        public string? Color { get; set; }
        public decimal? Price { get; set; }
        public DateTime? AvailabilityDate { get; set; }
        public string? Ownerid { get; set; }
        public string? Plateno { get; set; }
        public string? Status { get; set; }
        public string? Vpath { get; set; }

        [NotMapped]
        public IFormFile? ImageFile { get; set; }

        [NotMapped]
        public string? ImageSrc { get; set; }
    }
}
