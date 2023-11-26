using Mohajjel.MeetingSystem.Shared.Attributes;

namespace Mohajjel.MeetingSystem.Shared.Models.Input.AddMeeting
{
    public class MeetingPeopleList
    {
        public int? UserId { get; set; } = null;

        [StoredProcedureParameter(Size = 150)]
        public string PeopleName { get; set; }

        public bool IsOptional { get; set; }

        public bool IsDabir { get; set; }
    }
}
