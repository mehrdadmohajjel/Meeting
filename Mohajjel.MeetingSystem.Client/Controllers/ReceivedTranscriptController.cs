using System.Web.Mvc;
using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Shared.Enums;
using Mohajjel.MeetingSystem.Shared.Models.Input.ReceivedTranscript;
using Mohajjel.MeetingSystem.Shared.Utilities;


namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class ReceivedTranscriptController: BaseController
    {
        public ActionResult Index() => View();

        public ActionResult FillReceivedTranscriptGrid(InputGetMeetingTranscriptListByDate input, 
            string persianStartDate, string persianEndDate, DatePeriodType datePeriodType = DatePeriodType.CurrentDay)
        {
            const string partialViewUrl = "~/Views/ReceivedTranscript/Grid/MyReceivedTranscriptGrid.cshtml";

            (input.StartDate, input.EndDate) = Tools.NormalizeDates(persianStartDate, persianEndDate, datePeriodType);
            input.UserId = GetCurrentUser().UserID;

            var usersActionsDataSource = ApiList.GetMeetingTranscriptListByDate(input);

            return PartialView(partialViewUrl, usersActionsDataSource);
        }
    }
}