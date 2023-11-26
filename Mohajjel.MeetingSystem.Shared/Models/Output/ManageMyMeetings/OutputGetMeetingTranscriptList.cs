using System;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.ManageMyMeetings
{
    public class OutputGetMeetingTranscriptList
    {
        public long MeetingTranscriptId { get; set; }

        public long MeetingId { get; set; }

        public string MeetingNumber { get; set; }

        public string Subject { get; set; }

        public string Description { get; set; }

        public int ReciverUserId { get; set; }

        public DateTime CreationDateTime { get; set; }

        public string ReciverName { get; set; }

        public int SenderUserId { get; set; }

        public string PersianCreationDate { get; set; }
    }
}