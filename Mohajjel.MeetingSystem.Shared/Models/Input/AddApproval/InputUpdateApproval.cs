using System;
using System.Web.Mvc;
using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.AddApproval
{
    public class InputUpdateApproval
    {
        public int UserId { get; set; }

        public long MeetingApprovalId { get; set; }

        public string MeetingApprovalDescription { get; set; }
    }
}