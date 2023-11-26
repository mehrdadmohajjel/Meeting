using System;
using System.Collections;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.Home
{
    public class OutputGetMeetingStatistics
    {
        public int YearlyAttend { get; set; }

        public int YearlyApproval { get; set; }

        public int YearlyExpireAction { get; set; }

        public int YearlyActionCount { get; set; }

        public int YearlyActionCountWithTime { get; set; }
    }
}
