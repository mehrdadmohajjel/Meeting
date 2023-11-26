namespace Mohajjel.MeetingSystem.Shared.Models.Output.MeetingManagementReport
{
    public class OutputGetUserDepartmentList
    {
        public int UserId { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public int EId { get; set; }
        public string UnitCode { get; set; }
        public string ChartTitle { get; set; }
        public int DepartmentId { get; set; }
        public string ParentsUnitCode { get; set; }
        public int ParentDepartmentId { get; set; }
    }
}
