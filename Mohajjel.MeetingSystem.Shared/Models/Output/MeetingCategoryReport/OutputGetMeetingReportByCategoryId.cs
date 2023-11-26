namespace Mohajjel.MeetingSystem.Shared.Models.Output.MeetingCategoryReport
{
    public class OutputGetMeetingReportByCategoryId
    {
        public long MeetingId { get; set; }

        public string MeetingNumber { get; set; }

        public long MeetingCategoryId { get; set; }

        public string Subject { get; set; }

        public string Agenda { get; set; }

        public int Type { get; set; }

        public string MeetingDate { get; set; }

        public long MeetingPlaceId { get; set; }

        public string PlaceName { get; set; }

        public string CategoryName { get; set; }

        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; }

        public string PeopleName { get; set; }

        public bool IsDabir { get; set; }

        public string PersianMeetingDate { get; set; }
    }
}