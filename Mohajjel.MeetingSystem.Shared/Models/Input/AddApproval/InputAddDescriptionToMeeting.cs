using System;
using System.Web.Mvc;
using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.AddApproval
{
    public class InputAddDescriptionToMeeting
    {
        public int UserId { get; set; }

        public long MeetingId { get; set; }

        [StoredProcedureParameter(Size = 4000)]
        public string Description { get; set; }
    }
}