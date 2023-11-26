using Mohajjel.MeetingSystem.Shared.Attributes;
using System;
using System.Data;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.AddMeeting
{
    public class InputFinilizeNewMeeting
    {
        public string MeetingNumber { get; set; }
        public long MeetingCategoryId { get; set; }
        public string Subject { get; set; }
        public string Agenda { get; set; }
        public int Type { get; set; }
        public DateTime MeetingDate { get; set; }
        public long MeetingPlaceId { get; set; }
        public int DepartmentId { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int UserId { get; set; }
        [StoredProcedureParameter(SqlDbType = SqlDbType.Structured)]
        public MeetingPeopleList[] MeetingPeopleList { get; set; }

    }
}
