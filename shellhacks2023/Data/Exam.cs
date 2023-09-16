using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace shellhacks2023.Data
{
    public class Exam
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required] 
        public string Title { get; set; } = default!;

        public User Owner { get; set; } = default!;
        [ForeignKey(nameof(User))]
        public Guid OwnerId { get; set; }

        public List<Question> Questions { get; set; } = default!;
        public List<string> Topics { get; set; } = default!;
    }
}
