using System;

namespace Mohajjel.MeetingSystem.Shared.Models.DomainModels
{
    public class tbl_Meeting
    {
        public long MeetingId { get; set; }
        public string MeetingNumber { get; set; }
        public long MeetingCategoryId { get; set; }
        public string Subject { get; set; }
        public string Agenda { get; set; }
        public int Type { get; set; }
        public DateTime MeetingDate { get; set; }
        public long MeetingPlaceId { get; set; }
        public int DepartmentId { get; set; }
        public DateTime CreationDateTime { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string RealEndTime { get; set; }
        public string RealStartTime { get; set; }
    }
}
