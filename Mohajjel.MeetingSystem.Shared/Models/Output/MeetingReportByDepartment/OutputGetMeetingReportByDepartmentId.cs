namespace Mohajjel.MeetingSystem.Shared.Models.Output.MeetingReportByDepartment
{
    public class OutputGetMeetingReportByDepartmentId
    {
        public long MeetingId { get; set; }
        public string MeetingNumber { get; set; }
        public long MeetingCategoryId { get; set; }
        public string Subject { get; set; }
        public string Agenda { get; set; }
        public long Type { get; set; }
        public string PersianMeetingDate { get; set; }
        public long MeetingPlaceId { get; set; }
        public string PlaceName { get; set; }
        public string CategoryName { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string PeopleName { get; set; }
        public bool IsDabir { get; set; }
    }
}
