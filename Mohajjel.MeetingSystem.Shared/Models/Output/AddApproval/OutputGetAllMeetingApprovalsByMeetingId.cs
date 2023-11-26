using System;
using System.Web.Mvc;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.AddApproval
{
    public class OutputGetAllMeetingApprovalsByMeetingId
    {
        public long MeetingApprovalId { get; set; }

        public long MeetingId { get; set; }

        public string Description { get; set; }

        public DateTime DeadlineDate { get; set; }

        public int ResponsibleUserId { get; set; }

        public string ResponsiblePeopleName { get; set; }

        public string AttachmentFileName { get; set; }

        public DateTime CreationDateTime { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ChartTitle { get; set; }

        public string DepartmentName { get; set; }

        public int EmployeeEId { get; set; }

        public string DeadlineFaDate { get; set; }

        public bool IsDeleted { get; set; }

        public string PersianCreationDateTime { get; set; }
    }
}