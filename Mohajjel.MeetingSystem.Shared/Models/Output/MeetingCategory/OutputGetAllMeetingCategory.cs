using System;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.MeetingCategory
{
    public class OutputGetAllMeetingCategory
    {
        public long MeetingCategoryId { get; set; }
        public string Title { get; set; }
        public DateTime CreationDateTime { get; set; }
        public bool IsDeleted { get; set; }
        public string Code { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }

    }
}
