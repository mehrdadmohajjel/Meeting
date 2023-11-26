using System;
using System.Diagnostics;
using System.IO;
using System.Web.Mvc;
using DevExpress.XtraReports.UI;
using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Shared.Utilities;
using Mohajjel.MeetingSystem.Shared.Models.Input.ManageMyMeetings;

namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class PrintController: BaseController
    {
        [System.Web.Http.HttpGet]
        public ActionResult Print(long meetingId)
        {
            _ = Stopwatch.StartNew();

            XtraReport report = new XtraMeetingPrint();
            var userId = GetCurrentUser().UserID;

            // var creationDate = Tools.ToShamsiDateString(DateTime.Now);
            // var printRequester = GetCurrentUser().FirstName + " " + GetCurrentUser().LastName;

            report.Parameters["MeetingId"].Value = meetingId;


            //Generate PDFs
            var filepath = Server.MapPath("~/FileBank/Report/");

            var exists = Directory.Exists(filepath);

            if(!exists)
            {
                Directory.CreateDirectory(Server.MapPath("~/FileBank"));
                Directory.CreateDirectory(Server.MapPath("~/FileBank/Report"));
            }

            var fileName = "Meeting_"+Guid.NewGuid().ToString().Substring(0, 4)+".pdf";
            fileName = fileName.Replace('/', '_');
            var path = Server.MapPath("~/FileBank/Report/") + fileName;


            var newObservationInput = new InputAddMeetingNewObservation
            {
                MeetingId = meetingId,
                UserId = userId
            };

            ApiList.AddMeetingNewObservation(newObservationInput);

            report.ExportToPdf(path);
            Tools.RemoveFileWithDelay(fileName, path, 15);

            return File(path, "application/pdf", fileName);
        }

    }
}
