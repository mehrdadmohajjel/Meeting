using System;
using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.ManageMyMeetings
{
    public class InputAddMeetingNewObservation
    {
        public long MeetingId { get; set; }

        public int UserId { get; set; }
    }
}