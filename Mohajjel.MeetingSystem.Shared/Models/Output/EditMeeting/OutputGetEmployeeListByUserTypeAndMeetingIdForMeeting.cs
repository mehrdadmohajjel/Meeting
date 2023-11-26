namespace Mohajjel.MeetingSystem.Shared.Models.Output.EditMeeting
{
    public class OutputGetEmployeeListByUserTypeAndMeetingIdForMeeting
    {
        public long DepartmentChartId { get; set; }

        public string FullName { get; set; }

        public string DepartmentName { get; set; }

        public int EId { get; set; }

        public int UserId { get; set; }

        public bool IsSelected { get; set; }
    }
}
