using System;
using System.Web.Mvc;
using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.AddApproval
{
    public class InputMeetingApprovalListFromDb
    {
        public long? MeetingId { get; set; }

        public string Description { get; set; }

        public DateTime? DeadlineDate { get; set; }

        public string PersianCreationDateTime { get; set; }

        public int? ResponsibleUserId { get; set; }

        public string ResponsiblePeopleName { get; set; }

        public string Firstname { get; set; }

        public string LastName { get; set; }

        public long MeetingApprovalId { get; set; }

        public int MessageType { get; set; }
    }
}