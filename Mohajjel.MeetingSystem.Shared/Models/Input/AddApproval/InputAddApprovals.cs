using System;
using System.Web.Mvc;
using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.AddApproval
{
    public class InputAddApprovals
    {
        public int SenderUserId { get; set; }

        public int? ReceiverUserId { get; set; }

        public long MeetingId { get; set; }

        public string Description { get; set; }

        public DateTime DeadlineDate { get; set; }

        public int? ResponsibleUserId { get; set; }

        [StoredProcedureParameter(Size = 250)]
        public string ResponsiblePeopleName { get; set; }

        public int MessageType { get; set; }
    }
}