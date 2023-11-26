namespace Mohajjel.MeetingSystem.Shared.Models.Output.AddMeeting
{
    public class OutputGetMeetingAttendanceList
    {
        public long DepartmentId { get; set; }

        public string DepartmentName { get; set; }

        public string FullName { get; set; }

        public int EId { get; set; }

        public int UserId { get; set; }
    }
}
