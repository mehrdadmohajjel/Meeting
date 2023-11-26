using Mohajjel.MeetingSystem.Shared.Enums;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.EditMeeting
{
    public class InputGetEmployeeListByUserTypeAndMeetingIdForMeeting
    {
        public UserEnumType UserType { get; set; }

        public int? DepartmentId { get; set; }

        public long MeetingId { get; set; }
    }
}