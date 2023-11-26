using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Client.Filters;
using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingPlace;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class MeetingPlaceController : BaseController
    {
        // GET: MeetingPlace
        [AccessToFormValidation(FormCode = "005")]
        public ActionResult Index() => View();

        public ActionResult AddPlace(InputAddPlace input)
        {
            var token = GetUserToken();

            var apiResult = ApiList.AddPlace(input, token);
            return Content(apiResult);
        }

        public ActionResult EditMeetingPlace(InputEditMeetingPlace input)
        {
            var token = GetUserToken();

            var apiResult = ApiList.EditMeetingPlace(input, token);
            return Content(apiResult);
        }

        public ActionResult DeleteMeetingPlace(InputDeleteMeetingPlace input)
        {
            var token = GetUserToken();

            var apiResult = ApiList.DeleteMeetingPlace(input, token);
            return Content(apiResult);
        }

        public ActionResult MeetingPlaceGrid()
        {
            const string partialViewUrl = "~/Views/MeetingPlace/Grid/MeetingPlaceGrid.cshtml";

            var dataSource = ApiList.GetAllMeetingPlace();

            return PartialView(partialViewUrl, dataSource);
        }

        public ActionResult EditMeetingPlacePartail()
        {
            const string partialViewUrl = "~/Views/MeetingPlace/EditForm/EditFormPartail.cshtml";


            return PartialView(partialViewUrl);
        }
        
    }
}