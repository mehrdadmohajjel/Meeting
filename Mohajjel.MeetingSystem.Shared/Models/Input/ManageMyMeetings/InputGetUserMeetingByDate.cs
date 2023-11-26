using System;
using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.ManageMyMeetings
{
    public class InputGetUserMeetingByDate
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int UserId { get; set; }
    }
}