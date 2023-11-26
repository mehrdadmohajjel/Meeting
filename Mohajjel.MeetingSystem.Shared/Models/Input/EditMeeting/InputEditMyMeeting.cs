using Mohajjel.MeetingSystem.Shared.Attributes;
using System;
using System.Data;
using Mohajjel.MeetingSystem.Shared.Models.Input.AddMeeting;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.EditMeeting
{
    public class InputEditMyMeeting
    {
        [StoredProcedureParameter(SqlDbType = SqlDbType.Structured)]
        public MeetingPeopleList[] MeetingPeopleList { get; set; }

        public long MeetingId { get; set; }

        public long MeetingCategoryId { get; set; }

        [StoredProcedureParameter(Size = 250)]
        public string Subject { get; set; }

        [StoredProcedureParameter(Size = 500)]
        public string Agenda { get; set; }

        public int Type { get; set; }

        public DateTime MeetingDate { get; set; }

        public long MeetingPlaceId { get; set; }

        public int DepartmentId { get; set; }

        public int UserId { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }
    }
}
