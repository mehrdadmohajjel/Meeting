using System.Data;
using Mohajjel.MeetingSystem.Shared.Attributes;
using Mohajjel.MeetingSystem.Shared.Models.DomainModels;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.AddAction
{
    public class InputAddUploadAttachmentToMeetingApprovalAction
    {
        public long MeetingApprovalActionId { get; set; }

        [StoredProcedureParameter(SqlDbType = SqlDbType.Structured)]
        public Tbl_FileDetailsList[] FileDetails { get; set; }

        public int UserId { get; set; }

        [IgnoreInStoredProcedureParameters]
        public string[] Base64Values { get; set; }

        [IgnoreInStoredProcedureParameters]
        public string[] FileExtensions { get; set; }
    }
}