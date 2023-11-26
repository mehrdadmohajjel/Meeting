using System;
using System.Linq;
using Mohajjel.MeetingSystem.Api.Business;
using Mohajjel.MeetingSystem.Api.Filters;
using System.Web.Http;
using Mohajjel.MeetingSystem.Shared.Models.Input.EditMeeting;
using Mohajjel.MeetingSystem.Shared.Models.Output.EditMeeting;

namespace Mohajjel.MeetingSystem.Api.Controllers
{
    [RoutePrefix("EditMeeting")]
    public class EditMeetingController : ApiController
    {
        private readonly BusinessManager _businessManager = new BusinessManager();


        /// <summary>
        /// لیست جلسات فعال کاربر 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetDabirActiveMeeting")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        [JwtValidation]
        public IHttpActionResult GetDabirActiveMeeting(InputGetDabirActiveMeeting input)
        {
            const string storedProcedureName = "[HRS].[prc_GetDabirActiveMeeting]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetDabirActiveMeeting,
                        OutputGetDabirActiveMeeting[]>(storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        /// دریافت جلسات ثبت شده کاربر
        /// </summary>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetUserMeetingByMeetingId")]
        [HttpPost]
        public IHttpActionResult GetUserMeetingByMeetingId(InputGetUserMeetingByMeetingId input)
        {
            const string storedProcedureName = "[HRS].[prc_GetUserMeetingByMeetingID]";

            var result =
                _businessManager.CallStoredProcedure<InputGetUserMeetingByMeetingId,
                    OutputGetUserMeetingByMeetingId>(storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        /// دریافت افراد حاضر در جلسه
        /// </summary>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetAllAttendPeopleByMeetingId")]
        [HttpPost]
        public IHttpActionResult GetAllAttendPeopleByMeetingId(InputGetAllAttendPeopleByMeetingId input)
        {
            const string storedProcedureName = "[HRS].[prc_GetAllAttendPeopleByMeetingId]";

            var result =
                _businessManager.CallStoredProcedure<InputGetAllAttendPeopleByMeetingId,
                    OutputGetAllAttendPeopleByMeetingId[]>(storedProcedureName, input);

            return Ok(result);
        }


        /// <summary>
        /// ویرایش جلسه جدید 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("EditMyMeeting")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        [JwtValidation]
        public IHttpActionResult EditMyMeeting(InputEditMyMeeting input)
        {
            const string storedProcedureName = "[HRS].[prc_EditMyMeeting]";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "با موفقیت ویرایش شد";
            return Ok(message);
        }

        /// <summary>
        /// دریافت لیست کاربران براساس نوع کاربران و شناسه جلسات برای سیستم جلسات
        /// </summary>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetEmployeeListByUserTypeAndMeetingIdForMeeting")]
        [HttpPost]
        public IHttpActionResult GetEmployeeListByUserTypeAndMeetingIdForMeeting(InputGetEmployeeListByUserTypeAndMeetingIdForMeeting input)
        {
            const string storedProcedureName = "[HRS].[prc_GetEmployeeListByUserTypeAndMeetingIDForMeeting]";

            var result =
                _businessManager.CallStoredProcedure<InputGetEmployeeListByUserTypeAndMeetingIdForMeeting,
                    OutputGetEmployeeListByUserTypeAndMeetingIdForMeeting[]>(storedProcedureName, input);

            return Ok(result);
        }

    }
}