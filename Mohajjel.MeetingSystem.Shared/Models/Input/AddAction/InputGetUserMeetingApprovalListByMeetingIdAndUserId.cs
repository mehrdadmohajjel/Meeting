using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.AddAction
{
    public class InputGetUserMeetingApprovalListByMeetingIdAndUserId
    {
        public long MeetingId { get; set; }

        public int UserId { get; set; }
    }
}