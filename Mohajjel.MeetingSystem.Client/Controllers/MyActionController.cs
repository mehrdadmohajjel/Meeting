using System.Web.Mvc;
using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Shared.Enums;
using Mohajjel.MeetingSystem.Shared.Models.Input.MyAction;
using Mohajjel.MeetingSystem.Shared.Utilities;


namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class MyActionController: BaseController
    {
        public ActionResult Index() => View();

        public ActionResult FillActionGrid(InputGetUsersActionsList input, 
            string persianStartDate, string persianEndDate, DatePeriodType datePeriodType = DatePeriodType.RecentMonth)
        {
            const string partialViewUrl = "~/Views/MyAction/Grid/MyActionGrid.cshtml";

            (input.StartDate, input.EndDate) = Tools.NormalizeDates(persianStartDate, persianEndDate, datePeriodType);
            input.UserId = GetCurrentUser().UserID;

            var usersActionsDataSource = ApiList.GetUsersActionsList(input);

            return PartialView(partialViewUrl, usersActionsDataSource);
        }
    }
}