using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Shared.Enums;
using Mohajjel.MeetingSystem.Shared.Models.Base;
using Mohajjel.MeetingSystem.Shared.Models.DomainModels;
using Mohajjel.MeetingSystem.Shared.Models.Input.AddMeeting;
using Mohajjel.MeetingSystem.Shared.Models.Output.AddMeeting;
using Mohajjel.MeetingSystem.Shared.Models.Output.ManageMyMeetings;
using Mohajjel.MeetingSystem.Shared.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class AddMeetingController: BaseController
    {
        public ActionResult CategoryCombo()
        {
            const string partialViewUrl = "~/Views/AddMeeting/MeetingBaseInfo/CategoryCombo.cshtml";
            var dataSource = ApiList.GetAllMeetingCategory();
            return PartialView(partialViewUrl, dataSource);
        }

        public ActionResult DepartmentCombo()
        {
            var dataSource = ApiList.GetAllMainDepartment();
            const string partialViewUrl = "~/Views/AddMeeting/MeetingBaseInfo/DepartmentCombo.cshtml";

            return PartialView(partialViewUrl, dataSource);
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PlaceCombo()
        {
            const string partialViewUrl = "~/Views/AddMeeting/MeetingBaseInfo/PlaceCombo.cshtml";
            var dataSource = ApiList.GetAllMeetingPlace();
            return PartialView(partialViewUrl, dataSource);
        }

        public ActionResult UserGrid(InputGetEmployeeListByUserTypeForMeeting input)
        {
            const string partialViewUrl = "~/Views/AddMeeting/MeetingUserInfo/UserGrid.cshtml";
            var token = GetUserToken();

            if(input.UserType == UserEnumType.OutsideUserTypeValue)
            {
                return PartialView(partialViewUrl);
            }

            var dataSource = ApiList.GetEmployeeListByUserTypeForMeeting(input, token);
            return PartialView(partialViewUrl, dataSource);
        }

        public ActionResult SaveMeeting(tbl_Meeting meetingItem, MeetingPeople[] invitedUsers, string persianMeetingDate)
        {
            var invitedUserError = "کاربری برای ثبت شرکت در جلسه انتخاب نشده است";
            if(invitedUsers.Length == 0)
            {
                throw new AlertException(invitedUserError);
            }

            meetingItem.MeetingDate = Tools.ConvertToLatinDate(persianMeetingDate);
            meetingItem.CreationDateTime = DateTime.Now;
            meetingItem.MeetingNumber = GenerateMeetingNumber(meetingItem.MeetingCategoryId);

            var saveManager = new InputFinilizeNewMeeting()
            {
                MeetingCategoryId = meetingItem.MeetingCategoryId,
                DepartmentId = meetingItem.DepartmentId,
                Agenda = meetingItem.Agenda,
                EndTime = meetingItem.EndTime,
                MeetingDate = meetingItem.MeetingDate,
                MeetingNumber = meetingItem.MeetingNumber,
                MeetingPeopleList = ConvertInvitedUserList(invitedUsers),
                MeetingPlaceId = meetingItem.MeetingPlaceId,
                StartTime = meetingItem.StartTime,
                Subject = meetingItem.Subject,
                Type = meetingItem.Type,
                UserId = GetCurrentUser().UserID

            };
            var token = GetUserToken();

            var apiResult = ApiList.FinilizeNewMeeting(saveManager, token);
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

        private static string GenerateMeetingNumber(long categoryId)
        {
            var input = new InputGetMeetingNumberByMeetingCategoryId()
            {
                MeetingCategoryId = categoryId
            };
            var categoryLastMeetingNumber = ApiList.GetMeetingNumberByMeetingCategoryId(input);
            return categoryLastMeetingNumber.MeetingNumber.ToString();
        }

    }
}