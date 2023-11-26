using System;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.MyAction
{
    public class OutputGetUsersActionsList
    {
        public long MeetingId { set; get; }

        public string MeetingNumber { set; get; }

        public string CategoryTitle { set; get; }

        public string Agenda { set; get; }

        public DateTime MeetingDate { set; get; }

        public string ApprovalDescription { set; get; }

        public string ResponsiblePeopleName { set; get; }

        public long? ResponsibleUserId { set; get; }

        public DateTime? DeadlineDate { set; get; }

        public long? MeetingApprovalActionId { set; get; }

        public string ApprovalActionDescription { set; get; }

        public long? UserId { set; get; }

        public string ActionUserName { set; get; }

        public string CreationDateTime { set; get; }

        public string PersianCreationDateTime { set; get; }

        public string PersianMeetingDate { set; get; }

        public string PersianDeadlineDate { set; get; }
    }
}