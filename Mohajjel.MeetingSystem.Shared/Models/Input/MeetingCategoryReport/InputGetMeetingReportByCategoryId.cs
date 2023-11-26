using System;
using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.MeetingCategoryReport
{
    public class InputGetMeetingReportByCategoryId
    {
        public long MeetingCategoryId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}