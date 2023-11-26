using System;
using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.ManageMyMeetings
{
    public class InputAddNewMeetingTranscript
    {
        public long MeetingId { get; set; }

        public int ReciverUserId { get; set; }

        public int SenderUserId { get; set; }

        [StoredProcedureParameter(Size = 500)]
        public string Description { get; set; }
    }
}