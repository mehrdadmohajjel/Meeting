using DevExpress.Web;
using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Shared.Models.Input.ManageMyMeetings;
using Mohajjel.MeetingSystem.Shared.Models.Output.ManageMyMeetings;


namespace Mohajjel.MeetingSystem.Client.Models.ViewModels
{
    public class PagedAllUsers
    {
        private static OutputGetAllUsersList[] GetAllUsersList(ListEditItemsRequestedByFilterConditionEventArgs args)
        {
            var apiParam = new InputGetAllUsersList
            {
                FilterKeyWord = args.Filter,
                PageCount = 5000,
                Skip = args.BeginIndex
            };
            var result = ApiList.GetAllUsersList(apiParam);
            return result;
        }

        public static OutputGetAllUsersList GetAllUserListForSendTranscriptRangeByUserId(ListEditItemRequestedByValueEventArgs args) =>
            args.Value == null || !int.TryParse(args.Value.ToString(), out var userId)
                ? null
                : new OutputGetAllUsersList { UserId = userId };

        public static OutputGetAllUsersList[] GetAllUserListForSendTranscriptCombo(ListEditItemsRequestedByFilterConditionEventArgs args) =>
            GetAllUsersList(args);
    }
}
