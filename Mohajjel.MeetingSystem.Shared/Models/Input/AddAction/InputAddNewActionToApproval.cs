using System.Web.Mvc;
using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.AddAction
{
    public class InputAddNewActionToApproval
    {
        public long ApprovalId { get; set; }

        [AllowHtml]
        [StoredProcedureParameter(Size = 5000)]
        public string Description { get; set; }

        public int UserId { get; set; }
    }
}