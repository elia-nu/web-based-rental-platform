using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Project4.Models
{
    public class BookingLog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Bid { get; set; }
        public int? Vehid { get; set; }
        public string? Cusid { get; set; }
        public string? Ownid { get; set; }
        public DateOnly? Dateofrent { get; set; }
        public DateOnly? Dateofreturn { get; set; }
        public decimal? Price { get; set; }
        public string? Transaction { get; set; }
        public string? Confirm { get; set; }
    }
}
