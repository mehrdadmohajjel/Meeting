using System;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.MeetingManagementReport
{
    public class InputGetMeetingManagementReportByDate
    {
        public int DepartmentId { get; set; }
        public int Type { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
