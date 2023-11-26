using Mohajjel.MeetingSystem.Shared.Enums;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.AddMeeting
{
    public class InputGetEmployeeListByUserTypeForMeeting
    {
        public UserEnumType UserType { get; set; }

        public int? DepartmentId { get; set; }
    }
}