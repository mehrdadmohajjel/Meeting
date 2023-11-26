namespace Mohajjel.MeetingSystem.Shared.Models.Output.AddAction
{
    public class OutputGetUserMeetingApprovalListByMeetingIdAndUserId
    {
        public long MeetingApprovalId { get; set; }

        public long MeetingId { get; set; }

        public string Description { get; set; }

        public string DeadlineDate { get; set; }

        public int ResponsibleUserId { get; set; }

        public string ResponsiblePeopleName { get; set; }

        public string AttachmentFileName { get; set; }

        public string CreationDateTime { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ChartTitle { get; set; }

        public string Title { get; set; }

        public string EmployeeEId { get; set; }

        public string FarsiDeadlineDate { get; set; }
    }
}