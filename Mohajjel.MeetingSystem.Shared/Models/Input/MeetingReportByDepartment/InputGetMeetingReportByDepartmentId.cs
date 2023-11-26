using System;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.MeetingReportByDepartment
{
    public class InputGetMeetingReportByDepartmentId
    {
        public int DepartmentId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
