using System;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.MeetingPlace
{
    public class OutputGetAllMeetingPlace
    {
        public long MeetingPlaceId { get; set; }

        public string Name { get; set; }

        public DateTime CreateDateTime { get; set; }

        public bool IsDeleted { get; set; }
    }
}
