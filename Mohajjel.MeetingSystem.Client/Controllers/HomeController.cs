using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Shared.Models.Input.Home;
using Mohajjel.MeetingSystem.Shared.Utilities;
using System;
using System.Web.Mvc;

namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            var token = Request.QueryString.Get(JwtKeyName);
            if (IsCookieContainsJwt() && string.IsNullOrEmpty(token))
            {
                SetUserInfoInViewBag();
                return View();
            }

            if (string.IsNullOrWhiteSpace(token))
            {
                ForceUserToLogin();
            }

            SetSessionAndCookie(token);
            SetUserInfoInViewBag();

            return RedirectToAction("Index");
        }

        [Route("~/Forbidden")]
        public ActionResult Forbidden() => View("Forbidden");

        public ActionResult StatisticsIconPartial()
        {
            const string partialViewUrl = "~/Views/Home/StatisticsIconPartial.cshtml";

            var persianCalendar = new System.Globalization.PersianCalendar();
            var year = persianCalendar.GetYear(DateTime.Now);

            var startFaDate = year + "/01/01";
            var startDate = Tools.ConvertToLatinDate(startFaDate);

            var endDate = startDate.AddYears(1);
            endDate = endDate.AddDays(-1);

            var token = GetUserToken();

            var input = new InputGetMeetingStatistics
            {
                StartDate = startDate,
                EndDate = endDate,
                UserId = GetCurrentUser().UserID
            };
            var dataSource = ApiList.GetMeetingStatistics(input, token);

            return PartialView(partialViewUrl, dataSource);
        }

        public ActionResult ResultGrid()
        {
            const string partialViewUrl = "~/Views/Home/ResultGrid.cshtml";

            var token = GetUserToken();
            var input = new InputGetMeetingApprovalForEachUserByUserId
            {
                UserId = GetCurrentUser().UserID
            };

            var dataSource = ApiList.GetMeetingApprovalForEachUserByUserId(input, token);

            return PartialView(partialViewUrl, dataSource);
        }
    }
}