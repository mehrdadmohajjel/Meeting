using System;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.Calendar
{
    public class OutputGetSpecialDay
    {
        public long CalendarId { set; get; }

        public int Year { set; get; }

        public int Month { set; get; }

        public int Week { set; get; }

        public int Day { set; get; }

        public string FaDate { set; get; }

        public DateTime EnDate { set; get; }

        public bool IsHoliday { set; get; }

        public int HolidayTypeId { set; get; }

        public string DayDescription { set; get; }

        public string WeekDayName { set; get; }
    }
}
