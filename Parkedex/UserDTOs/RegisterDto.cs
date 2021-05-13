using System.ComponentModel.DataAnnotations;

namespace API.UserDTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*-]).{8,32}$", 
            ErrorMessage="Password must include uppercase, lowercase, number, and a special character, minimum 8 characters. Please try again.")]
        public string Password { get; set; }
    }
}
