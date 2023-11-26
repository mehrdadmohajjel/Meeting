namespace Mohajjel.MeetingSystem.Shared.Models.Output.MeetingCategory
{
    public class OutputGetAllMainDepartment
    {
        public int DepartmentId { get; set; }

        public int UnitCode { get; set; }

        public string Title { get; set; }

        public int ParentUnitCode { get; set; }

        public bool IsDeleted { get; set; }
    }
}
