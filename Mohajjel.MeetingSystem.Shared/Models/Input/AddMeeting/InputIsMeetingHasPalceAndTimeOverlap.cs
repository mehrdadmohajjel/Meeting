using System;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.AddMeeting
{
    public class InputIsMeetingHasPalceAndTimeOverlap
    {
        public long MeetingId { get; set; }
        public string MeetingNumber { get; set; }
        public long MeetingCategoryId { get; set; }
        public DateTime MeetingDate { get; set; }
        public long MeetingPlaceId { get; set; }
        public int DepartmentId { get; set; }
        public DateTime CreationDateTime { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }
}
