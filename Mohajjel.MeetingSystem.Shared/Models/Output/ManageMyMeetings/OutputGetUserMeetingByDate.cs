namespace Mohajjel.MeetingSystem.Shared.Models.Output.ManageMyMeetings
{
    public class OutputGetUserMeetingByDate
    {
        public long MeetingId { get; set; }

        public string MeetingNumber { get; set; }

        public string MeetingCategoryName { get; set; }

        public string Subject { get; set; }

        public string Agenda { get; set; }

        public string TypeName { get; set; }

        public string MeetingDate { get; set; }

        public string MeetingPlaceName { get; set; }

        public string DepartmentName { get; set; }

        public string CreationDateTime { get; set; }

        public bool IsLocked { get; set; }

        public string PersianCreationDateTime { get; set; }
    }
}