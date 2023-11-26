using System;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.ManageMyMeetings
{
    public class OutputGetMeetingObservationListByMeetingId
    {
        public long MeetingObservationListId { get; set; }

        public long MeetingId { get; set; }

        public int UserId { get; set; }

        public DateTime CreationDateTime { get; set; }

        public string UserName { get; set; }

        public string MeetingNumber { get; set; }

        public string PersianCreationDate { get; set; }
    }
}