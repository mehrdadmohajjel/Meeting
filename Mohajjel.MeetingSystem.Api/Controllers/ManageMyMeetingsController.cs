using System;
using System.Linq;
using Mohajjel.MeetingSystem.Api.Business;
using Mohajjel.MeetingSystem.Api.Filters;
using System.Web.Http;
using Mohajjel.MeetingSystem.Shared.Models.DomainModels;
using Mohajjel.MeetingSystem.Shared.Models.Input.AddAction;
using Mohajjel.MeetingSystem.Shared.Models.Input.ManageMyMeetings;
using Mohajjel.MeetingSystem.Shared.Models.Output.AddAction;
using Mohajjel.MeetingSystem.Shared.Models.Output.ManageMyMeetings;

namespace Mohajjel.MeetingSystem.Api.Controllers
{
    [RoutePrefix("ManageMyMeetings")]
    public class ManageMyMeetingsController: ApiController
    {
        private readonly BusinessManager _businessManager = new BusinessManager();


        /// <summary>
        /// لیست جلسات یک فرد 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetUserMeetingByDate")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        [JwtValidation]
        public IHttpActionResult GetUserMeetingByDate(InputGetUserMeetingByDate input)
        {
            const string storedProcedureName = "[HRS].[prc_GetUserMeetingByDate]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetUserMeetingByDate, OutputGetUserMeetingByDate[]>(storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        ///     افزودن بازدید کننده جدید
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("AddMeetingNewObservation")]
        [HttpPost]
        public IHttpActionResult AddMeetingNewObservation(InputAddMeetingNewObservation input)
        {
            const string storedProcedureName = "[HRS].[prc_AddMeetingNewObservation]";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "با موفقیت انجام شد";
            return Ok(message);
        }

        /// <summary>
        /// لیست جلسات یک فرد 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetMeetingObservationListByMeetingId")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        public IHttpActionResult GetMeetingObservationListByMeetingId(InputGetMeetingObservationListByMeetingId input)
        {
            const string storedProcedureName = "[HRS].[prc_GetMeetingObservationListByMeetingId]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetMeetingObservationListByMeetingId,
                        OutputGetMeetingObservationListByMeetingId[]>(storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        /// دریافت لیست تمامی کاربران 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetAllUsersList")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        public IHttpActionResult GetAllUsersList(InputGetAllUsersList input)
        {
            const string storedProcedureName = "[AA].[prc_GetAllUsersList]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetAllUsersList, OutputGetAllUsersList[]>(storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        /// لیست رونوشت های ارسالی 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetMeetingTranscriptList")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        public IHttpActionResult GetMeetingTranscriptList(InputGetMeetingTranscriptList input)
        {
            const string storedProcedureName = "[HRS].[prc_GetMeetingTranscriptList]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetMeetingTranscriptList, OutputGetMeetingTranscriptList[]>(storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        ///     ثبت رونوشت جدید
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("AddNewMeetingTranscript")]
        [HttpPost]
        [JwtValidation]
        public IHttpActionResult AddNewMeetingTranscript(InputAddNewMeetingTranscript input)
        {
            const string storedProcedureName = "[HRS].[prc_AddNewMeetingTranscript]";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "با موفقیت انجام شد";
            return Ok(message);
        }

        /// <summary>
        ///  حذف اکشن مبتنی بر مصوبه
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("DeleteMeetingTranscript")]
        [HttpPost]
        [JwtValidation]
        public IHttpActionResult DeleteMeetingTranscript(InputDeleteMeetingTranscript input)
        {
            const string storedProcedureName = "[HRS].[prc_Delete_MeetingTranscript]";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "با موفقیت حذف شد";
            return Ok(message);
        }
    }
}
