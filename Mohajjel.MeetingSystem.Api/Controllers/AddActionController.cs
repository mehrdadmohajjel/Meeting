using System;
using System.Linq;
using Mohajjel.MeetingSystem.Api.Business;
using Mohajjel.MeetingSystem.Api.Filters;
using System.Web.Http;
using Mohajjel.MeetingSystem.Shared.Models.DomainModels;
using Mohajjel.MeetingSystem.Shared.Models.Input.AddAction;
using Mohajjel.MeetingSystem.Shared.Models.Output.AddAction;

namespace Mohajjel.MeetingSystem.Api.Controllers
{
    [RoutePrefix("AddAction")]
    public class AddActionController: ApiController
    {
        private readonly BusinessManager _businessManager = new BusinessManager();


        /// <summary>
        /// لیست جلسات فعالی که مصوبه ای با مسئولیت کاربر مورد نظر دارد 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetUserActiveMeeting")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        [JwtValidation]
        public IHttpActionResult GetUserActiveMeeting(InputGetUserActiveMeeting input)
        {
            const string storedProcedureName = "[HRS].[prc_GetUserActiveMeeting]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetUserActiveMeeting,
                        OutputGetUserActiveMeeting[]>(storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        /// دریافت لیست مصوبات مربوط به یک کاربر مشخص از یک جلسه مشخص 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetUserMeetingApprovalListByMeetingIdAndUserId")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        [JwtValidation]
        public IHttpActionResult GetUserMeetingApprovalListByMeetingIdAndUserId(InputGetUserMeetingApprovalListByMeetingIdAndUserId input)
        {
            const string storedProcedureName = "[HRS].[prc_GetUserMeetingApprovalListByMeetingIdAndUserId]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetUserMeetingApprovalListByMeetingIdAndUserId,
                        OutputGetUserMeetingApprovalListByMeetingIdAndUserId[]>(storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        ///     ثبت اقدام جدید
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("AddNewActionToApproval")]
        [HttpPost]
        [JwtValidation]
        public IHttpActionResult AddNewActionToApproval(InputAddNewActionToApproval input)
        {
            const string storedProcedureName = "[HRS].[prc_AddNewActionToApproval]";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "با موفقیت انجام شد";
            return Ok(message);
        }

        /// <summary>
        ///      دریافت لیست اقدامات یک مصوبه 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetActionListByApprovalId")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        public IHttpActionResult GetActionListByApprovalId(InputGetActionListByApprovalId input)
        {
            const string storedProcedureName = "[HRS].[prc_GetActionListByApprovalID]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetActionListByApprovalId, OutputGetActionListByApprovalId[]>(storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        ///  حذف اکشن مبتنی بر مصوبه
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("DeleteApprovalAction")]
        [HttpPost]
        [JwtValidation]
        //[AccessToEventValidation(EventCode = "001", FormCode = "028")]
        public IHttpActionResult DeleteApprovalAction(InputDeleteApprovalAction input)
        {
            const string storedProcedureName = "[HRS].[prc_DeleteApprovalAction]";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "با موفقیت انجام شد";
            return Ok(message);
        }

        /// <summary>
        ///      دریافت ضمیمه عملیات تصویب جلسات 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetMeetingApprovalActionAttachmentFile")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        public IHttpActionResult GetMeetingApprovalActionAttachmentFile(InputGetMeetingApprovalActionAttachmentFile input)
        {
            const string storedProcedureName = "[HRS].[prc_GetMeetingApprovalActionAttachmentFileByMeetingApprovalActionID]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetMeetingApprovalActionAttachmentFile, OutputGetMeetingApprovalActionAttachmentFile[]>(storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        ///     آپلود ضمیمه به عملیات تصویب جلسات
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("AddUploadAttachmentToMeetingApprovalAction")]
        [HttpPost]
        [JwtValidation]
        public IHttpActionResult AddUploadAttachmentToMeetingApprovalAction(InputAddUploadAttachmentToMeetingApprovalAction input)
        {
            const string storedProcedureName = "[HRS].[prc_AddUploadAttachmentToMeetingApprovalAction]";

            input.FileDetails =
                input.FileExtensions.Select(
                    (fileExtension, i) =>
                        new Tbl_FileDetailsList
                        {
                            FileName = input.MeetingApprovalActionId + "-" + Guid.NewGuid() + fileExtension,
                            FileStream = Convert.FromBase64String(input.Base64Values[i])
                        }
                ).ToArray();

            _businessManager.CallStoredProcedure(storedProcedureName, input);

            return Ok(input.FileDetails.Select(fileDetail => fileDetail.FileName));
        }

        /// <summary>
        /// حذف آپلود ضمیمه های عملیات تصویب جلسات
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("RemoveMeetingApprovalActionDocument")]
        [HttpPost]
        [JwtValidation]
        public IHttpActionResult RemoveMeetingApprovalActionDocument(InputRemoveMeetingApprovalActionDocument input)
        {
            const string storedProcedureName = "[HRS].[prc_RemoveMeetingApprovalActionDocument]";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "فایل با موفقیت حذف شد";
            return Ok(message);
        }

        /// <summary>
        ///      دریافت فایل ضمیمه بر اساس شناسه داکیومنت 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetMeetingApprovalActionAttachmentFileById")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        public IHttpActionResult GetMeetingApprovalActionAttachmentFileById(InputGetMeetingApprovalActionAttachmentFileById input)
        {
            const string storedProcedureName = "[HRS].[prc_GetMeetingApprovalActionAttachmentFileByMeetingApprovalActionDocumentID]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetMeetingApprovalActionAttachmentFileById, OutputGetMeetingApprovalActionAttachmentFileById>(storedProcedureName, input);

            return Ok(result);
        }
    }
}
