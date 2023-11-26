using System;
using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.ManageMyMeetings
{
    public class InputGetAllUsersList
    {
        public int PageCount { get; set; }

        public long Skip { get; set; }

        [StoredProcedureParameter(Size = 200)]
        public string FilterKeyWord { get; set; }
    }
}