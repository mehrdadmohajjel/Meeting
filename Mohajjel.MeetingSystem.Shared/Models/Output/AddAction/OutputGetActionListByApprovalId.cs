using System.Web.Mvc;

namespace Mohajjel.MeetingSystem.Shared.Models.Output.AddAction
{
    public class OutputGetActionListByApprovalId
    {
        public long MeetingApprovalActionId { get; set; }

        public long MeetingApprovalId { get; set; }

        public string Description { get; set; }

        public int UserId { get; set; }

        public string UserFullName { get; set; }

        public string CreationDateTime { get; set; }
    }
}
