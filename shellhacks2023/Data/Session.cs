using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace shellhacks2023.Data
{
    public class Session
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public User Student { get; set; }

        [ForeignKey(nameof(User))]
        public Guid StudentId { get; set; }

        public Exam Exam { get; set; }
        [ForeignKey(nameof(Data.Exam))]
        public Guid ExamId { get; set; }

    }
}
