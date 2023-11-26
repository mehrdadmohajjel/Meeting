namespace Mohajjel.MeetingSystem.Shared.Models.Output.MeetingManagementReport
{
    public class OutputGetMeetingManagementReportByDate
    {
        public long MeetingId { get; set; }
        public string MeetingNumber { get; set; }
        public long MeetingCategoryId { get; set; }
        public string CategoryTitle { get; set; }
        public string Subject { get; set; }
        public string Agenda { get; set; }
        public string Type { get; set; }
        public string MeetingPersianDate { get; set; }
        public long MeetingPlaceId { get; set; }
        public string MeetingPlaceName { get; set; }
        public int DepartmentId { get; set; }
        public string UnitCode { get; set; }
        public string DepartmentTitle { get; set; }
        public string DabirName { get; set; }
        public int ApprovalCount { get; set; }
        public int ActionsCount { get; set; }
        public int UnDoneCount { get; set; }

    }
}
