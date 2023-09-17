using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace shellhacks2023.Data
{
    public class Answer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        
        public Session Session { get; set; }
        [ForeignKey(nameof(Data.Session))]
        public Guid SessionId { get; set; }

        public string Text { get; set; } = default!;
        public string Feedback { get; set; } = default!;

        public Question Question { get; set; } = default!;
        [ForeignKey(nameof(Data.Question))]
        public Guid QuestionId { get; set; }
    }
}
