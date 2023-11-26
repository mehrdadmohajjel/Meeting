using DevExpress.Web.Mvc;
using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using Mohajjel.MeetingSystem.Client.Filters;

namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class MeetingCategoryController : BaseController
    {
        [AccessToFormValidation(FormCode = "004")]
        public ActionResult Index() => View();

        public ActionResult AddNewCategory(InputAddNewCategory input)
        {
            var token = GetUserToken();

            var apiResult = ApiList.AddNewCategory(input, token);
            return Content(apiResult);
        }

        public ActionResult EditCategory(InputEditCategory input)
        {
            var token = GetUserToken();

            var apiResult = ApiList.EditCategory(input, token);
            return Content(apiResult);
        }

        public ActionResult EditCategoryPartail()
        {
            const string partialViewUrl = "~/Views/MeetingCategory/EditForm/EditForm.cshtml";

            return PartialView(partialViewUrl);
        }

        public ActionResult DeleteMeetingCategory(InputDeleteMeetingCategory input)
        {
            var token = GetUserToken();

            var apiResult = ApiList.DeleteMeetingCategory(input, token);
            return Content(apiResult);
        }

        public ActionResult MeetingCategoryGird()
        {
            const string partialViewUrl = "~/Views/MeetingCategory/Grid/MeetingCategoryGrid.cshtml";

            var dataSource = ApiList.GetAllMeetingCategory();

            return PartialView(partialViewUrl, dataSource);
        }
        public JsonResult GenerateCategoryCode()
        {
            if(DevExpressHelper.IsCallback)
            { Thread.Sleep(100); }
            var lastCode = NewCategoryCode();
            ViewBag.CategoryCodeNumber = lastCode;
            return Json(lastCode);
        }
        public string NewCategoryCode()
        {
            var LastNumber = ApiList.GetLastCategoryCode();
            string serial;
            if(string.IsNullOrEmpty(LastNumber.LasteCategoryCode) || string.IsNullOrWhiteSpace(LastNumber.LasteCategoryCode))
            {
                serial = "000";
            }
            else
            {
                serial = (Convert.ToInt32(LastNumber.LasteCategoryCode) + 1).ToString("000");
            }

            return serial.Trim();
        }
        public ActionResult GetDepartmentList()
        {
            const string partialViewUrl = "~/Views/MeetingCategory/AddForm/AddFormDepartmentListCombo.cshtml";
            var source = ApiList.GetAllMainDepartment();

            return PartialView(partialViewUrl,source);
        }
        public ActionResult GetDepartmentListForEdit()
        {
            const string partialViewUrl = "~/Views/MeetingCategory/EditForm/EditFormDepartmentListCombo.cshtml";
            var source = ApiList.GetAllMainDepartment();

            return PartialView(partialViewUrl, source);

        }

    }
}