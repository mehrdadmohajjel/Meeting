using System;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.ReceivedTranscript
{
    public class OutputGetMeetingTranscriptListByDate
    {
        public long MeetingTranscriptId { set; get; }

        public long MeetingId { set; get; }

        public string MeetingNumber { set; get; }

        public string Subject { set; get; }

        public DateTime MeetingDate { set; get; }

        public string Description { get; set; }

        public int ReciverUserId { get; set; }

        public DateTime CreationDateTime { get; set; }

        public string ReciverName { get; set; }

        public int SenderUserId { get; set; }

        public string SenderName { get; set; }

        public string MeetingCategoryName { get; set; }

        public string PersianCreationDateTime { set; get; }

        public string PersianMeetingDate { set; get; }
    }
}