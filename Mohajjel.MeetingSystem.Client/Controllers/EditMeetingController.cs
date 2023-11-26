using DevExpress.Web.Mvc;
using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Shared.Models.Input.EditMeeting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using Mohajjel.MeetingSystem.Client.Filters;
using Mohajjel.MeetingSystem.Shared.Enums;
using Mohajjel.MeetingSystem.Shared.Models.Base;
using Mohajjel.MeetingSystem.Shared.Models.DomainModels;
using Mohajjel.MeetingSystem.Shared.Models.Input.AddAction;
using Mohajjel.MeetingSystem.Shared.Models.Input.AddMeeting;
using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingCategory;
using Mohajjel.MeetingSystem.Shared.Models.Output.AddMeeting;
using Mohajjel.MeetingSystem.Shared.Utilities;

namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class EditMeetingController: BaseController
    {
        [AccessToFormValidation(FormCode = "001")]
        public ActionResult Index() => View();

        public ActionResult GetDabirActiveMeetingCombo()
        {
            const string partialViewAddress = "~/Views/EditMeeting/MeetingSelectSection/GetDabirActiveMeetingCombo.cshtml";

            var token = GetUserToken();

            var input = new InputGetDabirActiveMeeting()
            {
                UserId = GetCurrentUser().UserID
            };

            var dataSource = ApiList.GetDabirActiveMeeting(input, token);

            return PartialView(partialViewAddress, dataSource);
        }

        public JsonResult GetUserMeetingByMeetingId(InputGetUserMeetingByMeetingId input)
        {
            var token = GetUserToken();
            input.UserId = GetCurrentUser().UserID;

            var apiResult = ApiList.GetUserMeetingByMeetingId(input, token);

            return apiResult != null ? Json(apiResult) : Json("");
        }

        public ActionResult GetAllMainDepartmentCombo()
        {
            const string partialViewUrl = "~/Views/EditMeeting/MeetingInfoSection/GetAllMainDepartmentCombo.cshtml";

            var dataSource = ApiList.GetAllMainDepartment();

            return PartialView(partialViewUrl, dataSource);
        }

        public ActionResult GetAllMeetingCategoryCombo()
        {
            const string partialViewUrl = "~/Views/EditMeeting/MeetingInfoSection/GetAllMeetingCategoryCombo.cshtml";

            var dataSource = ApiList.GetAllMeetingCategory();

            return PartialView(partialViewUrl, dataSource);
        }

        public ActionResult GetAllMeetingPlaceCombo()
        {
            const string partialViewUrl = "~/Views/EditMeeting/MeetingInfoSection/GetAllMeetingPlaceCombo.cshtml";

            var dataSource = ApiList.GetAllMeetingPlace();

            return PartialView(partialViewUrl, dataSource);
        }

        public ActionResult UserGrid(InputGetEmployeeListByUserTypeAndMeetingIdForMeeting input)
        {
            const string partialViewUrl = "~/Views/EditMeeting/MeetingUsersSection/UserGrid.cshtml";

            var token = GetUserToken();

            if(input.UserType == UserEnumType.OutsideUserTypeValue)
            {
                return PartialView(partialViewUrl);
            }

            var dataSource = ApiList.GetEmployeeListByUserTypeAndMeetingIdForMeeting(input, token);

            ViewData["UserType"] = input.UserType;
            ViewData["DepartmentId"] = input.DepartmentId;
            ViewData["MeetingId"] = input.MeetingId;

            return PartialView(partialViewUrl, dataSource);
        }

        public JsonResult LoadInvitedUser(InputGetAllAttendPeopleByMeetingId input)
        {
            var token = GetUserToken();

            var apiResult = ApiList.GetAllAttendPeopleByMeetingId(input, token);

            return apiResult != null ? Json(apiResult) : Json("");
        }

        public ActionResult EditMeeting(tbl_Meeting meetingItem, MeetingPeople[] invitedUsers, string persianMeetingDate)
        {
            const string invitedUserError = "کاربری برای ثبت شرکت در جلسه انتخاب نشده است";

            if(invitedUsers.Length == 0)
            {
                throw new AlertException(invitedUserError);
            }

            meetingItem.MeetingDate = Tools.ConvertToLatinDate(persianMeetingDate);
            meetingItem.CreationDateTime = DateTime.Now;


            var editManager = new InputEditMyMeeting()
            {
                MeetingPeopleList = ConvertInvitedUserList(invitedUsers),
                MeetingId = meetingItem.MeetingId,
                MeetingCategoryId = meetingItem.MeetingCategoryId,
                Subject = meetingItem.Subject,
                Agenda = meetingItem.Agenda,
                Type = meetingItem.Type,
                MeetingDate = meetingItem.MeetingDate,
                MeetingPlaceId = meetingItem.MeetingPlaceId,
                DepartmentId = meetingItem.DepartmentId,
                UserId = GetCurrentUser().UserID,
                StartTime = meetingItem.StartTime,
                EndTime = meetingItem.EndTime,
            };

            var token = GetUserToken();

            var apiResult = ApiList.EditMyMeeting(editManager, token);
            return Content(apiResult);
        }

        public MeetingPeopleList[] ConvertInvitedUserList(MeetingPeople[] invitedUsers)
        {
            var result = new MeetingPeopleList[invitedUsers.Length];
            for(var i = 0; i < invitedUsers.Length; i++)
            {
                var tempInvitedUser = invitedUsers[i];
                var isOutsidedUser = tempInvitedUser.UserId == 0;

                var temp = new MeetingPeopleList
                {
                    IsDabir = tempInvitedUser.Dabir,
                    IsOptional = false,
                    UserId = !isOutsidedUser ? tempInvitedUser.UserId : (int?)null,
                    PeopleName = tempInvitedUser.FullName
                };

                if(isOutsidedUser)
                {
                    temp.PeopleName += string.Format(" ({0})", tempInvitedUser.DepartmentName);
                }

                result[i] = temp;
            }
            return result;
        }

    }
}