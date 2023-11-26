using System;
using System.Data;
using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.ReceivedTranscript
{
    public class InputGetMeetingTranscriptListByDate
    {
        public int UserId { get; set; }

        [StoredProcedureParameter(SqlDbType = SqlDbType.Date)]
        public DateTime StartDate { get; set; }

        [StoredProcedureParameter(SqlDbType = SqlDbType.Date)]
        public DateTime EndDate { get; set; }
    }
}