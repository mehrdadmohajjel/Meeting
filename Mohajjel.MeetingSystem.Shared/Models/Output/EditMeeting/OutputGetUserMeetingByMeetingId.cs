using System;
using System.Web.Mvc;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.EditMeeting
{
    public class OutputGetUserMeetingByMeetingId
    {
        public long MeetingId { get; set; }

        public string MeetingNumber { get; set; }

        public long MeetingCategoryId { get; set; }

        public string Subject { get; set; }

        public string Agenda { get; set; }

        public int Type { get; set; }

        public DateTime MeetingDate { get; set; }

        public long MeetingPlaceId { get; set; }

        public int DepartmentId { get; set; }

        public DateTime CreationDateTime { get; set; }

        public bool IsDeleted { get; set; }

        public string ShowName { get; set; }

        public long MeetingStatusTypeId { get; set; }

        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PeopleName { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }

        public string PersianMeetingDate { set; get; }

        public string PersianCreationDateTime { set; get; }

    }
}