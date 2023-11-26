namespace Mohajjel.MeetingSystem.Shared.Models.Output.AddMeeting
{
    public class OutputGetCategoryDetailByCategoryId
    {
        public long MeetingCategoryId { get; set; }
        public int DepartmentId { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }

    }
}
