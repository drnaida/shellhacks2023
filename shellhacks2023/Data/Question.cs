using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace shellhacks2023.Data
{
    public class Question
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string Text { get; set; } = default!;

        public Exam Exam { get; set; } = default!;
        public Guid ExamId { get; set; }
    }
}
