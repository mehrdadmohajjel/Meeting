using System;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.ManageMyMeetings
{
    public class OutputGetAllUsersList
    {
        public long? DepartmentId { get; set; }
        public int? UnitCode { get; set; }
        public string Title { get; set; }
        public int? ParentUnitCode { get; set; }
        public string ChartTitle { get; set; }
        public string PostCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? EId { get; set; }
        public int? UserId { get; set; }
        public int? EmployeeId { get; set; }
    }
}