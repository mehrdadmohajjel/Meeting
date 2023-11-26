using Mohajjel.MeetingSystem.Api.Business;
using Mohajjel.MeetingSystem.Api.Filters;
using Mohajjel.MeetingSystem.Shared.Models.Input.AddMeeting;
using Mohajjel.MeetingSystem.Shared.Models.Output.AddMeeting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Mohajjel.MeetingSystem.Api.Controllers
{
    [RoutePrefix("AddMeeting")]
    public class AddMeetingController : ApiController
    {
        private readonly BusinessManager _businessManager = new BusinessManager();

        /// <summary>
        /// دریافت جزئیات شاخه بندی جلسه 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetCategoryDetailByCategoryId")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        public IHttpActionResult GetCategoryDetailByCategoryId(InputGetCategoryDetailByCategoryId input)
        {
            const string storedProcedureName = "[HRS].[prc_GetCategoryDetailByCategoryId]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetCategoryDetailByCategoryId, OutputGetCategoryDetailByCategoryId>(storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        /// لیست افراد جهت حضور در شرکت بوسیله کد امور 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetEmployeeListByDepartmentId")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        public IHttpActionResult GetEmployeeListByDepartmentId(InputGetEmployeeListByDepartmentId input)
        {
            const string storedProcedureName = "[AA].[prc_GetEmployeeListByDepartmentId]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetEmployeeListByDepartmentId, OutputGetMeetingAttendanceList[]>(storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        /// لیست  پرسنلی مدیران، روسا و سرپرستان 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetUserListWithOrganizationLevel")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        public IHttpActionResult GetUserListWithOrganizationLevel(InputGetUserListWithOrganizationLevel input)
        {
            const string storedProcedureName = "[AA].[prc_GetAllUsersWithOrganizationLevel]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetUserListWithOrganizationLevel, OutputGetMeetingAttendanceList[]>(storedProcedureName, input);

            return Ok(result);
        }



        /// <summary>
        /// لیست  پرسنلی  
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetUserList")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        public IHttpActionResult GetUserList()
        {
            const string storedProcedureName = "[AA].[prc_GetUserList]";

            var result =
                _businessManager
                    .CallStoredProcedure< OutputGetMeetingAttendanceList[]>(storedProcedureName);

            return Ok(result);
        }

        /// <summary>
        /// دریافت آخرین شماره جلسه 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetMeetingNumberByMeetingCategoryId")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        public IHttpActionResult GetMeetingNumberByMeetingCategoryId(InputGetMeetingNumberByMeetingCategoryId input)
        {
            const string storedProcedureName = "[HRS].[prc_GetMeetingNumberByMeetingCategoryId]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetMeetingNumberByMeetingCategoryId, OutputGetMeetingNumberByMeetingCategoryId>(storedProcedureName, input);

            return Ok(result);
        }



        /// <summary>
        /// ثبت جلسه 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("FinilizeNewMeeting")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        [JwtValidation]
        public IHttpActionResult FinilizeNewMeeting(InputFinilizeNewMeeting input)
        {
            const string storedProcedureName = "[HRS].[prc_AddNewMeeting]";


            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "جلسه به شماره   " + input.MeetingNumber + " با موفقیت افزوده شد";
            return Ok(message);
        }


        /// <summary>
        /// دریافت لیست کاربران براساس نوع کاربران  برای سیستم جلسات
        /// </summary>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetEmployeeListByUserTypeForMeeting")]
        [HttpPost]
        public IHttpActionResult GetEmployeeListByUserTypeForMeeting(InputGetEmployeeListByUserTypeForMeeting input)
        {
            const string storedProcedureName = "[HRS].[prc_GetEmployeeListByUserTypeForMeeting]";

            var result =
                _businessManager.CallStoredProcedure<InputGetEmployeeListByUserTypeForMeeting,
                    OutputGetEmployeeListByUserTypeForMeeting[]>(storedProcedureName, input);

            return Ok(result);
        }

    }
}
