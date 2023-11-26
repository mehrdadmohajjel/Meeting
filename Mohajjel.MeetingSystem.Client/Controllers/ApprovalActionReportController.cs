using System.Web.Mvc;
using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Client.Filters;
using Mohajjel.MeetingSystem.Shared.Enums;
using Mohajjel.MeetingSystem.Shared.Models.Input.MyAction;
using Mohajjel.MeetingSystem.Shared.Utilities;


namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class ApprovalActionReportController: BaseController
    {
        [AccessToFormValidation(FormCode = "008")]
        public ActionResult Index() => View();


        public ActionResult GetAllUserListCombo()
        {
            const string partialViewUrl = "~/Views/Shared/ManageMyMeeting/SendTranscriptReceiverListCombo.cshtml";

            ViewData["Id"] = "getAllUserListCombo";
            ViewData["ControllerName"] = "ApprovalActionReport";
            ViewData["ActionName"] = "GetAllUserListCombo";
            ViewData["JsSpaceName"] = "approvalActionReport";
            ViewData["JsCallbackName"] = "handleGetAllUserListComboChanged";

            return PartialView(partialViewUrl);
        }

        public ActionResult FillApprovalActionReportGrid(InputGetUsersActionsList input, 
            string persianStartDate, string persianEndDate, DatePeriodType datePeriodType)
        {
            const string partialViewUrl = "~/Views/ApprovalActionReport/Grid/ApprovalActionReportGrid.cshtml";

            (input.StartDate, input.EndDate) = Tools.NormalizeDates(persianStartDate, persianEndDate, datePeriodType);

            var usersActionsDataSource = ApiList.GetUsersActionsList(input);

            return PartialView(partialViewUrl, usersActionsDataSource);
        }
    }
}