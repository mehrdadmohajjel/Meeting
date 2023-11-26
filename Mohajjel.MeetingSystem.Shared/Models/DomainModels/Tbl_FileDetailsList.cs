using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.DomainModels
{
    public class Tbl_FileDetailsList
    {
        public string FileName { get; set; }

        public byte[] FileStream { get; set; }
    }
}
