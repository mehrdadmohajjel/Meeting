using System;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.MeetingCategory
{
    public class OutputGetDepartmentCategoryList
    {
        public long MeetingCategoryId { get; set; }
        public int DepartmentId { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }
        public DateTime CreationDateTime { get; set; }
        public bool IsDeleted { get; set; }
    }
}
