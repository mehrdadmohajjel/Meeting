using System;
using System.Linq;
using Mohajjel.MeetingSystem.Api.Business;
using Mohajjel.MeetingSystem.Api.Filters;
using System.Web.Http;
using Mohajjel.MeetingSystem.Shared.Models.DomainModels;
using Mohajjel.MeetingSystem.Shared.Models.Input.AddApproval;
using Mohajjel.MeetingSystem.Shared.Models.Output.AddApproval;

namespace Mohajjel.MeetingSystem.Api.Controllers
{
    [RoutePrefix("AddApproval")]
    public class AddApprovalController: ApiController
    {
        private readonly BusinessManager _businessManager = new BusinessManager();

        /// <summary>
        /// دریافت لیست مصوبات جلسه
        /// </summary>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetAllMeetingApprovalsByMeetingId")]
        [HttpPost]
        public IHttpActionResult GetAllMeetingApprovalsByMeetingId(InputGetAllMeetingApprovalsByMeetingId input)
        {
            const string storedProcedureName = "[HRS].[prc_GetAllMeetingApprovalsByMeetingID]";

            var result =
                _businessManager.CallStoredProcedure<InputGetAllMeetingApprovalsByMeetingId,
                    OutputGetAllMeetingApprovalsByMeetingId[]>(storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        /// ثبت مصوبه جدید 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AddApprovals")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        [JwtValidation]
        public IHttpActionResult AddApprovals(InputAddApprovals input)
        {
            const string storedProcedureName = "[HRS].[prc_AddApprovals]";


            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "عملیات ثبت با موفقیت انجام شد";
            return Ok(message);
        }

        /// <summary>
        /// ثبت توضیحات و موارد مطروحه جدید 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AddDescriptionToMeeting")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        [JwtValidation]
        public IHttpActionResult AddDescriptionToMeeting(InputAddDescriptionToMeeting input)
        {
            const string storedProcedureName = "[HRS].[prc_AddDescriptionToMeeting]";


            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "عملیات ثبت با موفقیت انجام شد";
            return Ok(message);
        }

        /// <summary>
        ///  حذف مصوبه
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("DeleteMeetingApprovals")]
        [HttpPost]
        [JwtValidation]
        //[AccessToEventValidation(EventCode = "001", FormCode = "028")]
        public IHttpActionResult DeleteMeetingApprovals(InputDeleteMeetingApprovals input)
        {
            const string storedProcedureName = "[HRS].[prc_DeleteMeetingApprovals]";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "با موفقیت انجام شد";
            return Ok(message);
        }

        /// <summary>
        /// ویرایش مصوبه جدید
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("UpdateApproval")]
        [HttpPost]
        [JwtValidation]
        //[AccessToEventValidation(EventCode = "001", FormCode = "006")]
        public IHttpActionResult UpdateApproval(InputUpdateApproval input)
        {
            const string storedProcedureName = "[HRS].[prc_UpdateApprval]";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "با موفقیت انجام شد";
            return Ok(message);
        }

        /// <summary>
        ///  ثبت وضعیت و ارسال پیام
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("SetMeetingApprovalStatusAndSendMessage")]
        [HttpPost]
        [JwtValidation]
        //[AccessToEventValidation(EventCode = "001", FormCode = "028")]
        public IHttpActionResult SetMeetingApprovalStatusAndSendMessage(InputSetMeetingApprovalStatusAndSendMessage input)
        {
            const string storedProcedureName = "[HRS].[prc_SetMeetingApprovalStatusAndSendMessage]";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "با موفقیت انجام شد";
            return Ok(message);
        }
    }
}
