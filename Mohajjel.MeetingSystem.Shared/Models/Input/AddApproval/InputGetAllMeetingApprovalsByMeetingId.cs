using System.Web.Mvc;
using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.AddApproval
{
    public class InputGetAllMeetingApprovalsByMeetingId
    {
        public long MeetingId { get; set; }
    }
}