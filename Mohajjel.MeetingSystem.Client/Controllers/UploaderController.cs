using Mohajjel.MeetingSystem.Shared.Utilities;
using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;
using System.Web.SessionState;

namespace Mohajjel.MeetingSystem.Client.Controllers
{
    [SessionState(SessionStateBehavior.ReadOnly)]
    public class UploaderController : BaseController
    {
        [HttpPost]
        public void DeleteFiles(params string[] fileNames)
        {
            var uploadedFilesPath = Settings.UploaderFilesLocations;
            var uploadPath = Server.MapPath(uploadedFilesPath);

            Uploader.DeleteFiles(uploadPath, fileNames);
        }

        [HttpPost]
        public ActionResult Upload()
        {
            var uploadedFilesPath = Settings.UploaderFilesLocations;
            var isFileUploadFinished = false;
            var fileNames = new List<string>();

            foreach (string file in Request.Files)
            {
                var fileDataContent = Request.Files[file];
                if (fileDataContent != null && fileDataContent.ContentLength > 0)
                {
                    var stream = fileDataContent.InputStream;
                    var fileName = Path.GetFileName(fileDataContent.FileName);
                    var uploadPath = Server.MapPath(uploadedFilesPath);
                    _ = Directory.CreateDirectory(uploadPath);
                    var path = Path.Combine(uploadPath, fileName);

                    if (System.IO.File.Exists(path))
                    {
                        System.IO.File.Delete(path);
                    }

                    using (var fileStream = System.IO.File.Create(path))
                    {
                        stream.CopyTo(fileStream);
                    }

                    isFileUploadFinished = Uploader.MergeFile(path);

                    fileNames.Add(fileName);
                }
            }
            return Json(new
            {
                fileNames,
                isFileUploadFinished
            });
        }
    }
}