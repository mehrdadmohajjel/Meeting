namespace Mohajjel.MeetingSystem.Shared.Models.Output.AddAction
{
    public class OutputGetUserActiveMeeting
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

        public string ShowName { get; set; }

        public string MeetingFaDate { get; set; }
    }
}
