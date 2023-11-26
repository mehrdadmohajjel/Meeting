using System;
using System.Web.Mvc;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.EditMeeting
{
    public class OutputGetAllAttendPeopleByMeetingId
    {
        public long MeetingPeopleId { get; set; }

        public long MeetingId { get; set; }

        public int UserId { get; set; }

        public string PeopleName { get; set; }

        public bool IsOptional { get; set; }

        public bool IsDabir { get; set; }

        public int EId { get; set; }

        public string FName { get; set; }

        public string LName { get; set; }

        public long MeetingPeopleStatusTypeId { get; set; }

        public string ShowName { get; set; }

        public string DepartmentName { get; set; }

        public int DepartmentId { get; set; }

        public long DepartmentChartId { get; set; }
    }
}