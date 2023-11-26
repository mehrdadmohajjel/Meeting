using System;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.Home
{
    public class OutputGetMeetingApprovalForEachUserByUserId
    {
        public string MeetingNumber { get; set; }

        public string Subject { get; set; }

        public string Agenda { get; set; }

        public string Title { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime DeadlineDate { get; set; }

        public int ResponsibleUserId { get; set; }

        public string ResponsiblePeopleName { get; set; }

        public long MeetingApprovalId { get; set; }

        public bool HasTime { get; set; }

        public string PersianDeadlineDate { get; set; }
    }
}
